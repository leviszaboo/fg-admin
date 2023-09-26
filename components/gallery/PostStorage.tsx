import { useEffect } from "react";

import Post from "./Post";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";

export default function PostStorage() {
  const { postDocuments } = useFireStoreDocumentsStore()

  return (
    <div className="h-11/12 overflow-y-scroll rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {postDocuments.map((post) => ( 
          <Post urls={post.imageUrls} title={post.title} subTitle={post.subTitle} />
        ))}
      </div>
    </div>
  )
}