import ResturantCard from "./ResturantCard";
import restaurantData from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState(restaurantData);
  const [filteredResturant, setFilteredResturant] = useState([]);
  const [SearchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING"
        )}`
      );
      const json = await data.json();
      console.log(json);

      // ✅ Correct extraction of restaurant data from API
      const restaurants =
        json?.data?.cards
          ?.find(
            (c) =>
              c?.card?.card?.gridElements?.infoWithStyle?.restaurants
          )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setRestaurantList(restaurants);
      setFilteredResturant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={SearchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filteredData = restaurantList.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  .includes(SearchText.toLowerCase())
              );
              setFilteredResturant(filteredData);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="Filter-btn"
          onClick={() => {
            const filteredList = restaurantList.filter(
              (res) => res?.info?.avgRating > 4
            );
            setFilteredResturant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div
        className="resturant-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredResturant.map((restaurant, index) => (
          <ResturantCard key={index} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
