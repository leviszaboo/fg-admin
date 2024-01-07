import { Button } from "../ui/button";
import AddParagraphDialog from "./AddParagraphDialog";
import Paragraph from "./Paragraph";
import ParagraphCollection from "./ParagraphCollection";

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <ParagraphCollection />
      <AddParagraphDialog />
    </div>
  )
}
