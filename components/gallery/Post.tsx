import { Button } from "@/components/ui/button"
import { Circle, Dot, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import DeletePostDialog from "./DeletePostDialog"
import PostOptions from "./PostOptions"
import UpdatePostDialog from "./UpdatePostDialog"

interface PostProps {
  id: string,
	urls: string[],
  title: string,
  subTitle: string
}

export default function Post({ id, urls, title, subTitle }: PostProps) {
  const [url, setUrl] = useState<string>(urls[0])
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false)

  return (
    <>
		  <div className={`border-2 border-brown rounded-lg h-80 flex flex-column overflow-hidden items-center content-center justify-center text-center`}>
				<div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
					<div className="relative h-full w-full bg-black">
            <div className="absolute top-0 right-0 pt-2 pr-2 z-50">
              <DeletePostDialog postId={id} dialogOpen={deleteDialogOpen} setDialogOpen={setDeleteDialogOpen} />
              <UpdatePostDialog postId={id} dialogOpen={updateDialogOpen} setDialogOpen={setUpdateDialogOpen} />
              <PostOptions open={menuOpen} setOpen={setMenuOpen} setDeleteDialogOpen={setDeleteDialogOpen} setUpdateDialogOpen={setUpdateDialogOpen}/>
              </div>
              <div className="absolute bottom-0 left-0 pb-3 pl-4 z-50 text-left">
								<h3 className="text-shadow text-white text-md font-medium pb-0">{title}</h3>
                <h3 className="text-shadow text-white text-md font-medium">{subTitle}</h3>
							</div>
              <div className="transparent flex flex-column items-center absolute bottom-0 right-0 pr-3 pb-3 z-50 text-left">
                {urls.map((url) => (
                  <div className="p-1" key={url} onClick={() => {
                    setUrl(url)
                  }}>
                    <Circle size={8} fill="white" className={`${urls.length > 1 ? "transparent" : null} text-white`}/>
                  </div>
                ))}
              </div>
						<img className={`object-cover min-h-full -z-50 brightness-80`} src={url}/>
					</div>
				</div>
			</div>
		</>
  )
}