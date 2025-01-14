import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import DraggableField from "../components/DraggableField";
import DropZone from "../components/DropZone";
import { generateDynamicSchema  } from "../hooks/useValidation";
import { z } from "zod";


const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [responses, setResponses] = useState([]);
  const [jsonSchema, setJsonSchema] = useState(null);

  const templates = {
    contactForm: [
      { type: "text", label: "Name", name: "name" },
      { type: "text", label: "Email", name: "email" },
      { type: "radio", label: "Subscribe?", name: "subscribe", options: ["Yes", "No"] },
    ],
    surveyForm: [
      { type: "text", label: "Survey Title", name: "survey_title" },
      { type: "select", label: "Rating", name: "rating", options: ["1", "2", "3", "4", "5"] },
    ],
  };

  const handleTemplateSelect = (templateName) => {
    const selectedTemplate = templates[templateName];
    if (selectedTemplate) {
      setFormFields(selectedTemplate);
      setFormData({});
      setErrors({});
      alert(`Template "${templateName}" loaded successfully!`);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrop = (item) => {
    setFormFields((prev) => [
      ...prev,
      {
        type: item.type,
        label: `${item.type} Field ${prev.length + 1}`,
        options: item.type === "select" || item.type === "radio" ? ["Option 1", "Option 2"] : [],
      },
    ]);
  };

  const handleFieldUpdate = (index, key, value) => {
    setFormFields((prev) =>
      prev.map((field, idx) =>
        idx === index ? { ...field, [key]: value } : field
      )
    );
  };

  const renderField = (field, index) => {
    switch (field.type) {
      case "text":
        return (
          <Box key={index} mb={2}>
            <TextField
              label={field.label}
              variant="outlined"
              fullWidth
              value={formData[`text_${index}`] || ""}
              onChange={(e) => handleInputChange(`text_${index}`, e.target.value)}
              error={!!errors[`text_${index}`]}
              helperText={errors[`text_${index}`]}
            />
            {!previewMode && (
              <TextField
                label="Edit Question"
                variant="outlined"
                fullWidth
                value={field.label}
                onChange={(e) => handleFieldUpdate(index, "label", e.target.value)}
                style={{ marginTop: "10px" }}
              />
            )}
          </Box>
        );
      case "select":
        return (
          <Box key={index} mb={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={formData[`select_${index}`] || ""}
                onChange={(e) => handleInputChange(`select_${index}`, e.target.value)}
                label={field.label}
              >
                {(field.options || []).map((option, idx) => (
                  <MenuItem key={idx} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {!previewMode && (
              <>
                <TextField
                  label="Edit Dropdown Label"
                  variant="outlined"
                  fullWidth
                  value={field.label}
                  onChange={(e) => handleFieldUpdate(index, "label", e.target.value)}
                  style={{ marginTop: "10px" }}
                />
                {(field.options || []).map((option, idx) => (
                  <TextField
                    key={idx}
                    label={`Option ${idx + 1}`}
                    variant="outlined"
                    fullWidth
                    value={option}
                    onChange={(e) =>
                      handleFieldUpdate(index, "options", [
                        ...(field.options || []).slice(0, idx),
                        e.target.value,
                        ...(field.options || []).slice(idx + 1),
                      ])
                    }
                    style={{ marginTop: "10px" }}
                  />
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleFieldUpdate(index, "options", [
                      ...(field.options || []),
                      "New Option",
                    ])
                  }
                  style={{ marginTop: "10px" }}
                >
                  Add Option
                </Button>
              </>
            )}
          </Box>
        );
      case "radio":
        return (
          <Box key={index} mb={2}>
            <Typography variant="h6">{field.label}</Typography>
            {(field.options || []).map((option, idx) => (
              <label key={idx} style={{ display: "block", marginBottom: "5px" }}>
                <input
                  type="radio"
                  name={`radio_${index}`}
                  value={option}
                  checked={formData[`radio_${index}`] === option}
                  onChange={() => handleInputChange(`radio_${index}`, option)}
                />
                {option}
              </label>
            ))}
            {!previewMode && (
              <>
                <TextField
                  label="Edit Radio Label"
                  variant="outlined"
                  fullWidth
                  value={field.label}
                  onChange={(e) => handleFieldUpdate(index, "label", e.target.value)}
                  style={{ marginTop: "10px" }}
                />
                {(field.options || []).map((option, idx) => (
                  <TextField
                    key={idx}
                    label={`Option ${idx + 1}`}
                    variant="outlined"
                    fullWidth
                    value={option}
                    onChange={(e) =>
                      handleFieldUpdate(index, "options", [
                        ...(field.options || []).slice(0, idx),
                        e.target.value,
                        ...(field.options || []).slice(idx + 1),
                      ])
                    }
                    style={{ marginTop: "10px" }}
                  />
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleFieldUpdate(index, "options", [
                      ...(field.options || []),
                      "New Option",
                    ])
                  }
                  style={{ marginTop: "10px" }}
                >
                  Add Option
                </Button>
              </>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  // Function to generate JSON schema for the form
  const generateFormSchema = (fields, formData) => {
    const schema = {
      title: "Form Schema",
      type: "object",
      properties: {},
      required: [],
    };
  
    fields.forEach((field) => {
      const fieldName = field.name || field.label.toLowerCase().replace(/ /g, "_"); // Use field.name or a formatted label
  
      const fieldSchema = {
        title: field.label,
        type: field.type === "text" ? "string" : field.type === "radio" ? "string" : "array",
      };
  
      // Add the user's answer if it exists in formData
      const userAnswer = formData[fieldName]; // Access the formData using the correct fieldName
  
      if (userAnswer !== undefined) {
        fieldSchema.answer = userAnswer; // Add the answer to the schema
      }
  
      if (field.type === "select" || field.type === "radio") {
        fieldSchema.enum = field.options || [];
      }
  
      schema.properties[fieldName] = fieldSchema;
  
      // Add required fields if needed
      if (field.required) {
        schema.required.push(fieldName);
      }
    });
  
    return schema;
  };
  
  


  const handleSubmit = () => {
    try {
      const dynamicSchema = generateDynamicSchema(formFields); // Use the dynamically generated schema
      dynamicSchema.parse(formData); // Validate form data
      setErrors({});
      setResponses((prev) => [...prev, formData]);
  
      // Pass formData to include user answers in the schema
      const schema = generateFormSchema(formFields, formData);
      console.log("Generated Schema with Answers:", schema);
      setJsonSchema(schema); // Set the generated JSON schema
      alert("Form submitted successfully!");
      setFormData({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        console.error("Validation Errors:", validationErrors);
        setErrors(validationErrors); // Set the validation errors
      } else {
        console.error("Unexpected Error:", err);
      }
    }
  };
  


  return (
    <Container maxWidth="lg" style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPreviewMode((prev) => !prev)}
        style={{ marginBottom: "10px" }}
      >
        {previewMode ? "Edit Mode" : "Preview Mode"}
      </Button>

      {!previewMode && (
        <Box my={2}>
          <Typography variant="h5">Form Templates</Typography>
          <Select
            fullWidth
            onChange={(e) => handleTemplateSelect(e.target.value)}
            defaultValue=""
          >
            <MenuItem value="" disabled>
              Select a template
            </MenuItem>
            <MenuItem value="contactForm">Contact Form</MenuItem>
            <MenuItem value="surveyForm">Survey Form</MenuItem>
          </Select>
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {!previewMode && (
            <Box>
              <Typography variant="h5">Field Library</Typography>
              <DraggableField type="text">Text Field</DraggableField>
              <DraggableField type="select">Select Dropdown</DraggableField>
              <DraggableField type="radio">Radio Group</DraggableField>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <DropZone onDrop={handleDrop}>
            <Typography variant="h5">Form Builder</Typography>
            {formFields.map((field, index) => renderField(field, index))}
          </DropZone>
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "10px" }}
      >
        Submit Form
      </Button>

      {previewMode && jsonSchema && (
        <Box mt={4} p={2} style={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <Typography variant="h5" gutterBottom>
            Generated JSON Schema
          </Typography>
          <pre
            style={{
              overflowX: "auto",
              padding: "10px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(jsonSchema, null, 2)}
          </pre>
        </Box>
      )}
    </Container>
  );
};

export default FormBuilder;
