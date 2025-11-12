"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import UploadDialog from "./UploadDialog";
import { uploadFile } from "@/app/utils/imageKit";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { FeaturedPhotoType } from "@/app/interfaces/documents";

interface FeaturedPhotosProps {
  type: FeaturedPhotoType;
  title: string;
}

export default function GalleryCover({ type, title }: FeaturedPhotosProps) {
  const auth = useAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const [digitalVersion, setDigitalVersion] = useState<number>(0);
  const [analogVersion, setAnalogVersion] = useState<number>(0);

  const digitalBasePath = user?.uid + "/digital-cover";
  const analogBasePath = user?.uid + "/analog-cover";

  // Load version numbers from Firestore
  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, user.uid, "coverVersions");
    getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setDigitalVersion(data.digitalCoverVersion || 0);
        setAnalogVersion(data.analogCoverVersion || 0);
      } else {
        // Initialize if not exist
        setDoc(docRef, {
          digitalCoverVersion: 0,
          analogCoverVersion: 0,
        });
      }
    });
  }, [user, db]);

  // uploader that increments version after upload
  const customUploader = async (
    file: File,
    name: string,
    basePath: string,
    isDigital: boolean
  ) => {
	if (!user) return;

    await uploadFile(file, name, basePath, false);

    const docRef = doc(db, user.uid, "coverVersions");
    const newVersion = Date.now();

    if (isDigital) {
      await updateDoc(docRef, { digitalCoverVersion: newVersion });
      setDigitalVersion(newVersion);
    } else {
      await updateDoc(docRef, { analogCoverVersion: newVersion });
      setAnalogVersion(newVersion);
    }
  };

  return (
    <div className="flex p-4 mt-1 mb-4 h-3/5 w-10/12 gap-4">
      {/* Digital */}
      <div className="bg-orange-50 rounded-3xl w-10/12 p-4 mt-1 mb-4">
        <div className="relative flex top-0 w-full justify-between items-center">
          <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">
            Digital Cover
          </div>
        </div>
        <div className="grid grid-cols-[30%_68%] p-4 gap-4">
          <UploadDialog
            type={type}
            basePath={digitalBasePath}
            customUploader={(file: File, name: string, basePath: string) =>
              customUploader(file, name, basePath, true)
            }
            customFileName="digital-cover"
          />
          <div className="flex flex-column border-2 border-brown rounded-lg h-80 overflow-hidden items-center content-center justify-center text-center">
            <div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
              <div className="relative h-full w-full">
                <img
                  className="object-cover min-h-full -z-50"
                  src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${digitalBasePath}/digital-cover?v=${digitalVersion}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analog */}
      <div className="p-4 mt-1 mb-4 bg-orange-50 w-10/12 rounded-3xl">
        <div className="relative flex top-0 w-full justify-between items-center">
          <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">
            Analog Cover
          </div>
        </div>
        <div className="grid grid-cols-[30%_68%] p-4 gap-4">
          <UploadDialog
            type={type}
            basePath={analogBasePath}
            customUploader={(file: File, name: string, basePath: string) =>
              customUploader(file, name, basePath, false)
            }
            customFileName="analog-cover"
          />
          <div className="flex flex-column border-2 border-brown rounded-lg h-80 overflow-hidden items-center content-center justify-center text-center">
            <div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
              <div className="relative h-full w-full">
                <img
                  className="object-cover min-h-full -z-50"
                  src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${analogBasePath}/analog-cover?v=${analogVersion}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}