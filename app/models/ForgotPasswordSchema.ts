import { z, ZodType } from "zod";

export interface PasswordFormData {
  email: string;
}

export function ForgotPasswordSchema() {
  const schema: ZodType<PasswordFormData> = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  return schema;
}
