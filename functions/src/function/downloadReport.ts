import * as dayjs from "dayjs";
import * as Excel from "exceljs";
import * as admin from "firebase-admin";
import _ = require("lodash");

interface user {
  email: string;
  firstName: string;
  lastName: string;
}

interface dateFirestore {
  seconds: number;
  nanoseconds: number;
}

interface data {
  content: string;
  type: string;
}

interface docItem {
  anonymouseId: string;
  event: string;
  type: string;
  page: string;
  data: string;
  timestamps: dateFirestore;
  timeEnter: dateFirestore;
  timeExit: dateFirestore;
  user: user;
  status: string;
  answer: string;
  dataAnswer: string;
}

interface docItem2 {
  anonymouseId: string;
  event: string;
  type: string;
  page: string;
  data: data;
  timestamps: dateFirestore;
  timeEnter: dateFirestore;
  timeExit: dateFirestore;
  user: user;
  status: string;
}

const db = admin.firestore();
// eslint-disable-next-line require-jsdoc
function compare(a: { data: string }, b: { data: string }) {
  if (a.data < b.data) {
    return -1;
  }
  if (a.data > b.data) {
    return 1;
  }
  return 0;
}
export const downloadReport = async (startDate: string, endDate: string) => {
  try {
    const trackingCollection = db.collection("trackings");
    // console.log(startDate,endDate)
    const first = dayjs(startDate + " 00:00:00", "YYYY-MM-DD HH:mm:ss")
      .tz("Asia/Singapore")
      .startOf("day")
      .toISOString();
    const end = dayjs(endDate + " 23:59:59", "YYYY-MM-DD HH:mm:ss")
      .tz("Asia/Singapore")
      .startOf("day")
      .toISOString();
    // console.log(first, end);
    // const today = "04-05-2022";
    const generalQuery = trackingCollection
      .where("timestamps", ">", new Date(first))
      .where("timestamps", "<", new Date(end))
      .get();

    const findPage = (val: string, data: docItem[]) => {
      const result: docItem[] = [];
      data.map((item) => {
        if (item.page === val) {
          result.push(item);
        }
      });
      return result;
    };

    const findData = (val: string, data: docItem[]) => {
      const result: docItem[] = [];
      data.map((item) => {
        if (item.data === val) {
          result.push(item);
        }
      });
      return result;
    };

    const findDataAnswer = (val: string, data: docItem[]) => {
      const result: docItem[] = [];
      data.map((item) => {
        if (item.dataAnswer === val) {
          result.push(item);
        }
      });
      return result;
    };

    const findType = (val: string, data: docItem[]) => {
      const result: docItem[] = [];
      data.map((item) => {
        if (item.type === val) {
          result.push(item);
        }
      });
      return result;
    };

    const findTypeData = (
      val: string,
      val2: string,
      val3: string,
      data: docItem2[]
    ) => {
      const result: docItem2[] = [];
      data.map((item) => {
        if (
          item.type === val &&
          item.data?.type === val2 &&
          item.page === val3
        ) {
          result.push(item);
        }
      });
      return result;
    };

    const clicks: docItem[] = [];
    const clicks2: docItem2[] = [];
    const visitorship: docItem[] = [];
    await generalQuery.then((documents) => {
      documents.docs.map((docs) => {
        if (docs.data()?.event === "click") {
          clicks.push(<docItem>docs.data());
          clicks2.push(<docItem2>docs.data());
        } else if (docs.data()?.event === "visitorship") {
          visitorship.push(<docItem>docs.data());
        }
      });
    });

    const clickType = [
      "/about-exhibition",
      "/physical-exhibition",
      "/pioneers-of-progress",
      "/shapers-of-success",
      "/trailblazers-of-tomorrow",
      "/share-your-hopes",
    ];

    const workbook = new Excel.Workbook();
    const worksheet2 = workbook.addWorksheet("Visitorship");
    worksheet2.columns = [
      { header: "Anonymous Id", key: "anonymouseId" },
      { header: "Page", key: "page" },
      { header: "Enter", key: "timeEnter" },
      { header: "Leave", key: "timeExit" },
    ];
    // const logins = findType("login",clicks)
    // console.log(logins)
    visitorship.forEach((e) => {
      let timeEnter = "";
      try {
        const timestamp = new admin.firestore.Timestamp(
          e?.timeEnter.seconds,
          e?.timeEnter.nanoseconds
        );
        const jsDatex = timestamp.toDate();

        if (dayjs(jsDatex).isValid()) {
          timeEnter = dayjs(jsDatex)
            .tz("Asia/Singapore")
            .format("YYYY-MM-DD HH:mm:ss");
        }
      } catch (e) {
        // console.error(e);
      }
      let timeExit = "";
      try {
        const timestamp2 = new admin.firestore.Timestamp(
          e?.timeExit.seconds,
          e?.timeExit.nanoseconds
        );
        const jsDatex2 = timestamp2.toDate();

        if (dayjs(jsDatex2).isValid()) {
          timeExit = dayjs(jsDatex2)
            .tz("Asia/Singapore")
            .format("YYYY-MM-DD HH:mm:ss");
        }
      } catch (e) {
        // console.error(e);
      }

      const datas = {
        anonymouseId: e?.anonymouseId,
        page: e?.page,
        timeEnter: timeEnter,
        timeExit: timeExit,
      };

      worksheet2.addRow(datas);
    });
    const worksheet = workbook.addWorksheet("Clicks");
    worksheet.columns = [
      { header: "Type", key: "type" },
      { header: "Click Count", key: "clickCount" },
    ];
    const worksheet3 = workbook.addWorksheet("Show Quiz");
    worksheet3.columns = [
      { header: "Quiz", key: "quiz" },
      { header: "Click Count", key: "clickCount" },
    ];
    const worksheet4 = workbook.addWorksheet("Answered Quiz");
    worksheet4.columns = [
      { header: "Quiz", key: "quiz" },
      { header: "Answer", key: "answer" },
      { header: "Click Count", key: "clickCount" },
    ];

    clickType.forEach((e) => {
      worksheet.addRow({
        type: e.replace("/", "").split("-").join(" "),
        clickCount: findPage(e, clicks).length,
      });

      if (e === "/pioneers-of-progress") {
        const quisess = ["show-quiz", "answered-quiz"];
        quisess.map((ee) => {
          const clk = findType(ee, clicks);
          worksheet.addRow({
            type: ee.split("-").join(" "),
            clickCount: clk.length,
          });
          if (ee === "show-quiz") {
            let clkx = _.uniqBy(clk, "data");
            clkx = clkx.sort(compare);
            clkx.map((item: { data: string }) => {
              worksheet3.addRow({
                quiz: item.data,
                clickCount: findData(item.data, clk).length,
              });
            });
          } else if (ee === "answered-quiz") {
            const xx = clk.map((items) => {
              items.dataAnswer = `${items.data} ${items.answer}`;
              return items;
            });
            let clkx = _.uniqBy(xx, "dataAnswer");
            clkx = clkx.sort(compare);
            clkx.map((item) => {
              worksheet4.addRow({
                quiz: item.data,
                answer: item.answer,
                clickCount: findDataAnswer(item.dataAnswer, xx).length,
              });
            });
          }
        });
        const quisess2 = ["audio", "video", "image"];
        quisess2.map((ee) => {
          worksheet.addRow({
            type: "all interaction - " + ee.split("-").join(" "),
            clickCount: findTypeData("modal-content", ee, e, clicks2).length,
          });
        });
      }
      if (e === "/shapers-of-success") {
        const quisess2 = ["audio", "video", "image"];
        quisess2.map((ee) => {
          worksheet.addRow({
            type: "SoS all interaction - " + ee.split("-").join(" "),
            clickCount: findTypeData("modal-content", ee, e, clicks2).length,
          });
        });
      }
    });
    return await workbook.xlsx.writeBuffer();
  } catch (e) {
    console.log(e);
  }

  return null;
};
