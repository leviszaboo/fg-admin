"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { auth } from "../firebase/firebase";

interface PrivateRouteProps {
  children?: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = auth.currentUser;
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/');
    } 
  }, [user]);

  return (
    <>
      {user ? children : null}
    </> 
  )
}
