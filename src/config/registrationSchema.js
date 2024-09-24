import { z } from 'zod';

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const registrationSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email(),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }).max(eighteenYearsAgo, 'You must be at least 18 years old'),
  source: z.string().min(1, { message: 'Source is required' }),
});

export default registrationSchema;
