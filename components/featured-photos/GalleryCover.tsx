"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { useFetchDocs } from "@/app/hooks/useFetchDocs";
import { FeaturedPhotoType } from "@/app/interfaces/documents";
import { useEffect } from "react";
import ImageFrameGroup from "../ImageFrameGroup";
import UploadDialog from "./UploadDialog";
import FeaturedPhotosHeader from "./FeaturedPhotosHeader";
import ImageFrame from "../ImageFrame";
import { uploadFile } from "@/app/utils/imageKit";

interface FeaturedPhotosProps {
  type: FeaturedPhotoType;
  title: string;
}

export default function GalleryCover({ type, title }: FeaturedPhotosProps) {
  const customUploader = async (file: File, name: string, basePath: string) => {
		await uploadFile(file, name, basePath, false);
	}

	const auth = useAuth();
	const user = auth.currentUser;

	const digitalBasePath = user?.uid + "/digital-cover";
	const analogBasePath = user?.uid + "/analog-cover";

  return (
    <div className="flex p-4 mt-1 mb-4 h-3/5 w-10/12 gap-4">
			<div className="bg-orange-50 rounded-3xl w-10/12 p-4 mt-1 mb-4">
				<div className="relative flex top-0 w-full justify-between items-center">
      		<div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">
        		Digital Cover
      		</div>
				</div>
				<div className="grid grid-cols-[30%_68%] p-4 gap-4">				
					<UploadDialog type={type} basePath={digitalBasePath} customUploader={customUploader} customFileName="digital-cover"/>
					<div className="flex flex-column border-2 border-brown rounded-lg h-80 overflow-hidden items-center content-center justify-center text-center">
      			<div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
        			<div className="relative h-full w-full">
          			<img
            			className="object-cover min-h-full -z-50"
            			src={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT + "/" + digitalBasePath + "/digital-cover"}
          			/>
       				 </div>
      			</div>
    			</div>
				</div>
			</div>
			<div className="p-4 mt-1 mb-4 bg-orange-50 w-10/12 rounded-3xl">
				<div className="relative flex top-0 w-full justify-between items-center">
					<div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">
						Analog Cover
					</div>
				</div>
				<div className="grid grid-cols-[30%_68%] p-4 gap-4">
					<UploadDialog type={type} basePath={analogBasePath} customUploader={customUploader} customFileName="analog-cover"/>
					<div className="flex flex-column border-2 border-brown rounded-lg h-80 overflow-hidden items-center content-center justify-center text-center">
						<div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
							<div className="relative h-full w-full">
								<img
									className="object-cover min-h-full -z-50"
									src={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT + "/" + analogBasePath + "/analog-cover"}
								/>
			 				 </div>
						</div>
					</div>
				</div>
			</div>
    </div>
  );
}