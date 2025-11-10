import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";

const AppLayout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Body />} />

        {/* About route */}
        <Route path="/about" element={<About />} />

        <Route path="/Contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
