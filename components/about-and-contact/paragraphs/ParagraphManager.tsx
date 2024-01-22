"use client";

import ParagraphCollection from "./ParagraphCollection";
import AddParagraphDialog from "./AddParagraphDialog";

export default function ParagraphManager() {
  return (
    <div className="p-4 bg-orange-50 rounded-3xl w-10/12 h-4/5">
      <div className="flex top-0 w-full justify-between items-center">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">
          About Me
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 h-11/12">
        <ParagraphCollection />
        <AddParagraphDialog />
      </div>
    </div>
  );
}
