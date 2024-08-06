const correctOrder = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
  "Master",
];

export const sortLevels = (level) => {
  return [...level].sort(
    (a, b) => correctOrder.indexOf(a) - correctOrder.indexOf(b)
  );
};
