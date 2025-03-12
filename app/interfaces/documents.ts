export type FeaturedPhotoType = "vertical" | "horizontal" | "about-me" | "intro";

export type FsDocumentType = FeaturedPhotoType | "analog" | "digital" | "paragraph";

export interface FsDocument {
  id: string;
  createdAt: Date;
}

export interface FeaturedDocument extends FsDocument {
  name: string;
  url: string;
  fileId: string;
  type: FeaturedPhotoType;
  aspectRatio: number;
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
  imageAspectRatios?: number[];
}
