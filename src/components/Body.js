import ResturantCard from "./ResturantCard";
import restaurantData from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  // initialize state with imported data
  const [restaurantList, setRestaurantList] = useState(restaurantData);
  // const [restaurantList, setRestaurantList] = useState([]);

  const [filteredResturant, setFilteredResturant] = useState([]);

  const [SearchText, setSearchText] = useState("");

  // whenever state variables update, react triggers a reconciliation cycle(re-renders the component) 
  
  useEffect(() => {
    fetchData();
  }, []);

  // Added async before fetchData
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9716&lng=77.5946&restaurantId=334475"
    );
    const text = await data.text();
    if (!text) return; 
    const json = JSON.parse(text);

    console.log(json);
    // Fixed optional chaining and property access
    setRestaurantList(
      json?.data?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards || []
    );
    setFilteredResturant(
      json?.data?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards || []
    );
  };

  // conditional rendering


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
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <button 
          onClick={()=> {
            // filter the resturant cards and update the UI
            console.log(SearchText);

            const filteredResturant = restaurantList.filter(
              (res) => 
              res.data.name.toLowerCase().includes(SearchText.toLowerCase())
            );

            setRestaurantList(filteredResturant);

          }}
          >
          Search
          </button>
        </div>
        <button
          className="Filter-btn"
          onClick={() => {
            const filteredList = restaurantList.filter(
              (res) => res?.data?.avgRating > 4
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
        {filteredResturant.map((restaurant, index) => (
          <ResturantCard key={index} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
