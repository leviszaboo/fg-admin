"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { useAuth } from "../../utils/AuthContext";
import useActiveLink from "@/app/hooks/activeLink";
import { useState } from "react";

export default function Header() {
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useAuth();
  const { activeLink, setActiveLink } = useActiveLink();

  const router = useRouter();

  async function handleSignOut() {
    setLoading(true);

    try {
      await auth.logout();
      router.push('/');
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="flex items-center p-4 mt-1">
        <Link href='/home'>
          <PawPrint className="w-10 h-10 m-3 mr-4"/>
        </Link>
           <NavigationMenu>
           <NavigationMenuList>
             <NavigationMenuItem>
               <Link href="/home" onClick={() => setActiveLink(0)}>
                 <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                   <div className={`text-base ${activeLink === 0 ? "text-amber-900" : null}`}>Manage Gallery</div>
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               <Link href="/featured-photos" onClick={() => setActiveLink(1)}>
                 <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                   <div className={`text-base ${activeLink === 1 ? "text-amber-900" : null}`}>Featured Photos</div>
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               <Link href="/home" onClick={() => setActiveLink(2)}>
                 <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                   <div className={`text-base ${activeLink === 2 ? "text-amber-900" : null}`}>Text Management</div>
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
           </NavigationMenuList>
         </NavigationMenu>
         <NavigationMenu className="ml-auto">
           <NavigationMenuList>
             <NavigationMenuItem>
               <NavigationMenuTrigger>Profile Settings</NavigationMenuTrigger>
               <NavigationMenuContent>
                <ul className="grid gap-3 grid-rows-2 w-36">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Update email
                  </NavigationMenuLink>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Reset password
                  </NavigationMenuLink>
                </ul>
               </NavigationMenuContent>
               </NavigationMenuItem>
           </NavigationMenuList>
         </NavigationMenu>
         <Button onClick={handleSignOut} className="ml-2 bg-amber-900" disabled={loading}>
           Sign Out
         </Button>
      </div>
    </>
  )
}