export const refinedFirebaseAuthErrorMessage = (error) => {
  if (typeof error !== "string") {
    return "Unknown error";
  }

  const splitError = error.split("auth/");
  if (splitError.length < 2) {
    return "Unknown error";
  }

  return splitError[1].replace(/-/g, " ").split(")")[0];
};
