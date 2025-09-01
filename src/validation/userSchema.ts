import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z0-9_\s]+$/, 'Name can only contain letters, numbers, underscores and spaces')
    .optional()
    .or(z.literal('')),
  
  email: z
    .string()
    .email('Invalid email format')
    .optional()
    .or(z.literal('')),
  
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 characters')
    .max(11, 'Phone cannot exceed 11 characters')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Invalid phone format')
    .optional()
    .or(z.literal('')),
  
  gender: z
    .string()
    .optional()
    .or(z.literal('')),
  
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
});
  
export const createUserSchema = userSchema;
export const updateUserSchema = userSchema;

export type UserCreateFormValues = z.infer<typeof createUserSchema>;
export type UserUpdateFormValues = z.infer<typeof updateUserSchema>;