"use client";

import { Button } from "@/components/ui/button";

import { useAuth } from "../../utils/AuthContext";

export default function Header() {
  const auth = useAuth();

  async function handleSignOut() {
    try {
      await auth.logout();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex items-center p-4">
        <Button onClick={handleSignOut} className="ml-auto bg-amber-900">
          Sign Out
        </Button>
      </div>
    </>
  )
}