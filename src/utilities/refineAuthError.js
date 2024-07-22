export const refinedFirebaseAuthErrorMessage = (error) => {
  return error.split("auth/")[1].replace(/-/g, " ").split(")")[0];
};
