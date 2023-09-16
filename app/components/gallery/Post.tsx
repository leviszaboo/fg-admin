import { Button } from "@/components/ui/button"
import { Circle, Dot, MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface PostProps {
	urls: string[]
}

export default function Post({ urls }: PostProps) {
  const [url, setUrl] = useState<string>(urls[0])

  return (
    <>
		  <div className={`border-2 border-brown rounded-lg h-80 flex flex-column overflow-hidden items-center content-center justify-center text-center`}>
				<div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
					<div className="relative h-full w-full">
              <div className="absolute bottom-0 left-0 pb-3 pl-4 z-50 text-left">
								<h3 className="text-shadow text-white text-md font-medium pb-0">The New Originals, Amsterdam</h3>
                <h3 className="text-shadow text-white text-md font-medium">2023</h3>
							</div>
              <div className="transparent flex flex-column items-center absolute bottom-0 right-0 pr-3 pb-3 z-50 text-left">
                {urls.map((_, index) => (
                  <div className="p-1">
                    <Circle size={8} fill="white" onClick={() => {
                      setUrl(urls[index])
                    }
                  } className="text-white"/>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 right-0 pt-3 pr-2 z-50">
								<Button variant={"ghost"} size={"xs"}>
                  <MoreHorizontal size={28} className="transparent text-white"/>
                </Button>
							</div>
						<img className={`object-cover min-h-full -z-50 brightness-80`} src={url}/>
					</div>
				</div>
			</div>
		</>
  )
}