import * as functions from "firebase-functions";
import { Agent } from "https";
import { error } from "firebase-functions/lib/logger";
import fetch from "cross-fetch";

import { getPhotosSchema } from "../constants/validationSchemas";
import { getToken } from "../utils/token";
import type { ErrorResponse } from "../interfaces/error";

const { url } = functions.config().msf;
const agent = new Agent({ keepAlive: true });

const getPhotos = functions.https.onCall(async (request, context) => {
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

    const isParamValid = getPhotosSchema.isValidSync(request);

    if (!isParamValid) {
      errorCode = "invalid-argument";
      throw new Error("Parameter is invalid");
    }

    const { noOfPhotos = 10, pageNumber = 1 } = request;

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

    const response = await fetch(
      `${url}/api/photos/${noOfPhotos}/${pageNumber}`,
      fetchOptions
    );

    if (!response.ok) {
      const json = (await response.json()) as ErrorResponse;
      error("Failed to retrieve photo gallery", json);
      throw new Error(
        `Failed to retrieve photo gallery [${json.error}: ${json.message}]`
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

export default getPhotos;
