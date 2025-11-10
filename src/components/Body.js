import ResturantCard from "./ResturantCard";
import restaurantData from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredResturant, setFilteredResturant] = useState([]);
  const [SearchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING"
        )}`
      );

      const text = await response.text();
      let json;

      // Try to safely parse JSON
      try {
        json = JSON.parse(text);
      } catch (err) {
        console.error("Invalid JSON received from API:", err);
        // Use mock data as fallback
        setRestaurantList(restaurantData);
        setFilteredResturant(restaurantData);
        return;
      }

      // Extract restaurant list safely
      const restaurants =
        json?.data?.cards?.find(
          (c) =>
            c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      // If API didn’t return any restaurants, use mock data
      if (restaurants.length === 0) {
        console.warn("No restaurants found in API response. Using mock data.");
        setRestaurantList(restaurantData);
        setFilteredResturant(restaurantData);
      } else {
        setRestaurantList(restaurants);
        setFilteredResturant(restaurants);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Use mock data if network/API fails
      setRestaurantList(restaurantData);
      setFilteredResturant(restaurantData);
    }
  };

  // Show shimmer while loading
  if (restaurantList.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            placeholder="Search restaurants..."
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
