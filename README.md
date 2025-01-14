

# **Interactive Form Builder**

A drag-and-drop form builder application that allows users to design, preview, validate, and manage forms easily. Built using **React** and **Material-UI**, it includes features like form templates, input validation, preview mode, and form response visualization.

---

## **Features**
- **Drag-and-Drop Builder**: Build custom forms by dragging components (text fields, select dropdowns, radio buttons, etc.) to the canvas.
- **Form Validation**: Schema-based validation implemented with **Zod**.
- **Preview Mode**: Toggle between edit and preview modes for form testing.
- **JSON Schema Generation**: Automatically generates a JSON schema for the designed form.
- **Form Templates**: Predefined templates (e.g., Contact Form, Survey Form) to kickstart the form creation process.
- **Response Visualization**: View submitted form responses in a table.
- **Performance Optimization**: Leveraging **React.memo** and **useMemo** to minimize re-renders.

---

## **Installation and Setup**

### **Prerequisites**
- Node.js (version 16 or later)
- npm or yarn package manager

### **Setup Instructions**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/interactive-form-builder.git
   cd interactive-form-builder
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the app in action.

---

## **Usage**

### **Drag-and-Drop Builder**
1. Drag fields like text, select, or radio buttons from the "Field Library" into the "Form Builder" area.
2. Customize field labels, options, and placeholders directly in the form editor.
3. Save your form and preview it using the **Preview Mode** toggle.

### **Preview Mode**
- Switch to Preview Mode to test the form as a user would interact with it.

### **Form Templates**
- Select a predefined template from the dropdown menu to auto-populate the form builder with commonly used fields.

### **Validation**
- Zod validation ensures the form data is valid before submission. Errors are displayed under the respective fields.

### **Form Responses**
- After submitting the form in preview mode, responses are stored and displayed in a table under the "Form Responses" section.

---

## **Technology Choices**

### **Frontend**
- **React**: Chosen for its efficient rendering, component-based architecture, and ease of use.
- **Material-UI**: For prebuilt, customizable components to improve UI consistency and speed up development.

### **Validation**
- **Zod**: Lightweight and modern library for schema-based input validation, integrated seamlessly with React state management.

### **Optimization**
- **React.memo**: Prevents unnecessary re-renders of components.
- **useMemo**: Optimizes computationally expensive operations.

---

## **Known Limitations**
1. **No Persistence**: Form configuration and responses are not saved across sessions.
2. **Limited Field Types**: Currently supports only text, select, and radio input types.
3. **Basic Conditional Logic**: Conditional logic is supported in the backend but lacks a user-friendly UI for defining rules.

---

## **Future Enhancements**
1. **Persistence**: Add support for saving and loading forms and responses from a database or local storage.
2. **Advanced Field Types**: Include support for checkboxes, date pickers, file uploads, and more.
3. **UI for Conditional Logic**: Create a visual editor for defining conditional rules between fields.
4. **Real-Time Collaboration**: Enable multiple users to collaborate on form creation.
5. **Theme Customization**: Allow users to style their forms.
6. **Comprehensive Unit Tests**: Add automated tests for all core functionalities using **Jest** and **React Testing Library**.

