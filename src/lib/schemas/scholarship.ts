import { z } from 'zod';

export const scholarshipSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    provider: z.string().min(2, 'Provider must be at least 2 characters'),
    eligibility: z.string().min(5, 'Eligibility criteria is required'),
    category: z.string().min(2, 'Category is required'),
    amount: z.coerce.number().positive('Amount must be positive'),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});
