import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [searchTerm, sortBy, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers', {
        params: { searchTerm, sortBy, page: currentPage },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container"> {}
      <div className="search">
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>

      <table className="table"> {}
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.sno}>
              <td>{row.sno}</td>
              <td>{row.customer_name}</td>
              <td>{row.age}</td>
              <td>{row.phone}</td>
              <td>{row.location}</td>
              <td>{new Date(row.created_at).toLocaleDateString()}</td>
              <td>{new Date(row.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination"> {}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
