import ResturantCard from "./ResturantCard";
import restaurantData from "../utils/mockData"; 
import { useState } from "react";

const Body = () => {
  // initialize state with imported data
  const [restaurantList, setRestaurantList] = useState(restaurantData);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="Filter-btn"
          onClick={() => {
            const filteredList = restaurantList.filter(
              (res) => res.data.avgRating > 4
            );
            setRestaurantList(filteredList);
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
