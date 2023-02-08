import React, { ReactNode, useState } from "react";
import { Box, Heading, Button, Img } from "@chakra-ui/react";

import Figure from "@/components/Atoms/Figure";

interface Thumbnail {
  caption: string;
  webp: string;
  png: string;
}

interface KeyAreaExplanationMobileProps {
  title?: string;
  headingColor?: string;
  description?: string;
  thumbnail?: Thumbnail | Thumbnail[];
  children?: ReactNode;
  useViewMore?: boolean;
  viewMorePosition?: number;
  isFigureAfterDescription?: boolean;
}

export default function KeyAreaExplanationMobile({
  title,
  headingColor,
  thumbnail,
  description,
  children,
  useViewMore = false,
  viewMorePosition = 1,
  isFigureAfterDescription = false,
}: KeyAreaExplanationMobileProps) {
  const [isAllTextOpen, setAllTextOpen] = useState(false);

  return (
    <Box pt={4} p={8} borderBottom="1px solid white">
      {title && (
        <Heading color={headingColor} fontSize="lg" mb={4}>
          {title}
        </Heading>
      )}
      {Array.isArray(thumbnail) &&
        thumbnail.map(({ caption, webp, png }) => (
          <Figure key={caption} caption={caption} mb={4}>
            <picture>
              <source srcSet={webp} type="image/webp" />
              <Img mx="auto" src={png} alt="" />
            </picture>
          </Figure>
        ))}
      {!isFigureAfterDescription && thumbnail && !Array.isArray(thumbnail) && (
        <Figure caption={thumbnail.caption} mb={4}>
          <picture>
            <source srcSet={thumbnail.webp} type="image/webp" />
            <Img mx="auto" src={thumbnail.png} alt="" />
          </picture>
        </Figure>
      )}
      {description && (
        <>
          <Box
            color="#484947"
            mb={6}
            dangerouslySetInnerHTML={{ __html: description }}
            sx={{
              // hide paragraphs after the `viewMorePosition`-th one
              [`& > p:nth-of-type(n + ${viewMorePosition + 1})`]: {
                height: useViewMore && !isAllTextOpen ? 0 : "auto",
                // transition: "height 0.25s",
                overflowY: "hidden",
              },
              [`& > br:nth-of-type(n + ${viewMorePosition})`]: {
                display: useViewMore && !isAllTextOpen ? "none" : "inline",
              },
            }}
          />
          {useViewMore && (
            <Button
              variant="unstyled"
              color={headingColor}
              mt={isAllTextOpen ? "-2rem" : "-2rem"}
              _focus={{
                boxShadow: "none",
              }}
              onClick={() => {
                setAllTextOpen(!isAllTextOpen);
              }}
            >
              {isAllTextOpen ? "View Less" : "View More"}
            </Button>
          )}
        </>
      )}
      {isFigureAfterDescription && thumbnail && !Array.isArray(thumbnail) && (
        <Figure caption={thumbnail.caption} mb={4}>
          <picture>
            <source srcSet={thumbnail.webp} type="image/webp" />
            <Img mx="auto" src={thumbnail.png} alt="" />
          </picture>
        </Figure>
      )}
      {children}
    </Box>
  );
}
