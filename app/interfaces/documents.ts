
interface Document {
  id: string;
  createdAt: Date;
}

export interface FeaturedDocument extends Document {
  name: string;
  url: string;
  fileId: string;
  type: "vertical" | "horizontal" | "about-me";
}

export interface ParagraphDocument extends Document {
  value: string;
}

export interface PostDocument extends Document {
  imageUrls: string[];
  fileIds: string[];
  descriptionLayout: string;
  title: string;
  subTitle: string;
  description: string;
  destinationGallery: string;
  coverPhoto?: string;
}
