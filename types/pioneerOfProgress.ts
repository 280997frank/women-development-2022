export interface IQuiz {
  question: string;
  answers: string[];
  correct: number;
  funfact: string;
}

interface IBaseContent {
  title: string;
  description: string;
}

export interface IImageModal {
  jpg: string;
  webp: string;
}

interface IImageBaseContent {
  image: string;
  imageModal: string;
  caption: string;
}

interface IBio {
  title: string;
  subtitle: string;
  image: string;
  bio: string;
}

interface IQuote {
  author: string;
  quote: string;
}

interface IVideo {
  videoSrc: string;
  thumbnail: string;
  caption: string;
}

export interface PopIntro {
  mobile: string;
  desktop: string;
  desktopMp4: string;
  desktopWebm: string;
  description: string;
}

export interface Pop1959 {
  section1: IBaseContent & {
    image: string;
  };
  section2: IImageBaseContent & {
    imageModal: IImageModal;
  };
  section3: IVideo;
  section4: IBio & {
    imageModal: IImageModal;
  };
  section5: IBaseContent;
}

export interface Pop1960 {
  section1: IImageBaseContent & {
    imageModal: IImageModal;
  };
  section2: IImageBaseContent & {
    quiz: IQuiz;
    imageModal: IImageModal;
  };
}

export interface Pop1961 {
  description: string;
  image: string;
  imageModal: IImageModal;
  title: string;
}

export interface Pop1964 {
  caption: string;
  description: string;
  image: string;
  imageModal: IImageModal;
  title: string;
}

export interface Pop1968 {
  caption: string;
  description: string;
  image: string;
  title: string;
  imageModal: IImageModal;
}

export interface Pop1978 {
  title: string;
  description: string;
}

export interface Pop1980 {
  section1: {
    description: string;
    title: string;
  };
  section2: IImageBaseContent & {
    audio: string;
    audioCaption: string;
    imageModal: IImageModal;
  };
  section3: IImageBaseContent & {
    quiz: IQuiz;
    imageModal: IImageModal;
  };
}

export interface Pop1994 {
  section1: IBaseContent;
  section2: IImageBaseContent & {
    imageModal: IImageModal;
  };
  section3: IBio & {
    imageModal: IImageModal;
  };
  section4: IQuote;
  section5: IImageBaseContent & {
    quiz: IQuiz;
    imageModal: IImageModal;
  };
}

export interface Pop1995 {
  title: string;
  description: string;
}

export interface Pop1996 {
  title: string;
  description: string;
}

export interface Pop2000 {
  section1: IBaseContent;
  section2: IBaseContent;
  section3: {
    caption: string;
    image: string;
    quiz: IQuiz;
    imageModal: IImageModal;
  };
}

export interface Pop2001 {
  title: string;
  description: string;
}

export interface Pop2007 {
  section1: IBaseContent;
  section2: IImageBaseContent & {
    quiz: IQuiz;
    imageModal: IImageModal;
  };
  section3: IBaseContent;
}

export interface Pop2009 {
  section1: IBaseContent;
  section2: IImageBaseContent & {
    imageModal: IImageModal;
  };
  section3: IBio & {
    imageModal: IImageModal;
  };
  section4: IQuote;
}

export interface Pop2011 {
  title: string;
  description: string;
}

export interface Pop2013 {
  section1: IBaseContent;
  section2: IQuote;
  section3: IImageBaseContent & {
    quiz: IQuiz;
  };
}

export interface Pop2014 {
  section1: IBaseContent;
  section2: IImageBaseContent & {
    imageModal: IImageModal;
  };
}

export interface Pop2016 {
  description: string;
  title: string;
  video: IVideo;
}

export interface Pop2017 {
  section1: IImageBaseContent &
    IBaseContent & {
      video: IVideo;
      imageModal: IImageModal;
    };
  section2: IBio &
    IQuote & {
      imageModal: IImageModal;
    };
}

export interface Pop2019 {
  section1: IBaseContent;
  section2: IBaseContent & {
    video: IVideo;
  };
}
