"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Header() {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState(0);

  const auth = useAuth();
  const user = auth.currentUser

  useEffect(() => {
    const currentPathname = window.location.pathname;

    if (currentPathname === '/home') {
      setActiveLink(0);
    } else if (currentPathname === '/featured-photos') {
      setActiveLink(1);
    } else if (currentPathname === '/text-management') {
      setActiveLink(2);
    }
  }, []);


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
    <div className="flex items-center p-4 mt-1">
      <Logo />
      {user && (
        <>
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
      </>
      )}
    </div>
  )
}