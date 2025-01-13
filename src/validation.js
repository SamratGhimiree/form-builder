import { z } from 'zod';

// Define the validation schema
export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().positive('Age must be a positive number'),
});

// Function to validate form data
export const validateForm = (formData) => {
  try {
    formSchema.parse(formData);
    return { success: true, errors: null };
  } catch (error) {
    return { success: false, errors: error.errors };
  }
};
