import ImageFrame from "./ImageFrame"

interface ImageFrameGroupProps {
    urls: string[]
}

export default function ImageFrameGroup({ urls }: ImageFrameGroupProps) {
  return (
    <>
      {urls.map((url) => (
        <ImageFrame url={url} key={url} />
      ))}
    </>
  );
}

