import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/home">
      <PawPrint className="w-10 h-10 m-3 mr-4" />
    </Link>
  );
}
