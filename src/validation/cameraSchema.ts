import { z } from "zod";

export const cameraSchema = z.object({
  name: z.string().min(1, 'Camera name is required'),

  latitude: z.coerce.number().min(-90, 'Latitude must be >= -90')
    .max(90, 'Latitude must be <= 90'),
  longitude: z.coerce.number().min(-180, 'Longitude must be >= -180')
    .max(180, 'Longitude must be <= 180'),

  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),

  countryCode: z
    .string()
    .optional()
    .refine(val => !val || /^[A-Z]{2,3}$/.test(val), {
          message: 'Country code must be 2–3 uppercase letters',
    }),

  zipCode: z
    .string()
    .optional()
    .refine(val => !val || /^[A-Z0-9\s]{4,10}$/.test(val), {
      message: 'Zip code must be 4–10 characters (uppercase letters and digits only)',
    }),
  
  ipAddress: z
    .string()
    .min(1, 'IP address is required')
    .refine((val) => /^(\d{1,3}\.){3}\d{1,3}$/.test(val), {
      message: 'IP address must be a valid IPv4 format',
    }),

  streamUrl: z
    .string()
    .min(1, 'Stream URL is required')
    .url('Stream URL must be a valid URL (e.g., http://example.com)')
    .refine((val) => /^[\x20-\x7E]*$/.test(val), {
      message: 'Stream URL must not contain accented or non-ASCII characters',
    }),

  description: z
    .string()
    .max(10000, 'Description cannot exceed 10000 characters')
    .optional()
    .or(z.literal('')),

  note: z
    .string()
    .max(10000, 'Note cannot exceed 10000 characters')
    .optional(),
    // .or(z.literal('')),
  
    timezone: z.string().optional(),
  });
  
export const createCameraSchema = cameraSchema;
export const updateCameraSchema = cameraSchema;

export type CameraCreateFormValues = z.infer<typeof createCameraSchema>;
export type CameraUpdateFormValues = z.infer<typeof updateCameraSchema>;