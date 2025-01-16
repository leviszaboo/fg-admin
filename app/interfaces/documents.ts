export interface FsDocument {
  id: string;
  createdAt: Date;
}

export interface FeaturedDocument extends FsDocument {
  name: string;
  url: string;
  fileId: string;
  type: "vertical" | "horizontal" | "about-me";
}

export interface ParagraphDocument extends FsDocument {
  value: string;
}

export interface PostDocument extends FsDocument {
  imageUrls: string[];
  fileIds: string[];
  descriptionLayout: string;
  title: string;
  subTitle: string;
  description: string;
  destinationGallery: string;
  coverPhoto?: string;
}
