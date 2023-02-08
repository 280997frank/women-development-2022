import * as admin from "firebase-admin";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

admin.initializeApp();
dayjs.extend(utc);
dayjs.extend(timezone);

import getPollingResults from "./endpoints/getPollingResults";
import submitPoll from "./endpoints/submitPoll";
import getPhotos from "./endpoints/getPhotos";
import uploadPhoto from "./endpoints/uploadPhoto";
import downloadReports from "./endpoints/downloadReports";

export {
  getPollingResults,
  submitPoll,
  getPhotos,
  uploadPhoto,
  downloadReports,
};
