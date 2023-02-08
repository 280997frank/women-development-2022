import { object, string, number } from "yup";

const base64ImagePattern =
  // data:image\/(png|jpg|jpeg);base64,
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;

const requiredString = string().required().trim();
const requiredBase64ImageUrl = requiredString.matches(
  base64ImagePattern,
  "Invalid base64 URL of PNG/JPEG"
);

export const getPhotosSchema = object().shape({
  noOfPhotos: number().min(1).max(20),
  pageNumber: number().min(1),
});

export const submitPollSchema = object().shape({
  question: requiredString.oneOf(["1", "2", "3", "4", "5"]),
  answer: requiredString.oneOf(["YES", "NO"]),
  recaptcha: requiredString,
});

export const uploadPhotoSchema = object().shape({
  image_1: requiredBase64ImageUrl,
  image_2: requiredBase64ImageUrl,
  title: requiredString.oneOf(["I wish", "I will", "I hope", "I believe"]),
  content: requiredString.max(80),
  recaptcha: requiredString,
});
