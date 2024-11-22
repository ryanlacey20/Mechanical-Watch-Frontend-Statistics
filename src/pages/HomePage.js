import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [sheets, setSheets] = useState([]);

  // Fetch sheet names from the Flask API on initial load
  useEffect(() => {
    console.log("this ran")
    axios.get('http://127.0.0.1:5000/api/data')
      .then((response) => {
        const sheetNames = Object.keys(response.data);
        console.log(response.data);
        setSheets(sheetNames);
      })
      .catch((error) => {
        console.error('Error fetching sheet names:', error);
      });
  }, []);

  return (
    <div>
      <div>testtttt</div>
      <h1>Excel Sheets</h1>

      {/* Display links for each sheet */}
      <div>
        {sheets.map((sheet) => (
          <div key={sheet}>
            <a href="#">{sheet}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
