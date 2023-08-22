"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { auth } from "../firebase/firebase";

interface AnonymRouteProps {
  children?: React.ReactNode
}

export default function AnonymRoute({ children }: AnonymRouteProps) {
  const user = auth.currentUser;
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/home');
    } 
  }, [user]);

  return ( 
    <>
      {!user ? children : null}
    </>
  )
}