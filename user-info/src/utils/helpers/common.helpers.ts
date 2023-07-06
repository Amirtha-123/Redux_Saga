export const validateForm = (formData: any): boolean => {
  const requiredFields = ["title", "firstName", "lastName", "email"];

  for (const field of requiredFields) {
    if (!formData[field]) {
      alert(`Missing field: ${field}`);
      return false;
    }
  }

  return true;
};
