"use client";

import AboutMe from "./AboutMe";
import ContactInfo from "./ContactInfo";
import TextManagerHeader from "./TextManagerHeader";


export default function TextManager() {

  return (
    <>
     <div className="absolute p-4 bg-orange-50 rounded-3xl w-10/12 h-4/5 left-1/2 -translate-x-1/2"> 
        <TextManagerHeader />
        <div className="flex">
        <AboutMe />
        <ContactInfo />
        </div>
     </div>
    </>
  )
}