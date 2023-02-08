import React, { FC } from "react";
import Head from "next/head";
import { Center, Img } from "@chakra-ui/react";
import { initializeApp, getApp, getApps, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// import { config } from "@/connections/firebase";
import { serviceAccount } from "@/constants/firebase";
import { useWindowSize } from "@/hooks/utils";

import type { SharedImage } from "@/types/shareYourHopes";

interface SharePageProps {
  imageId: string;
  imageUrl: string;
  caption: string;
}

const SharePage: FC<SharePageProps> = ({ imageId, imageUrl, caption }) => {
  const { innerHeight } = useWindowSize();

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/share/${imageId}`}
        />
        <meta property="og:title" content="Celebrating SG Women" />
        <meta property="og:description" content={caption} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="540" />
        <meta property="og:image:height" content="960" />
      </Head>
      <Center>
        <Img
          src={imageUrl}
          alt={caption}
          h={innerHeight}
          w="auto"
          htmlHeight="960"
          htmlWidth="540"
        />
      </Center>
    </>
  );
};

interface PageParams {
  params: {
    imageId?: string;
  };
}

interface PageProps {
  props: SharePageProps;
}

export async function getServerSideProps({
  params,
}: PageParams): Promise<PageProps> {
  let text = "";
  try {
    const { imageId } = params;
    let app: App;

    if (getApps().length) {
      text = "true";
      app = getApp();
    } else {
      text = "false";
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    }

    const db = getFirestore(app);

    if (!imageId) {
      return { props: { imageId: "", imageUrl: "", caption: "" } };
    }

    const doc = await db.collection("shared-images").doc(imageId).get();
    const { url: imageUrl, caption } = doc.data() as SharedImage;

    // Pass data to the page via props
    return { props: { imageId, imageUrl, caption } };
  } catch (error) {
    if (error instanceof Error) {
      return {
        props: {
          imageId: "",
          imageUrl: text,
          caption: error.message,
        },
      };
    }

    return { props: { imageId: "", imageUrl: "", caption: "Unknown Error" } };
  }
}

export default SharePage;
