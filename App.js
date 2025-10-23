/**
 * 
 * <div id="parent">
 *   <div id="child">
 *     <h1>I am h1 tag</h1>
 *     <h2>I am h2 tag</h2>
 *   </div>
 *   <div id="child2">
 *     <h1>I am h1 tag</h1>
 *     <h2>I am h2 tag</h2>
 *   </div>
 * </div> 
 */

import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am h1 tag"),
    React.createElement("h2", {}, "I am h2 tag"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I am h1 tag"),
    React.createElement("h2", {}, "I am h2 tag"),
  ]),
]);

// React.createElement => object => HTMLElement(render)
const heading = React.createElement("h1", { id: "heading" }, "namaste react");
console.log(heading);

// jsx -> is not HTML is js.
// (transpiled before it reaches the JS) - PARCEL - Babel 
// Babel converted all the jsx code to react element and now the react understand the reat element 
// JSX -> Babel transpiles it to React.createElement -> ReactElement-js Object -> HTMLElement(render)

const jsxHeading = <h1 id="heading">Namaste react using jsx</h1>
// console.log(jsxHeading);

// root must be initialized before using
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(jsxHeading);

root.render(parent);

// REACT COMPONENT:- 2 types
// class based component - OLD
// Functional Component - NEW

// React functional component:=> is a function that returns some pieces of jsx code 
const HeadingComponent = () => {
  return <h1 className="heading">Namaste React functional componenet</h1>
};

// component composition
const HeadingComponent2 = () => {
  return (
    <div id="container">
      {/* <Title /> */}
      <h1 className="heading">Namaste React functional component</h1>
    </div>
  );
};

root.render(<HeadingComponent2 />);
