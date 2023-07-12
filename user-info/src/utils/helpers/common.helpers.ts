// export const validateForm = (formData: any): boolean => {
//   const requiredFields = ["title", "firstName", "lastName", "email"];

//   for (const field of requiredFields) {
//     if (!formData[field]) {
//       alert(`Missing field: ${field}`);
//       return false;
//     }
//   }

//   return true;
// };
export const validateForm = async (formData: any): Promise<boolean> => {
const requiredFields = ["firstName", "lastName", "email", "title"];
  const specialCharacters = /^[a-zA-Z ]*$/;
  const missingFields = [];
for (const field of requiredFields) {
  if (!formData[field]) {
    missingFields.push(field);
  }
}
if (missingFields.length > 0) {
  alert(`Missing fields: ${missingFields.join(", ")}`);
  return false;
}
if (!specialCharacters.test(formData.firstName)) {
  alert("Invalid characters in the First Name field");
  return false;
}
if (!specialCharacters.test(formData.lastName)) {
  alert("Invalid characters in the Last Name field");
  return false;
}
return true;
};

