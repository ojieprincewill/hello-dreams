// Simple reusable validation utilities and schema-driven validator

export const isEmail = (value) => {
  if (typeof value !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(value.trim());
};

export const isPhone = (value) => {
  if (typeof value !== "string") return false;
  // Accepts digits, spaces, plus, hyphens, parentheses; 7-20 chars
  const phoneRegex = /^[+()\-\s\d]{7,20}$/;
  return phoneRegex.test(value.trim());
};

export const required = (value) => {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const minLength = (len) => (value) =>
  typeof value === "string" ? value.trim().length >= len : false;

export const maxLength = (len) => (value) =>
  typeof value === "string" ? value.trim().length <= len : false;

export const isNumber = (value) =>
  (typeof value === "number" && !Number.isNaN(value)) ||
  (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value)));

// validateForm takes a schema of the form:
// {
//   fieldName: [ { rule: fn, message: "..." }, ... ]
// }
export const validateForm = (schema, values) => {
  const errors = {};
  Object.keys(schema).forEach((field) => {
    const rules = schema[field];
    for (let i = 0; i < rules.length; i += 1) {
      const { rule, message } = rules[i];
      const isValid = rule(values[field]);
      if (!isValid) {
        errors[field] = message;
        break;
      }
    }
  });
  return { isValid: Object.keys(errors).length === 0, errors };
};


