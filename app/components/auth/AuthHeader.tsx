import Link from "next/link"
import { PawPrint } from "lucide-react"

export default function AuthHeader() {
  return (
    <>
      <div className="flex items-center p-4 mt-1">
        <Link href='/'>
          <PawPrint className="w-10 h-10 m-3 mr-4"/>
        </Link>
      </div>
    </>
  )
}
