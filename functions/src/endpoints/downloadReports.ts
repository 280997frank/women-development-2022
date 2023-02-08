import * as functions from "firebase-functions";
import * as dayjs from "dayjs";
import { downloadReport } from "../function/downloadReport";

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "2GB" as const,
};
const downloadReports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (request, response) => {
    const download = await downloadReport(
      request.param("startDate"),
      request.param("endDate")
    );
    const start = dayjs(request.param("startDate"), "YYYY-MM-DD")
      .tz("Asia/Singapore")
      .format("YYYYMMDD");
    const end = dayjs(request.param("endDate"), "YYYY-MM-DD")
      .tz("Asia/Singapore")
      .format("YYYYMMDD");
    response.attachment(`download_report_${start}-${end}.xlsx`);
    response.send(download);
  });

export default downloadReports;
