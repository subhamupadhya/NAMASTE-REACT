import ResturantCard from "./ResturantCard";
import restaurantData from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING"
        )}`
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const json = await response.json();

      const restaurants =
        json?.data?.cards?.find(
          (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      // ✅ Normalize data structure so both mockData & API data work the same
      const normalizedData =
        restaurants.length > 0
          ? restaurants.map((res) => ({
              data: {
                name: res?.info?.name,
                cuisines: res?.info?.cuisines,
                avgRating: res?.info?.avgRating,
                costForTwo: res?.info?.costForTwo,
                deliveryTime: res?.info?.sla?.deliveryTime,
                imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/${res?.info?.cloudinaryImageId}`,
              },
            }))
          : restaurantData;

      setRestaurantList(normalizedData);
      setFilteredRestaurant(normalizedData);
    } catch (error) {
      console.warn("⚠️ Swiggy fetch failed. Using mock data instead.", error);
      setRestaurantList(restaurantData);
      setFilteredRestaurant(restaurantData);
    }
  };

  if (!Array.isArray(filteredRestaurant) || filteredRestaurant.length === 0)
    return <Shimmer />;

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filteredData = restaurantList.filter((res) =>
                res?.data?.name?.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredData);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="Filter-btn"
          onClick={() => {
            const filteredList = restaurantList.filter(
              (res) => parseFloat(res?.data?.avgRating) > 4
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div
        className="restaurant-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredRestaurant.map((restaurant, index) => (
          <ResturantCard key={index} resData={restaurant.data} />
        ))}
      </div>
    </div>
  );
};

export default Body;
