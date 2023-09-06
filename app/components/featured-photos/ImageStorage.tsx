import { useEffect } from "react";
import { 
  ref, 
  getDownloadURL,
  listAll,
  StorageReference,
} from "firebase/storage";

import ImageFrame from "./ImageFrame";
import UploadDialog from "./UploadDialog";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useImageUrlStore from "@/app/hooks/UseImageUrl";
import { storage } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import ImageFrameGroup from "./ImageFrameGroup";

export default function ImageStorage() {
  const {
    verticalUrls,
    horizontalUrls,
    setVerticalUrls,
    setHorizontalUrls
  } = useImageUrlStore()

  const { isVerticalSelected } = useSelectImagesStore();

  const auth = useAuth();
  const user = auth.currentUser
  const verticalListRef = ref(storage, `${user?.email}/featured/vertical/`);
  const horizontalListRef = ref(storage, `${user?.email}/featured/horizontal/`);

  async function fetchImageUrls(listRef: StorageReference, setterFunction: (urls: string[]) => void) { 
    try {
      const res = await listAll(listRef)
      
      const urlPromises = res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      });

      const imageUrls = await Promise.all(urlPromises);
      setterFunction(imageUrls);
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  }

  useEffect(() => {
    fetchImageUrls(verticalListRef, setVerticalUrls);
    fetchImageUrls(horizontalListRef, setHorizontalUrls)
  }, [])

  return (
    <>
      <div className="relative h-11/12 overflow-y-scroll rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
          <UploadDialog />
          {isVerticalSelected && <ImageFrameGroup urls={verticalUrls} />}
          {!isVerticalSelected && <ImageFrameGroup urls={horizontalUrls} />}
        </div>
      </div>
    </>
  )
}