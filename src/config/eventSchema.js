import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  eventDate: z.date({ required_error: 'Date is required' }),
  organizer: z.string().min(1, "Organizer is required"),
  description: z.string().max(100, 'Description is too long'),
});

export default eventSchema;