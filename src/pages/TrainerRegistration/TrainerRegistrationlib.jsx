export const isFormValid = (formData) => {
  const requiredFields = ['name', 'sport', 'description', 'about', 'address', 'lessonLength', 'price'];
  const areFieldsFilled = requiredFields.every(field => formData[field].trim() !== '');
  const isLevelSelected = formData.level.length > 0;
  return areFieldsFilled && isLevelSelected;
};