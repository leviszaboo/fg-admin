"use client";

import { useState } from "react";
import { AuthErrorCodes } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import Link from "next/link";

import {
  PasswordFormData,
  ForgotPasswordSchema,
} from "../../app/models/ForgotPasswordSchema";
import { useAuth } from "../../app/context/AuthContext";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, MailCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useAuth();

  const schema = ForgotPasswordSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({ resolver: zodResolver(schema) });

  async function submitData(data: PasswordFormData) {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await auth.resetPassword(data.email);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      if (
        err instanceof FirebaseError &&
        (err.code === AuthErrorCodes.USER_DELETED ||
          err.code === AuthErrorCodes.INVALID_EMAIL)
      ) {
        setError("The email address is incorrect or is not registered.");
        console.log(err);
      } else {
        setError("Something went wrong. Try Again.");
        console.log(err);
      }
    }

    setLoading(false);
  }

  return (
    <div className={cn("grid gap-6")}>
      <div className="absolute flex flex-col w-full max-w-sm top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
        <h1 className="text-xl font-bold">Reset your password</h1>
        <form className="w-9/12" onSubmit={handleSubmit(submitData)}>
          <div className="grid gap-4 p-6 w-full">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold text-red-500">{error}</div>
                </AlertDescription>
              </Alert>
            )}
            {message && (
              <Alert className="border-green-500">
                <MailCheck className="h-4 w-4" color="#16a34a" />
                <AlertDescription>
                  <div className="font-semibold text-green-600">{message}</div>
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
              errorMessage={errors.email ? errors.email.message : undefined}
            />
            <Button
              className="p-4 bg-primary hover:bg-primary/90 hover:text-white"
              disabled={loading}
            >
              Reset password
            </Button>
            <Link className="text-center" href={"/"}>
              <p className="text-sm text-slate-900 underline underline-offset-2">
                Back to login
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
