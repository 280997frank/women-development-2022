import { Box, Spinner } from "@chakra-ui/react";
import { ReactElement } from "react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";

interface RenderVideoPlayerProps {
  videoURL: string | undefined;
}

const RenderVideoPlayer = ({
  videoURL,
}: RenderVideoPlayerProps): ReactElement => {
  return (
    <video width="100%" height="100%" autoPlay muted playsInline>
      <source src={videoURL} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

interface PopIntroMobileProps {
  collectionRef: CollectionReference;
}

const PopIntroMobile = ({ collectionRef }: PopIntroMobileProps) => {
  const [data, isLoading, error] = useDocumentData(
    doc(collectionRef as CollectionReference<{ mobile: string }>, "intro"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pos="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}
      {data !== undefined && <RenderVideoPlayer videoURL={data.mobile} />}
    </Box>
  );
};

export default PopIntroMobile;
