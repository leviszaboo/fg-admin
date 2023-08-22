"use client";

import { useState } from "react";
import { Plus } from "lucide-react";


export default function Gallery() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <>
      <div className="absolute p-4 mt-7 bg-orange-50 rounded-3xl w-10/12 h-4/5 top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Gallery</div>
          <div className="relative h-11/12 overflow-y-scroll rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              <div className="border-2 border-lightbrown rounded-lg h-44 flex flex-column items-center content-center justify-center text-center"
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
              >
                <Plus className="w-6 h-6 svg-transition" color={isHovered ? 'grey' : '#a8a29e'}/>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
