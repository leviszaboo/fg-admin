import { Button } from "../ui/button";
import AddParagraphDialog from "./paragraphs/AddParagraphDialog";
import Paragraph from "./paragraphs/Paragraph";
import ParagraphCollection from "./paragraphs/ParagraphCollection";

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-4 p-4 h-11/12">
      <ParagraphCollection />
      <AddParagraphDialog />
    </div>
  )
}
