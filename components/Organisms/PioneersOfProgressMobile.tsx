import { useCallback, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { collection } from "firebase/firestore";

import MilestoneSelection from "@/components/Molecules/MilestoneSelection";
import PopIntroMobile from "@/components/Molecules/PioneersOfProgressMobile/PopIntroMobile";

import textureBG from "@/assets/images/texture-mobile.png";

import { db } from "@/connections/firebase";

import Pop1959Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1959Mobile";
import Pop1960Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1960Mobile";
import Pop1961Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1961Mobile";
import Pop1964Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1964Mobile";
import Pop1968Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1968Mobile";
import Pop1978Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1978Mobile";
import Pop1980Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1980Mobile";
import Pop1994Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1994Mobile";
import Pop1995Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1995Mobile";
import Pop1996Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop1996Mobile";
import Pop2000Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2000Mobile";
import Pop2001Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2001Mobile";
import Pop2007Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2007Mobile";
import Pop2009Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2009Mobile";
import Pop2011Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2011Mobile";
import Pop2013Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2013Mobile";
import Pop2014Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2014Mobile";
import Pop2016Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2016Mobile";
import Pop2017Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2017Mobile";
import Pop2019Mobile from "@/components/Molecules/PioneersOfProgressMobile/Pop2019Mobile";
import MultimediaModal from "@/components/Atoms/MultimediaModal";

import { useWindowSize } from "@/hooks/utils";

import { ActiveModal } from "@/types";

const popRef = collection(db, "pioneers-of-progress");

const PioneersOfProgressMobile = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { innerHeight } = useWindowSize();
  const [activeModal, setActiveModal] = useState<ActiveModal>({
    type: "image",
    src: {},
  });

  const onOpenModal = useCallback(
    (payload: ActiveModal) => {
      onOpen();
      setActiveModal(payload);
    },
    [onOpen]
  );

  const onCloseModal = useCallback(() => {
    onClose();
    setActiveModal({
      type: "image",
      src: {},
    });
  }, [onClose]);

  return (
    <Box
      height={`calc(${innerHeight}px - 6rem)`}
      maxH="-webkit-fill-available"
      overflowY="auto"
      // mt={24}
    >
      <MilestoneSelection
        pageName="pioneers"
        data={[
          {
            name: "intro",
          },
          {
            name: "milestone",
            isSeparator: true,
          },
          {
            name: "1959",
          },
          {
            name: "1960",
          },
          {
            name: "1961",
          },
          {
            name: "1964",
          },
          {
            name: "1968",
          },
          {
            name: "1978",
          },
          {
            name: "1980",
          },
          {
            name: "1994",
          },
          {
            name: "1995",
          },
          {
            name: "1996",
          },
          {
            name: "2000",
          },
          {
            name: "2001",
          },
          {
            name: "2007",
          },
          {
            name: "2009",
          },
          {
            name: "2011",
          },
          {
            name: "2013",
          },
          {
            name: "2014",
          },
          {
            name: "2016",
          },
          {
            name: "2017",
          },
          {
            name: "2019",
          },
        ]}
      />
      <Box
        id="intro"
        backgroundImage={textureBG.src}
        backgroundPosition="center"
      >
        <PopIntroMobile collectionRef={popRef} />
        <Pop1959Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop1960Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop1961Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop1964Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop1968Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop1978Mobile collectionRef={popRef} />
        <Pop1980Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop1994Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop1995Mobile collectionRef={popRef} />
        <Pop1996Mobile collectionRef={popRef} />
        <Pop2000Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop2001Mobile collectionRef={popRef} />
        <Pop2007Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop2009Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop2011Mobile collectionRef={popRef} />
        <Pop2013Mobile collectionRef={popRef} />
        <Pop2014Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop2016Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop2017Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
        <Pop2019Mobile collectionRef={popRef} onOpenModal={onOpenModal} />
      </Box>

      <MultimediaModal
        isOpen={isOpen}
        onClose={onCloseModal}
        type={activeModal.type}
        src={activeModal.src}
      />
    </Box>
  );
};

export default PioneersOfProgressMobile;
