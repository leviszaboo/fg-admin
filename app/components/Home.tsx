"use client";

import { Button } from "@/components/ui/button";

import { useAuth } from "../utils/AuthContext";

export default function Home() {
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
      <Button onClick={handleSignOut}>
      Sign Out
      </Button>
      <div>Home</div>
    </>
  )
}
