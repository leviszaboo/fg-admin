import { FeaturedDocument } from "@/app/interfaces/documents";
import ImageFrame from "./ImageFrame";

interface ImageFrameGroupProps {
  docs: FeaturedDocument[];
}

export default function ImageFrameGroup({ docs }: ImageFrameGroupProps) {
  return (
    <>
      {docs.map((doc) => (
        <ImageFrame doc={doc} key={doc.fileId} />
      ))}
    </>
  );
}
