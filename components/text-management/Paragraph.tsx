import React, { useState } from 'react'
import ParagraphOptions from './ParagraphOptions'
import DeleteParagraphDialog from './DeleteParagraphDialog';
import { ParagraphDocument } from '@/app/hooks/UseFireStoreDocuments';

export default function Paragraph({ paragraph }: { paragraph: ParagraphDocument }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);

  return (
    <div className={`border-2 border-brown rounded-lg h-40 flex flex-column items-center content-center justify-center text-center`}>
      <div className='relative w-full h-full flex flex-column items-center content-center justify-center text-center'>
      <div className="absolute top-0 right-0 pt-2 pr-2 z-50">
        <DeleteParagraphDialog paragraphId={paragraph.id} dialogOpen={deleteDialogOpen} setDialogOpen={setDeleteDialogOpen}/>
        <ParagraphOptions
          open={menuOpen} 
          setOpen={setMenuOpen} 
          setDeleteDialogOpen={setDeleteDialogOpen} 
          setUpdateDialogOpen={setUpdateDialogOpen}
         />
      </div>
      <h2 className="p-2 font-semibold">
      {paragraph.value}
      </h2>
      </div>
    </div>
  )
}
