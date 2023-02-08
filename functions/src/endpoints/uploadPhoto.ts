/* eslint-disable camelcase */
import * as functions from "firebase-functions";
import { Agent } from "https";
import { error } from "firebase-functions/lib/logger";
import fetch from "cross-fetch";

import { getToken } from "../utils/token";
import { verifyRecaptcha } from "../utils/recaptcha";
import { uploadPhotoSchema } from "../constants/validationSchemas";
import type { ErrorResponse } from "../interfaces/error";

const { url } = functions.config().msf;
const agent = new Agent({ keepAlive: true });

const uploadPhoto = functions.https.onCall(async (request, context) => {
  let errorCode: functions.https.FunctionsErrorCode = "unknown";
  try {
    if (!context.app) {
      errorCode = "failed-precondition";
      throw new Error(
        "The function must be called from an App Check verified app"
      );
    }

    if (!context.auth) {
      errorCode = "unauthenticated";
      throw new Error("Missing user ID");
    }

    const isParamValid = uploadPhotoSchema.isValidSync(request);

    if (!isParamValid) {
      errorCode = "invalid-argument";
      throw new Error("Parameter is invalid");
    }

    const { image_1, image_2, title, content, recaptcha } = request;

    await verifyRecaptcha(recaptcha, context);

    const token = await getToken();
    const fetchOptions: Record<string, unknown> = {
      method: "POST",
      agent,
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        image_1,
        image_2,
        title,
        content,
      }),
    };

    const response = await fetch(`${url}/api/add-photo`, fetchOptions);

    if (!response.ok) {
      const json = (await response.json()) as ErrorResponse;
      error("Failed to upload photo", json);
      throw new Error(
        `Failed to upload photo [${json.error}: ${json.message}]`
      );
    }

    const json = await response.json();

    return json;
  } catch (error) {
    return Promise.reject(
      new functions.https.HttpsError(errorCode, (error as Error).message)
    );
  }
});

export default uploadPhoto;
