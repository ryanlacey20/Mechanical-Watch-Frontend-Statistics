import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const HomePage = () => {
  const [titles, setTitles] = useState([]);  // To store the list of sheet titles
  const [selectedData, setSelectedData] = useState(null);  // To store the selected data
  const [selectedTitle, setSelectedTitle] = useState("");  // To store the name of selected title

  // Fetch the available sheet titles from the Flask API
  useEffect(() => {
    axios.get('https://mechanical-watch-backend-2d5cbddc674e.herokuapp.com/api/getTableTitles')
      .then(response => {
        setTitles(response.data);  // Set the sheet titles in the state
      })
      .catch(error => {
        console.error("There was an error fetching the titles!", error);
      });
  }, []);

  // Handle the selection of a title from the sidebar
  const handleTitleClick = (title) => {
    setSelectedTitle(title);  // Set the selected title
    // Fetch the data associated with the selected title
    axios.post('https://mechanical-watch-backend-2d5cbddc674e.herokuapp.com/get_table_data', { requestedTitle: title })
      .then(response => {
        setSelectedData(response.data);  // Set the data for the selected title
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar titles={titles} onTitleClick={handleTitleClick} />

      {/* Main Section (Dashboard) */}
      <Dashboard selectedTable={selectedTitle} selectedData={selectedData} />
    </div>
  );
};

export default HomePage;
