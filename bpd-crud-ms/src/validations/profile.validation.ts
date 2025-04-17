import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(1, 'Address is required'),
  cellphone: z.string().regex(/^\d{10}$/, 'Cellphone must be exactly 10 digits'),
});