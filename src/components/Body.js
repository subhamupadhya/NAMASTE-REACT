import ResturantCard from "./ResturantCard";
import restaurantList from "../utils/mockData";

const Body = () => {
  return (
    <div className="body">
      <div className="filter">
        <button
          className="Filter-btn"
          onClick={() => {
            const filtered = restaurantList.filter(
              (res) => res.data.avgRating > 4
            );
            console.log("Top Rated Restaurants:", filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

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
