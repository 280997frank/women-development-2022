import React, { FC, ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  VisuallyHidden,
  AspectRatio,
  Link,
  Grid,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { isMobileOnly } from "react-device-detect";
import canvasTxt from "canvas-txt";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { saveAs } from "file-saver";

import { actions as shareHopeAction } from "@/states/hope/share-hope/slices";

import logo from "@/assets/images/logoPhotos.png";
import photoIcon from "@/assets/images/photoIcon.png";
import photoIconMobile from "@/assets/images/photoIconMobile.png";
import facebook from "@/assets/images/facebook.png";
import twitter from "@/assets/images/twitter.png";
import defaultLogo from "@/assets/images/logo.png";

import { functions, storage, db } from "@/connections/firebase";

import { imageFrame } from "@/constants/shareYourHopes";

import { useOnClickTracking } from "@/hooks/tracking";

import type { CollectionReference } from "firebase/firestore";
import type { RootState } from "@/states/store";
import type { SharedImage } from "@/types/shareYourHopes";

interface InitialValues {
  image_1?: string;
  image_2?: string;
  title?: string;
  content?: string;
  recaptcha?: string;
}

const sharedImageRef = collection(
  db,
  "shared-images"
) as CollectionReference<SharedImage>;

const uploadHope = httpsCallable<InitialValues, { message: string }>(
  functions,
  "uploadPhoto"
);

const MAX_WIDTH = 540;
const MAX_HEIGHT = 960;

const ModalAddHope: FC = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("I believe");
  const [section, setSection] = useState("upload");
  const [recaptcha, setRecaptcha] = useState("");
  const [checked, setChecked] = useState(false);
  const [share, setShare] = useState("");
  const [downloadPost, setDownloadPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [filename, setFilename] = useState("");
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);

  const uploadPhoto = {
    image_1: "",
    image_2: "",
  };

  useOnClickTracking(share !== "", "share", share);

  const uploadImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const data = [
    { label: "I believe", value: "I believe" },
    { label: "I hope", value: "I hope" },
    { label: "I wish", value: "I wish" },
    { label: "I will", value: "I will" },
  ];

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.onSuccessfulReCaptcha = (token) => {
      if (token) {
        setRecaptcha(token);
      }
    };

    window.onExpiredReCaptcha = () => {
      setRecaptcha("");
    };
  }, []);

  const dispatch = useDispatch();

  const { isOpen } = useSelector(
    (state: RootState) => ({
      isOpen: state.shareHope.isOpen,
    }),
    shallowEqual
  );

  const loadImage = (src: string) => {
    let img = new window.Image();
    img.crossOrigin = "*";
    img.src = src;
    const loadedImage = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = (e) => {
        resolve(e.target as HTMLImageElement);
      };

      img.onerror = (error) => {
        if (typeof error === "string") {
          return reject(error);
        }
        reject(error.target);
      };
    });

    return loadedImage;
  };

  const handleUploadImage = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await createCanvas();
      const url = await getDownloadURL(ref(storage, `public/${filename}`));
      // Save URL in database and set the ID in shared URL
      const doc = await addDoc(sharedImageRef, {
        url,
        caption: `${title} ${content}`,
      });
      setImageUrl(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/share/${doc.id}`);
      await uploadHope({
        image_1: uploadPhoto.image_1.split(",")[1],
        image_2: uploadPhoto.image_2.split(",")[1],
        title,
        content,
        recaptcha,
      });
      setShare(`${title} ${content}`);
      setSection("success");
    } catch (error) {
      if (handleValidateInput()) {
        return;
      }
      // console.log(error);
      setShare("");
      setErrorMessage("Something went wrong!");
    } finally {
      setLoading(false);
      setShare("");
    }
  };

  const handleValidateInput = () => {
    if (fileUrl === "" || title === "" || content === "") {
      setErrorMessage("Please Fill All Form");
      return true;
    }
    return false;
  };

  const createCanvas = async () => {
    let canvas2 = canvas2Ref.current;
    let ctx2 = canvas2?.getContext("2d");

    let canvas = canvas1Ref.current;
    let ctx = canvas?.getContext("2d");
    let newImageCaptured: HTMLImageElement;

    if (fileUrl) {
      newImageCaptured = await loadImage(fileUrl);
    } else {
      newImageCaptured = await loadImage(defaultLogo.src);
    }

    if (canvas && ctx2 && ctx) {
      let centerShift_x = 0;
      let centerShift_y = 0;

      let width = newImageCaptured.width;
      let height = newImageCaptured.height;

      // Calculate image size inside canvas
      if (width > height) {
        if (width > MAX_WIDTH) {
          height = height * (MAX_WIDTH / width);
          width = MAX_WIDTH;
          centerShift_y = Math.max((canvas.height - height) / 2, 0);
        }

        if (height > MAX_HEIGHT) {
          width = width * (MAX_HEIGHT / height);
          height = MAX_HEIGHT;
          centerShift_x = Math.max((canvas.width - width) / 2, 0);
        }
      } else if (height > width) {
        if (height > MAX_HEIGHT) {
          width = width * (MAX_HEIGHT / height);
          height = MAX_HEIGHT;
          centerShift_x = Math.max((canvas.width - width) / 2, 0);
        }

        if (width > MAX_WIDTH) {
          height = height * (MAX_WIDTH / width);
          width = MAX_WIDTH;
          centerShift_y = Math.max((canvas.height - height) / 2, 0);
        }
      }

      if (width < MAX_WIDTH) {
        centerShift_x = (canvas.width - width) / 2;
      }

      if (height < MAX_HEIGHT) {
        centerShift_y = (canvas.height - height) / 2;
      }

      if (fileUrl) {
        ctx2.fillStyle = "black";
      } else {
        // Create a linear gradient
        // The start gradient point is at x=20, y=0
        // The end gradient point is at x=220, y=0
        const gradient = ctx2.createLinearGradient(
          0,
          canvas.height * 0.65,
          0,
          canvas.height * 0.75
        );

        // Add two color stops
        gradient.addColorStop(0, "#c7c7c7");
        gradient.addColorStop(1, "#1b4b76");

        // Set the fill style and draw a rectangle
        ctx2.fillStyle = gradient;
      }

      ctx2.fillRect(0, 0, canvas.width, canvas.height);
      ctx2.drawImage(
        newImageCaptured,
        0,
        0,
        newImageCaptured.width,
        newImageCaptured.height,
        centerShift_x,
        fileUrl ? centerShift_y : centerShift_y * 0.6,
        width, // * ratio,
        height // * ratio
      );

      if (fileUrl) {
        const newImageFrame = await loadImage(imageFrame);

        ctx2.drawImage(
          newImageFrame,
          (canvas.width - newImageFrame.width / 3) / 2,
          80,
          newImageFrame.width / 3,
          newImageFrame.height / 3
        );
      }

      ctx2.font = "bold 3rem Arial";
      ctx2.textAlign = "center";
      ctx2.fillStyle = "#FFF";
      ctx2.fillText(title, canvas.width / 2, canvas.height - 180);
      handleTextContent(
        ctx2,
        canvas.width / 2,
        canvas.height - 175,
        canvas.width - 150
      );

      if (fileUrl) {
        ctx.fillStyle = "black";
      } else {
        // Create a linear gradient
        // The start gradient point is at x=20, y=0
        // The end gradient point is at x=220, y=0
        const gradient = ctx.createLinearGradient(
          0,
          canvas.height * 0.65,
          0,
          canvas.height * 0.75
        );

        // Add two color stops
        gradient.addColorStop(0, "#c7c7c7");
        gradient.addColorStop(1, "#1b4b76");

        // Set the fill style and draw a rectangle
        ctx.fillStyle = gradient;
      }

      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        newImageCaptured,
        0,
        0,
        newImageCaptured.width,
        newImageCaptured.height,
        centerShift_x,
        fileUrl ? centerShift_y : centerShift_y * 0.6,
        width, // * ratio,
        height // * ratio
      );
      ctx.font = "bold 3rem Arial";
      ctx.fillStyle = "#FFF";
      ctx.textAlign = "center";
      ctx.fillText(title, canvas.width / 2, canvas.height - 180);
      handleTextContent(
        ctx,
        canvas.width / 2,
        canvas.height - 175,
        canvas.width - 150
      );
    }

    if (canvas1Ref.current && canvas2Ref.current) {
      const blobImage1 = canvas1Ref.current.toDataURL();
      const blobImage2 = canvas2Ref.current.toDataURL();
      uploadPhoto.image_1 = blobImage1;
      uploadPhoto.image_2 = blobImage2;
      setDownloadPost(blobImage2);

      // await canvas2Ref.current.toBlob(async (blob: any) => {
      //   await uploadBytes(ref(storage, `public/${filename}`), blob);
      // });

      const canvasBlob: any = await getCanvasBlob(canvas2Ref.current);
      await uploadBytes(ref(storage, `public/${filename}`), canvasBlob);
    }
  };

  const getCanvasBlob = (canvas: HTMLCanvasElement) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  };

  const handleTextContent = (
    ctx: CanvasRenderingContext2D,
    x: number,
    firstY: number,
    maxWidth: number
  ) => {
    ctx.font = "1.75rem Arial";
    canvasTxt.drawText(
      ctx,
      content,
      x - maxWidth / 2,
      firstY,
      maxWidth,
      MAX_HEIGHT - firstY
    );
    /* let words = content.split(" ");
    let line = "";
    let lineHeight = 32 * 1.5; // 24 * 0.8; // a good approx for 10-18px sizes
    ctx.font = "1.75rem Arial";
    firstY += lineHeight * 0.7;
    ctx.fillText("", x, firstY);

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth) {
        ctx.textAlign = "center";
        ctx.fillText(line, x, firstY);
        if (n < words.length - 1) {
          line = words[n] + " ";
          firstY += lineHeight;
        }
      } else {
        line = testLine;
      }
    }
    ctx.textAlign = "center";
    ctx.fillText(line, x, firstY); */
  };

  const resetCanvas = () => {
    let image1 = canvas1Ref.current;
    let ctxImage1 = image1?.getContext("2d");
    let image2 = canvas2Ref.current;
    let ctxImage2 = image2?.getContext("2d");

    if (image1 && ctxImage1 && image2 && ctxImage2) {
      ctxImage1.clearRect(0, 0, image1.width, image1.height);
      ctxImage2.clearRect(0, 0, image2.width, image2.height);
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    resetCanvas();
    if (
      e.currentTarget.files instanceof window.FileList &&
      e.currentTarget.files.length > 0
    ) {
      URL.revokeObjectURL(fileUrl);
      const filenameImage = e.currentTarget.files[0].name;
      const objectUrl = URL.createObjectURL(e.currentTarget.files[0]);
      setFileUrl(objectUrl);
      setFilename(filenameImage);
    }
  };

  const handleDownload = () => {
    setLoading(true);
    const date = new Date().toISOString();
    const day = date.slice(0, 10);
    const time = date.substr(11, 8);
    saveAs(downloadPost as string, `WD ${day} at ${time}.png`);
    setLoading(false);
  };

  // useEffect(() => {
  //   console.log("hfjdfjhdjhdhgd")
  //   // resetCanvas();
  //   handleCanvas();
  // }, [handleCanvas])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(shareHopeAction.clear());
        setContent("");
        setFileUrl("");
        setLoading(false);
        setRecaptcha("");
        setChecked(false);
        setTitle("I believe");
        setSection("upload");
        setFilename("");
        setErrorMessage("");
      }}
      size={isMobileOnly ? "full" : "xs"}
      isCentered={!isMobileOnly}
    >
      <ModalOverlay bgColor={{ base: "#F7F5E8", md: "rgba(0, 0, 0, 0.4)" }} />
      <ModalContent
        bgColor="#F7F5E8"
        minW={{ base: "100vw", md: "70vw", lg: "60vw", "2xl": "50vw" }}
        // minH={{ base: "100vh" }}
        // maxH={{ base: "-webkit-fill-available" }}
      >
        <ModalCloseButton
          pos="absolute"
          right={{ base: "5", md: "-10" }}
          w={{ base: "50px", md: "30px" }}
          h={{ base: "50px", md: "30px" }}
          marginTop="0px"
          bgColor={{ base: "#EADDC6", md: "transparent" }}
          borderRadius="full"
          border="1px solid white"
          color="white"
        />
        <ModalBody>
          {section == "upload" && (
            <Flex flexDir="column" pt={{ base: "20%", md: "0px" }}>
              <Box w="100%">
                <Heading color="#255B8B">Share Your Hopes</Heading>
              </Box>
              <Box>
                <Text color="#484947" fontSize="20px">
                  Tell us about your aspirations for the Singapore women around
                  you such as your mother, wife, daughter, sister, colleague or
                  friend.
                </Text>
              </Box>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                mt={{ md: 10 }}
                gap={{ md: 8 }}
              >
                <canvas
                  ref={canvas1Ref}
                  id="canvas"
                  width={MAX_WIDTH}
                  height={MAX_HEIGHT}
                  style={{ display: "none" }}
                />
                <canvas
                  ref={canvas2Ref}
                  id="canvas"
                  width={MAX_WIDTH}
                  height={MAX_HEIGHT}
                  style={{ display: "none" }}
                />
                <Box
                  mt={{ base: 10, md: 0 }}
                  onClick={() => uploadImage()}
                  cursor="pointer"
                  mb={10}
                  w={{ base: "100%", md: "240px" }}
                  h={{ base: "100%", md: "360px" }}
                >
                  {fileUrl ? (
                    <Grid>
                      <AspectRatio ratio={2 / 3} bgColor="black">
                        <Flex align="center" pos="relative">
                          <Image
                            zIndex={0}
                            loading="lazy"
                            src={fileUrl}
                            alt=""
                          />
                          <Box
                            pos="absolute"
                            top={0}
                            pt="10%"
                            pl="30%"
                            pr="30%"
                          >
                            <Image src={logo.src} alt="" />
                          </Box>
                          <Box
                            pos="absolute"
                            top={content.length > 40 ? "65%" : "75%"}
                            zIndex={100}
                            w="100%"
                            h="100%"
                          >
                            <Text
                              fontWeight="bold"
                              color="white"
                              textAlign="center"
                              fontSize="15px"
                            >
                              {title}
                            </Text>
                            <Text
                              color="white"
                              textAlign="center"
                              fontSize="15px"
                              w="80%"
                              m="1rem auto 0"
                            >
                              {content}
                            </Text>
                          </Box>
                        </Flex>
                      </AspectRatio>
                    </Grid>
                  ) : (
                    <Image
                      w={{ base: "100%", md: "auto" }}
                      h="100%"
                      src={isMobileOnly ? photoIconMobile.src : photoIcon.src}
                      alt="Take a Photo"
                      htmlWidth={
                        isMobileOnly ? photoIconMobile.width : photoIcon.width
                      }
                      htmlHeight={
                        isMobileOnly ? photoIconMobile.height : photoIcon.height
                      }
                    />
                  )}
                  <VisuallyHidden>
                    <input
                      value=""
                      type="file"
                      accept="image/png,image/jpeg,.png,.jpg,.jpeg"
                      ref={imageInputRef}
                      onChange={(e) => {
                        handleImage(e);
                      }}
                    />
                  </VisuallyHidden>
                </Box>
                <Box w={{ base: "100%", md: "60%" }}>
                  <Flex flexDir="column">
                    <InputGroup>
                      <Select
                        w="148px"
                        // placeholder=""
                        border="none"
                        bgColor="white"
                        borderRadius={0}
                        color="#000"
                        // icon={<BsFillCaretDownSquareFill style={{color: "blue"}}/>}
                        // iconColor="blue"
                        // iconSize="100"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        value={title}
                        sx={{
                          "&": {
                            paddingLeft: 2,
                          },
                        }}
                      >
                        {data.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </Select>
                      {/*  <InputRightElement*/}
                      {/*    pointerEvents="none"*/}
                      {/*    color="white"*/}
                      {/*    bgColor="blue"*/}
                      {/*    fontSize="1.2em"*/}
                      {/*    mr="225px"*/}
                      {/*  >*/}
                      {/*    <BiCaretDown />*/}
                      {/*  </InputRightElement>*/}
                    </InputGroup>
                    <Text textAlign="right" fontSize="12px">
                      {content.length == 0 ? 0 : content.length}/80
                    </Text>
                    <Textarea
                      w={{ base: "100%", md: "100%" }}
                      h="15vh"
                      mb={10}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      size="sm"
                      bgColor="white"
                      resize="none"
                      maxLength={80}
                    />
                    {/*<Box>*/}
                    {typeof window !== "undefined" && (
                      <ReCAPTCHA
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
                        }
                        onChange={window.onSuccessfulReCaptcha}
                        onExpired={window.onExpiredReCaptcha}
                        onErrored={window.onErrorReCaptcha}
                      />
                    )}
                    {/*</Box>*/}
                    <Flex
                      mt={5}
                      flexDir={{ base: "column", md: "row" }}
                      justifyContent="space-between"
                    >
                      <Checkbox
                        alignItems="flex-start"
                        iconColor="brand.orange"
                        size="md"
                        sx={{
                          "& .chakra-checkbox__control": {
                            background: "white !important",
                            // borderColor: "white !important",
                            borderRadius: "base",
                          },
                        }}
                        isChecked={checked}
                        onChange={(e) => {
                          setChecked(e.target.checked);
                        }}
                      >
                        <Text fontSize="12px">
                          I have read and agree to the
                        </Text>
                        <Link
                          variant="unstyled"
                          fontSize="12px"
                          color="blue"
                          bgColor="transparent"
                          _hover={{ background: "transparent" }}
                          _active={{
                            boxShadow: "none",
                            bg: "transparent",
                          }}
                          p={0}
                          h="auto"
                          fontWeight="bold"
                          isExternal
                          download="terms-and-conditions.pdf"
                          href="https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/Terms%20%26%20Conditions.pdf?alt=media&token=e34f9f37-1366-48b4-9111-8f740f2f1440"
                        >
                          terms and conditions
                        </Link>
                      </Checkbox>
                      <Flex flexDir="column">
                        <Button
                          bgColor="transparent"
                          type="submit"
                          form="register-form"
                          border="1px solid blue"
                          color="blue"
                          borderRadius="none"
                          onClick={() => handleUploadImage()}
                          disabled={!checked || recaptcha === ""}
                          isLoading={loading}
                          mt={{ base: 5, md: 0 }}
                        >
                          SUBMIT
                        </Button>
                        <Text color="red" mt={3}>
                          {errorMessage}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          )}

          {section == "success" && (
            <Flex flexDir="column" justifyContent="center" pt={20}>
              <Box textAlign="center" mt={10}>
                <Heading color="#255B8B">Thank you for your</Heading>
                <Heading color="#255B8B">submission!</Heading>
              </Box>
              <Box textAlign="center">
                <Button
                  borderRadius={50}
                  pl={10}
                  pr={10}
                  mt={10}
                  bgColor="#255B8B"
                  color="#FFF"
                  _hover={{ background: "#255B8B" }}
                  _active={{ background: "#255B8B" }}
                  onClick={() => handleDownload()}
                  isLoading={loading}
                >
                  Download your post
                </Button>
              </Box>
              <Box textAlign="center">
                <Text mt={10}>Share your submission on social media!</Text>
              </Box>
              <Flex flexDir="row" justifyContent="center" mt={10} mb={10}>
                <FacebookShareButton url={imageUrl}>
                  <Image mr={10} src={facebook.src} alt="Facebook" />
                </FacebookShareButton>
                <TwitterShareButton url={imageUrl}>
                  <Image w="50px" src={twitter.src} alt="Twitter" />
                </TwitterShareButton>
              </Flex>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddHope;
