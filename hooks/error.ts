import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import type { FirestoreError } from "firebase/firestore";

export function useError(error?: FirestoreError, title = "Copy Error") {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title,
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast, title]);
}
