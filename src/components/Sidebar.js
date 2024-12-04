import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file

const Sidebar = ({ titles, onTitleClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (title, index) => {
    setActiveIndex(index); // Set the active item
    onTitleClick(title);   // Trigger the parent click handler
  };

  return (
    <div className="sidebar">
      <h3>Watches</h3>
      <ul>
        {titles.map((title, index) => (
          <li
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => handleClick(title, index)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
