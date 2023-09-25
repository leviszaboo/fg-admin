import { useEffect } from "react";

import Post from "./Post";

export default function PostStorage() {

  return (
    <div className="h-11/12 overflow-y-scroll rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        <Post urls={["https://firebasestorage.googleapis.com/v0/b/luigi-website.appspot.com/o/leviszaboo%40icloud.com%2Ffeatured%2Fhorizontal%2Fstonebwoy.jpeg?alt=media&token=e6e9a30e-9400-4258-abf8-363acbeb8b3b"]} />
        <Post urls={["https://firebasestorage.googleapis.com/v0/b/luigi-website.appspot.com/o/leviszaboo%40icloud.com%2Ffeatured%2Fhorizontal%2Fpond.jpeg?alt=media&token=c17c77f6-670a-4e53-9a84-dd8ed34164ad"]} />
        <Post urls={["https://firebasestorage.googleapis.com/v0/b/luigi-website.appspot.com/o/leviszaboo%40icloud.com%2Ffeatured%2Fvertical%2Fdj.jpeg?alt=media&token=3a5c846d-d577-4f2e-84f4-09f4f8df37a9", 
"https://firebasestorage.googleapis.com/v0/b/luigi-website.appspot.com/o/leviszaboo%40icloud.com%2Ffeatured%2Fvertical%2Fmask.jpeg?alt=media&token=55d8ea2f-3845-4536-af91-07a48a2f91b0"]} />
      </div>
    </div>
  )
}