export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return (sum / ratings.length).toFixed(1);
};


export const calculateAverageRatingInProfile = (reviews) => {
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce(
    (acc, review) => acc + review.starRating,
    0
  );
  const averageRating = totalRating / reviews.length;

  return averageRating.toFixed(1);
};
