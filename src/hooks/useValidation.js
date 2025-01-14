import { z } from "zod";

export const generateDynamicSchema = (fields) => {
  const schemaObject = {};

  fields.forEach((field, index) => {
    const fieldName = `${field.type}_${index}`;
    switch (field.type) {
      case "text":
        schemaObject[fieldName] = z.string().min(1, "This field is required");
        break;
      case "select":
        schemaObject[fieldName] = z
          .enum(field.options, "Please select a valid option")
          .optional(); // Make optional if not required
        break;
      case "radio":
        schemaObject[fieldName] = z
          .enum(field.options, "Please select an option")
          .optional(); // Make optional if not required
        break;
      default:
        break;
    }
  });

  return z.object(schemaObject);
};
