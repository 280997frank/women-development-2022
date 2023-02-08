import { db } from "@/connections/firebase";
import { IOnclickTracker } from "@/types/tracking";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export function onClickTracker({
  anonymousId,
  sessionId,
  type,
  data,
  router,
}: IOnclickTracker) {
  // save to firebase here
  // console.log({
  //   anonymouseId: anonymousId,
  //   sessionId: sessionId,
  //   event: "click",
  //   type: type,
  //   data: data,
  //   page: router,
  //   timestamps: new Date(),
  // });
  const snapshotRef = collection(db, "trackings");
  if (type === "answered-quiz") {
    const { question, answer } = data as { question: string; answer: string };
    addDoc(snapshotRef, {
      anonymouseId: anonymousId,
      sessionId: sessionId,
      event: "click",
      type: type,
      data: question,
      answer: answer,
      page: router,
      timestamps: new Date(),
    });
  } else {
    addDoc(snapshotRef, {
      anonymouseId: anonymousId,
      sessionId: sessionId,
      event: "click",
      type: type,
      data: data,
      page: router,
      timestamps: new Date(),
    });
  }
}

export async function onVisit({
  anonymousId,
  sessionId,
  type,
  data,
  router,
}: IOnclickTracker) {
  // save to firebase here
  // console.log({
  //   anonymouseId: anonymousId,
  //   sessionId: sessionId,
  //   event: "visit",
  //   type: type,
  //   data: data,
  //   page: router,
  //   timestamps: new Date(),
  //   timeEnter: new Date(),
  // });
  setDoc(doc(db, "trackings", sessionId), {
    anonymouseId: anonymousId,
    sessionId: sessionId,
    event: "visitorship",
    type: type,
    data: data,
    page: router,
    timestamps: new Date(),
    timeEnter: new Date(),
  });
}

export async function onLeave({
  anonymousId,
  sessionId,
  type,
  data,
  router,
}: IOnclickTracker) {
  // console.log({
  //   anonymouseId: anonymousId,
  //   sessionId: sessionId,
  //   event: "visit",
  //   type: type,
  //   data: data,
  //   page: router,
  //   timestamps: new Date(),
  //   timeExit: new Date(),
  // });
  // get prev data

  if (sessionId === "") return;

  const prevData = await getDoc(doc(db, "trackings", sessionId));
  if (prevData.exists()) {
    // update with timeExit
    const data = prevData.data();
    delete data.type;

    setDoc(doc(db, "trackings", sessionId), {
      ...prevData.data(),
      type: "leave",
      timeExit: new Date(),
    });
  } else {
    setDoc(doc(db, "trackings", sessionId), {
      anonymouseId: anonymousId,
      sessionId: sessionId,
      event: "visitorship",
      type: type,
      data: data,
      page: router,
      timestamps: new Date(),
      timeEnter: new Date(),
    });
  }
}

export function getBrowserVisibilityProp() {
  if (typeof document !== "undefined" && typeof document.hidden !== "undefined")
    return "visibilitychange";
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document !== "undefined" && typeof document.hidden !== "undefined")
    return "hidden";
}

export function getIsDocumentHidden() {
  const isHidden = getBrowserDocumentHiddenProp();
  if (isHidden !== undefined) return !document[isHidden];
}
