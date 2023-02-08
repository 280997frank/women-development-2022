import * as functions from "firebase-functions";
import { Agent } from "https";
import { error } from "firebase-functions/lib/logger";
import fetch from "cross-fetch";

import { getToken } from "../utils/token";
import type { ErrorResponse } from "../interfaces/error";

const { url } = functions.config().msf;
const agent = new Agent({ keepAlive: true });

const getPollingResults = functions.https.onCall(async (_, context) => {
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

    const token = await getToken();
    const fetchOptions: Record<string, unknown> = {
      method: "GET",
      agent,
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    const response = await fetch(`${url}/api/poll-results`, fetchOptions);

    if (!response.ok) {
      const json = (await response.json()) as ErrorResponse;
      error("Failed to retrieve polling results", json);
      throw new Error(
        `Failed to retrieve polling results [${json.error}: ${json.message}]`
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

export default getPollingResults;
