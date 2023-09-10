"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  return (
    <>
      {user ? children : null}
    </>
  );
}

