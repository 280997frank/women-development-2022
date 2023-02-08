import * as functions from "firebase-functions";
import fetch from "cross-fetch";

interface RecaptchaPayload {
  secret: string;
  response: string;
  remoteip?: string;
}

const {
  v2: { secret },
  v3: { secret: secretV3 },
} = functions.config().recaptcha;

/**
 * @param {string} recaptcha
 * @param {Object} context Cloud function's execution context
 * @param {Object} context.rawRequest
 * @param {string} context.rawRequest.ip Origin's IP address
 * @return {Promise} Promise object represents `void`
 */
export async function verifyRecaptcha(
  recaptcha: string,
  context: functions.https.CallableContext
): Promise<void> {
  const verificationPayload: RecaptchaPayload = {
    secret,
    response: recaptcha,
  };

  if (context.rawRequest.ip) {
    verificationPayload.remoteip = context.rawRequest.ip;
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams(
        verificationPayload as unknown as Record<string, string>
      ),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to verify reCAPTCHA");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error("reCAPTCHA Error: " + json["error-codes"].join(", "));
  }
}

/**
 * @param {string} recaptcha
 * @param {Object} context Cloud function's execution context
 * @param {Object} context.rawRequest
 * @param {string} context.rawRequest.ip Origin's IP address
 * @param {string} actionName The name of action that is used in front-end to get the reCAPTCHA
 * @return {Promise} Promise object represents `void`
 */
export async function verifyRecaptchaV3(
  recaptcha: string,
  context: functions.https.CallableContext,
  actionName: string
): Promise<void> {
  const verificationPayload: RecaptchaPayload = {
    secret: secretV3,
    response: recaptcha,
  };

  if (context.rawRequest.ip) {
    verificationPayload.remoteip = context.rawRequest.ip;
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams(
        verificationPayload as unknown as Record<string, string>
      ),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to verify reCAPTCHA");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error("reCAPTCHA Error: " + json["error-codes"].join(", "));
  }

  if (json.score < 0.5) {
    throw new Error("reCAPTCHA Error: Bot detected");
  }

  if (json.action !== actionName) {
    throw new Error("reCAPTCHA Error: Invalid action name");
  }
}
