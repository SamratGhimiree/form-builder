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
  Container 
} from "@mui/material";
import DraggableField from "../components/DraggableField";
import DropZone from "../components/DropZone";
import { formValidationSchema } from "../hooks/useValidation";

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
      { type: "radio", label: "Subscribe?", name: "subscribe" },
    ],
    surveyForm: [
      { type: "text", label: "Survey Title", name: "survey_title" },
      { type: "select", label: "Rating", name: "rating" },
    ],
  };
  const generateFormSchema = (formFields) => {
    return formFields.map((field, index) => {
      let schema = {
        type: "object",
        properties: {},
        required: [],
      };

      switch (field.type) {
        case "text":
          schema.properties[field.name || `text_${index}`] = {
            type: "string",
            title: field.label || `Text Field ${index + 1}`,
            minLength: 1,
          };
          schema.required.push(field.name || `text_${index}`);
          break;
        case "select":
          schema.properties[field.name || `select_${index}`] = {
            type: "string",
            title: field.label || `Select Field ${index + 1}`,
            enum: field.options || [],
          };
          schema.required.push(field.name || `select_${index}`);
          break;
        case "radio":
          schema.properties[field.name || `radio_${index}`] = {
            type: "string",
            title: field.label || `Radio Field ${index + 1}`,
            enum: field.options || [],
          };
          schema.required.push(field.name || `radio_${index}`);
          break;
        default:
          break;
      }

      return schema;
    });
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
        label: `${item.type} Field ${prev.length + 1}`, // Default label
        options: item.type === "select" || item.type === "radio" ? ["Option 1", "Option 2"] : [], // Default options
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
                onChange={(e) =>
                  handleInputChange(`select_${index}`, e.target.value)
                }
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
  

  const handleSubmit = () => {
    try {
      formValidationSchema.parse(formData);
      setErrors({});
      setResponses((prev) => [...prev, formData]);
      alert("Form submitted successfully!");
      setFormData({});
    } catch (err) {
      const validationErrors = err.flatten().fieldErrors;
      setErrors(validationErrors);
    }
    const generatedSchema = generateFormSchema(formFields); // Corrected here
    setJsonSchema(generatedSchema); 
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

  const clearResponses = () => {
    setResponses([]);
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

      <Button variant="outlined" color="primary" onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit Form
      </Button>

      {responses.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5">Form Responses</Typography>
          <table border="1" cellPadding="5" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearResponses}
            style={{ marginTop: "10px" }}
          >
            Clear Responses
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default FormBuilder;
