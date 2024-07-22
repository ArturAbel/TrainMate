export const refinedFirebaseAuthErrorMessage = (error) => {
  if (typeof error !== "string") {
    return "Unknown error";
  }

  const parts = error.split("auth/");
  if (parts.length < 2) {
    return "Unknown error";
  }

  return parts[1].replace(/-/g, " ").split(")")[0];
};
