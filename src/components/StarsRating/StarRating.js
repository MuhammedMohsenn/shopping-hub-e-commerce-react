import "../ProductList/ProductList.scss";

export const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;
  const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(filledStars)].map((_, index) => (
        <span key={`filled-${index}`} className="star filled">
          <i className="fa-solid fa-star"></i>
        </span>
      ))}

      {halfStar && (
        <span className="star half">
          <i className="fa-regular fa-star-half-stroke"></i>
        </span>
      )}

      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="star empty">
          <i className="fa-regular fa-star"></i>
        </span>
      ))}
    </div>
  );
};
