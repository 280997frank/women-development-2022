import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { actions as authAction } from "@/states/auth/slices";
import { RootState } from "@/states/store";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "@/connections/firebase";

export function useAuthentication() {
  const [isReady, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setReady(true);
        dispatch(authAction.setAnonymousId(user.uid));
      } else {
        signInAnonymously(auth)
          .then(() => {
            console.log("Signed in anonymously");
            dispatch(
              authAction.setAnonymousId(
                auth.currentUser ? auth.currentUser.uid : ""
              )
            );
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return isReady;
}

export function useGetUser() {
  const { anonymousId, sessionId } = useSelector(
    (state: RootState) => state.auth
  );
  return { anonymousId, sessionId };
}
