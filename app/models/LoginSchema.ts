import { z, ZodType } from "zod";

export interface FormData {
    email: string,
    password: string
}

export function LoginSchema() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  })

  return schema;
}
