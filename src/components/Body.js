import ResturantCard from "./ResturantCard";

const Body = () => {
  return (
    <div className="body">
      <div className="Search">Search</div>
      <div
        className="resturant-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {restaurantList.map((restaurant, index) => (
          <ResturantCard key={index} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;