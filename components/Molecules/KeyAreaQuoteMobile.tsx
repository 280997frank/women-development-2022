import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  Img,
  BoxProps,
} from "@chakra-ui/react";
import { GoMute, GoUnmute } from "react-icons/go";

import Figure from "@/components/Atoms/Figure";
import { useOnClickTracking } from "@/hooks/tracking";

interface KeyAreaQuoteMobileProps extends BoxProps {
  name: string;
  quoterPosition: string;
  description: string;
  quote: string;
  buttonBgColor: string;
  caption: string;
  thumbnail: {
    webp: string;
    png: string;
  };
  audio: {
    mp3: string;
    ogg: string;
  };
}

export default function KeyAreaQuoteMobile({
  thumbnail,
  name,
  quoterPosition,
  description,
  buttonBgColor,
  caption,
  quote,
  audio,
  ...rest
}: Partial<KeyAreaQuoteMobileProps>) {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        audioRef.current?.pause();
      }
    }

    function onAudioPlay() {
      setPlaying(true);
    }

    function onAudioPause() {
      setPlaying(false);
    }

    const audio = audioRef.current;

    document.addEventListener("visibilitychange", onVisibilityChange);
    audioRef.current?.addEventListener("play", onAudioPlay);
    audioRef.current?.addEventListener("pause", onAudioPause);
    audioRef.current?.addEventListener("ended", onAudioPause);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      audio?.removeEventListener("play", onAudioPlay);
      audio?.removeEventListener("pause", onAudioPause);
      audio?.removeEventListener("ended", onAudioPause);
    };
  }, []);

  useOnClickTracking(
    isPlaying && audio !== undefined && audio !== null,
    "modal-content",
    {
      content: audio !== undefined && audio !== null ? audio.mp3 : "",
      type: "audio",
    }
  );

  return (
    <Box
      {...rest}
      sx={{
        "& > *": {
          marginBottom: "1rem",
        },
      }}
    >
      <Figure caption={caption} pos="relative">
        <Flex mb={10}>
          <Box pos="relative">
            <picture>
              <source srcSet={thumbnail?.webp} type="image/webp" />
              <Img src={thumbnail?.png} alt="" />
            </picture>
            <IconButton
              pos="absolute"
              top="100%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity="1"
              w={16}
              h={16}
              bgColor={buttonBgColor}
              borderRadius="50%"
              aria-label="Open Video"
              fontSize="2.25rem"
              color="white"
              icon={isPlaying ? <GoMute /> : <GoUnmute />}
              onClick={async () => {
                if (audioRef.current?.paused) {
                  await audioRef.current?.play();
                } else {
                  audioRef.current?.pause();
                }
              }}
            />
          </Box>
          <VStack justifyContent="flex-end" ml={4} flex="1 1 100%">
            <Text
              fontWeight="bold"
              fontSize="xl"
              alignSelf="start"
              lineHeight="1"
            >
              {name}
            </Text>
            <Text
              alignSelf="start"
              fontWeight="bold"
              fontSize="xs"
              lineHeight="1"
              dangerouslySetInnerHTML={{
                __html: quoterPosition ?? "",
              }}
            />
          </VStack>
        </Flex>
      </Figure>
      <Text color="#484947">{description}</Text>
      <Text color={buttonBgColor} fontWeight="700" lineHeight="1.25">
        {quote}
      </Text>
      <audio ref={audioRef} preload="auto">
        <source src={audio?.ogg} type="audio/ogg" />
        <source src={audio?.mp3} type="audio/mpeg" />
        <p>
          Your browser doesn&apos;t support HTML5 audio. Here is a{" "}
          <a href={audio?.mp3}>link to the audio</a> instead.
        </p>
      </audio>
    </Box>
  );
}
