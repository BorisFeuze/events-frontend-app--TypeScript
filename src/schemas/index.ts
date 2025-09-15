import { z } from "zod/v4";

const EventSchema = z.object({
  id: z.number().min(0),
  title: z.string().min(1).catch("Untitled"),
  description: z.string().nullable().optional(),
  date: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

const EventSchemaArray = z.array(EventSchema);

export { EventSchema, EventSchemaArray };
