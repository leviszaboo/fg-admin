import React from 'react'
import ParagraphManager from './ParagraphManager'
import ContactInfoManager from './ContactInfoManager'

export default function TextManager() {
  return (
    <div className="absolute flex flex-col w-full left-1/2 -translate-x-1/2 justify-center items-center gap-5">
      <ParagraphManager />
      <ContactInfoManager />
    </div> 
  )
}
