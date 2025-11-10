const ResturantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    deliveryTime,
    imageUrl,
  } = resData || {};

  return (
    <div
      className="restaurant-card"
      style={{
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        padding: "10px",
        width: "240px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <h3 style={{ margin: "10px 0 5px 0" }}>{name}</h3>
      <p style={{ color: "gray", fontSize: "14px" }}>{cuisines?.join(", ")}</p>
      <p>⭐ {avgRating} | ⏱️ {deliveryTime} mins</p>
      <p>💰 ₹{costForTwo / 100} for two</p>
    </div>
  );
};

export default ResturantCard;
