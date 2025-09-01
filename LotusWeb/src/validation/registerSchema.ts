// schemas/registerSchema.ts
import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(
      /^[a-zA-Z0-9_]{3,20}$/,
      'Username must be 3-20 characters long and can only contain letters, numbers, and underscores'
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .regex(
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must be at least 8 characters long, contain at least one lowercase letter and one number'
    ),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
