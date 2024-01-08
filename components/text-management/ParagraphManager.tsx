"use client";

import AboutMe from "./AboutMe";
import ContactInfo from "./ContactInfoManager";


export default function ParagraphManager() {

  return (
     <div className="p-4 bg-orange-50 rounded-3xl w-10/12 h-4/5"> 
        <div className="flex top-0 w-full justify-between items-center">
          <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">About Me</div>
        </div>
        <AboutMe />
     </div>
  )
}