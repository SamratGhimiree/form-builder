import { z } from "zod";

export const formValidationSchema = z.object({
  text_0: z.string().min(1, "This field is required"),
  select_0: z.enum(["Option 1", "Option 2"], "Please select a valid option"),
  radio_0: z.enum(["Yes", "No"], "Please select an option"),
});
