"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useAuth } from "@/app/context/AuthContext";
import Logo from "./Logo";
import UpdateUserDataDialog from "./auth/UpdateUserDataDialog";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useGalleryStore from "@/app/hooks/UseGallery";

export default function Header() {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState(0);
  const [emailDialogOpen, setEmailDialogOpen] = useState<boolean>(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState<boolean>(false);

  const { setIsVerticalSelected } = useSelectImagesStore();
  const { setIsAnalogSelected } = useGalleryStore();

  const auth = useAuth();
  const user = auth.currentUser;

  const currentPathname = usePathname();

  useEffect(() => {
    setIsVerticalSelected(true);
    setIsAnalogSelected(true);

    if (currentPathname === "/analog") {
      setActiveLink(0);
    } else if (currentPathname === "/featured-photos") {
      setActiveLink(1);
    } else if (currentPathname === "/about-and-contact") {
      setActiveLink(2);
    }
  }, [currentPathname]);

  async function handleSignOut() {
    setLoading(true);

    try {
      await auth.logout();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="flex items-center p-4 mt-1">
        <Logo />
        {user && (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/home" onClick={() => setActiveLink(0)}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <div
                        className={`text-base ${activeLink === 0 ? "text-amber-900" : null}`}
                      >
                        Manage Gallery
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/featured-photos"
                    onClick={() => setActiveLink(1)}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <div
                        className={`text-base ${activeLink === 1 ? "text-amber-900" : null}`}
                      >
                        Featured Photos
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/about-and-contact"
                    onClick={() => setActiveLink(2)}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <div
                        className={`text-base ${activeLink === 2 ? "text-amber-900" : null}`}
                      >
                        About and Contact
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className="ml-auto">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Profile Settings
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-rows-2 w-40 gap-1 py-2 px-1">
                      <NavigationMenuLink
                        onClick={() => setEmailDialogOpen(true)}
                        className="items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:cursor-pointer"
                      >
                        Update email
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        onClick={() => setPasswordDialogOpen(true)}
                        className="items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:cursor-pointer"
                      >
                        Reset password
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              onClick={handleSignOut}
              className="ml-2 bg-amber-900"
              disabled={loading}
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
      <UpdateUserDataDialog
        userData="email"
        dialogOpen={emailDialogOpen}
        setDialogOpen={setEmailDialogOpen}
      />
      <UpdateUserDataDialog
        userData="password"
        dialogOpen={passwordDialogOpen}
        setDialogOpen={setPasswordDialogOpen}
      />
    </>
  );
}
