import { z } from "zod";

export const SubmitLoginSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email address is required." })
      .email({ message: "Enter a valid email address." }),
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .max(120, { message: "Password must be 120 characters or less." }),
    remember: z.boolean(),
  })
  .strict();
