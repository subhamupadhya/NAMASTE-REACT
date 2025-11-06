const ResturantCard = ({ resData }) => {
  const {
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
    cloudinaryImageId,
  } = resData?.info || {};

  return (
    <div className="resturant-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="resturant-logo"
        alt="resturant-logo"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
      />
      <h3>{name}</h3>
      <h4>{cuisines?.join(", ")}</h4>
      <h4>{avgRating} ⭐</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.deliveryTime} minutes</h4>
    </div>
  );
};

export default ResturantCard;
