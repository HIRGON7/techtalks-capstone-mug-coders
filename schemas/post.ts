import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters"),

  community: z
    .string()
    .min(1, "Community is required"),

  topics: z
    .array(z.string())
    .default([]),
});

export const updatePostSchema = createPostSchema.partial();