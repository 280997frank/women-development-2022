import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { log, error } from "firebase-functions/lib/logger";
import * as dayjs from "dayjs";
import * as AES from "crypto-js/aes";
import * as sha1 from "crypto-js/sha1";
import * as Hex from "crypto-js/enc-hex";
import * as Utf8 from "crypto-js/enc-utf8";
import * as ECB from "crypto-js/mode-ecb";
import * as Pkcs7 from "crypto-js/pad-pkcs7";
import fetch from "cross-fetch";

import type { ErrorResponse } from "../interfaces/error";

interface MsfSecret {
  token: string;
  age: number;
  expiresIn: admin.firestore.Timestamp;
  refreshToken: string;
}

interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

const { secret, url, username, password } = functions.config().msf;
const db = admin.firestore();
const secretsRef = db.collection("secrets");

/**
 * Returns encrypted string based of `plaintext` and `key`
 * @param {string} plaintext
 * @param {string} key
 * @return {string} Encrypted text
 */
function encryptText(plaintext: string, key: string): string {
  const pwhash = sha1(Utf8.parse(key));
  const keyhash = Hex.parse(pwhash.toString(Hex).slice(0, 32));
  const encrypted = AES.encrypt(plaintext, keyhash, {
    mode: ECB,
    padding: Pkcs7,
  });
  return encrypted.toString();
}

// eslint-disable-next-line valid-jsdoc
/**
 * Get JWT to access MFS API. If there is no token stored in Firestore, retrieve a new one.
 * * @param {boolean} retrieveNewToken
 */
export async function getToken(retrieveNewToken = false) {
  const doc = await secretsRef.doc("msf").get();
  const secretKey = secret + dayjs().format("MMYYYYDD");
  let token = "";

  if (!doc.exists || retrieveNewToken) {
    const encryptedUsername = encryptText(username, secretKey);
    const encryptedPassword = encryptText(password, secretKey);
    log("encrypted", encryptedUsername, encryptedPassword);
    // Retrieve new token from MFS
    const response = await fetch(`${url}/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        username: encryptedUsername,
        password: encryptedPassword,
      }),
    });

    if (!response.ok) {
      const json = (await response.json()) as ErrorResponse;
      error("Failed to retrieve new token", json);
      throw new Error(
        `Failed to retrieve new token [${json.error}: ${json.message}]`
      );
    }

    const json = await response.json();
    log("new token", json);
    const payload = {
      token: json.token,
      age: json.expires_in,
      expiresIn: dayjs().add(json.expires_in, "milliseconds").toDate(),
      refreshToken: json.refreshToken,
    };

    await secretsRef.doc("msf").set(payload);

    token = json.token;
  } else {
    const data = doc.data() as MsfSecret;
    const hasTokenExpired = dayjs().unix() >= data.expiresIn.seconds;

    // Check if the token has expired
    if (hasTokenExpired) {
      // Refresh token
      const response = await fetch(`${url}/api/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          refreshToken: data.refreshToken,
        }),
      });

      if (!response.ok) {
        const json = (await response.json()) as ErrorResponse;
        error("Failed to refresh token", json);
        log("Retrieving new token");
        token = await getToken(true);
        /* throw new Error(
          `Failed to refresh token [${json.error}: ${json.message}]`
        ); */
      } else {
        const json = (await response.json()) as RefreshResult;
        log("refreshed token", json);
        await secretsRef.doc("msf").set(
          {
            token: json.accessToken,
            refreshToken: json.refreshToken,
            expiresIn: dayjs().add(data.age, "milliseconds").toDate(),
          },
          { merge: true }
        );
        token = json.accessToken;
      }
    } else {
      log("stored token", data);
      // Return stored token
      token = data.token;
    }
  }

  return token;
}
