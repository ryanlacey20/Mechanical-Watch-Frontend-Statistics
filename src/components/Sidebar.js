import React from 'react';

const Sidebar = ({ titles, onTitleClick }) => {
  return (
    <div style={{
      width: '200px',
      background: '#f4f4f4',
      padding: '10px',
      height: '100vh',
      borderRight: '1px solid #ccc'
    }}>
      <h3>Sheet Titles</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {titles.map((title, index) => (
          <li key={index} style={{ padding: '8px', cursor: 'pointer' }} onClick={() => onTitleClick(title)}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
