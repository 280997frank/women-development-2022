export interface IGetUser {
  anonymousId: string;
}

export interface IOnclickTracker {
  type: string;
  data:
    | {}
    | {
        question: string;
        answer: string;
      };
  router: string;
  anonymousId: string;
  sessionId: string;
}
