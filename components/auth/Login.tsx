"use client";

import { useState } from "react";
import { AuthErrorCodes } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormData, LoginSchema } from "../../app/models/LoginSchema";
import { useAuth } from "../../app/context/AuthContext";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react";
import { 
  Alert, 
  AlertDescription
} from "@/components/ui/alert";


export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const auth = useAuth();
  const schema = LoginSchema();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function submitData(data: FormData) {
    setError("");
    setLoading(true);
    
    try {
      await auth.browserSession();
      await auth.login(data.email, data.password);
    } catch (err) {
      if (
        err instanceof FirebaseError && 
        (
          err.code === AuthErrorCodes.INVALID_PASSWORD ||
          err.code === AuthErrorCodes.USER_DELETED ||
          err.code === AuthErrorCodes.INVALID_EMAIL
        )
      ) {
        setError("The email address or password is incorrect");
        console.log(err)
      } else {
        setError("Failed to log in. Try Again.");
        console.log(err)
      }
    }
  
    setLoading(false);
  };

  return (
    <div className={cn("grid gap-6")}>
      <div className="absolute flex flex-col w-full max-w-sm top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
        <h1 className="text-xl font-bold">Log in to your account</h1>
        <form  className="w-9/12" onSubmit={handleSubmit(submitData)}>
          <div className="grid gap-4 p-6 w-full">
            {error && (
              <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
              <div className="font-semibold text-red-500">{error}</div>
              </AlertDescription>
              </Alert>
            )}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email")}
              error={errors.email}
              errorMessage={errors.email? errors.email.message : undefined}
            />
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="email"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              {...register("password")}
              error={errors.password}
              errorMessage={errors.password? errors.password.message : undefined}
            />
            <Button className="p-4 bg-primary hover:bg-primary/90 hover:text-white" disabled={loading}>
              {!loading ? "Sign In with Email" : "Signing you in..."}
            </Button>
            <Link className="text-center" href="/forgot-password">
              <p className="text-sm text-slate-900 underline underline-offset-2">
                Forgot password?
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}