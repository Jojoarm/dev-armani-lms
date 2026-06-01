import { z } from 'zod';

export const courseLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const courseStatuses = ['Draft', 'Published', 'Archived'] as const;

export const courseCategories = [
  'Development',
  'Business',
  'Finance & Accounting',
  'IT & Software',
  'Office Productivity',
  'Personal Development',
  'Design',
  'Marketing',
  'Lifestyle',
  'Photography',
  'Health & Fitness',
  'Music',
  'Teaching & Academics',
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must be at most 100 characters long' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' }),
  fileKey: z.string().min(1, { message: 'File key is required' }),
  price: z.number().min(1, { message: 'Price must be a positive number' }),
  duration: z
    .number()
    .min(1, { message: 'Duration must be at least 1 hour' })
    .max(500, { message: 'Duration must be at most 500 hours' }),
  level: z.enum(courseLevels, { message: 'Invalid course level' }),
  category: z.enum(courseCategories, { message: 'Invalid course category' }),
  smallDescription: z
    .string()
    .min(3, { message: 'Small description must be at least 3 characters long' })
    .max(200, {
      message: 'Small description must be at most 200 characters long',
    }),
  slug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters long' }),
  status: z.enum(courseStatuses),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
