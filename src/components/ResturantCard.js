const ResturantCard = (props) => {
  const { resData } = props;

  const {
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData?.data;

  return (
    <div className="resturant-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="resturant-logo"
        alt="resturant-logo"
        src={resData.data.imageUrl}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>₹{costForTwo / 100} FOR TWO</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

export default ResturantCard;