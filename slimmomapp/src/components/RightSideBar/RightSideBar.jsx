import React from "react";

const RightSideBar = ({ recommendedProducts }) => {
  return (
    <aside className="sidebar">
      <h3>Not recommended products:</h3>
      <ul>
        {recommendedProducts.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </aside>
  );
};

export default RightSideBar;
