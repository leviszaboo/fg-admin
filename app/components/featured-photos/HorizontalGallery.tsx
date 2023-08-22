import { Plus } from "lucide-react";
import { useState } from "react";

export default function HorizontalGallery() {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="relative h-11/12 overflow-y-scroll rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          <div className="border-2 border-lightbrown rounded-lg h-44 flex flex-column items-center content-center justify-center text-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Plus className="w-6 h-6 svg-transition" color={isHovered ? 'grey' : '#a8a29e'}/>
          </div>
        </div>
      </div>
    </>
  )
}