export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return (sum / ratings.length).toFixed(1); 
};