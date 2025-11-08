import { useState } from "react";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  console.log("Header render");

  // if no dependency array => useEffect is called an every render
  // if dependency array is empty = [] => useEffect is called on initial render(just once)
  // if dependency array is [btnNameReact] => called everytime btnNameReact is updated.

  useEffect(() => {
    console.log("useEffect called");
  }, [btnNameReact]);

   
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="Logo"
          src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png"
          alt="logo"
        />
      </div>


      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Cart</li>
          <button 
          className="login" 
          onClick={()=> {
            btnNameReact === "Login"
            ? setBtnNameReact("Logout")
            : setBtnNameReact("Login");
          }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};


export default Header;