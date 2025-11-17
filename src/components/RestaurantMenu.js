import { useState, useEffect } from "react";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    useEffect(()=> {
      fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5742&lng=77.3541&restaurantId=30569"
            );
        const json = await data.json();

        console.log(json);
        setResInfo(json.data);
    };

    const {name, cuisines, costForTwoMessage } = 
    resInfo?.cards[0]?.card?.card?.info;


    return resInfo === null ? (
        <Shimmer />
    ) : (
        <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines.join(", ")}</h3>
            <h3>{costForTwoMessage}</h3>
            <h2>Menu</h2>
            <ul>
                <li>Biryani</li>
                <li>Burgers</li>
                <li>Diet coke</li>
            </ul>
        </div>
    );
};

export default RestaurantMenu;

// https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5742&lng=77.3541&restaurantId=30569