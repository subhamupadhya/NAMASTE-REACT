import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const AppLayout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Body />} />

        {/* About route */}
        <Route path="/about" element={<About />} />

        {/* Contact route */}
        <Route path="/contact" element={<Contact />} />

        {/* Catch-all route for errors / 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);

