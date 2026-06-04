import { z } from "zod";

export const registerSchema = z
    .object({
        username: z.string().min(3, "Min 3 characters"),
        email: z.string().email("Enter valid email"),
        password: z.string().min(6, "Min 6 characters"),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });