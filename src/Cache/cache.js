// CacheTable.js

import React, { useState, useEffect } from "react";
import "./cache.css"; // Import CSS file for styling

const CacheTable = () => {
  const [ws, setWs] = useState(null);
  const [cacheName, setCacheName] = useState("");
  const [cacheSize, setCacheSize] = useState("");
  const [caches, setCaches] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    socket.onopen = () => {
      console.log("WebSocket connected");
      setWs(socket);
    };
    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      setResponse(event.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleAddCache = () => {
    if (cacheName.trim() !== "" && cacheSize.trim() !== "") {
      setCaches([
        ...caches,
        { name: cacheName, size: cacheSize, items: [], inputValue: "" },
      ]);
      setCacheName("");
      setCacheSize("");
    }
  };

  const handleAddItem = (index) => {
    const updatedCaches = [...caches];
    if (updatedCaches[index].inputValue.trim() !== "") {
      updatedCaches[index].items.push(updatedCaches[index].inputValue);
      updatedCaches[index].inputValue = ""; // Clear the input field
      setCaches(updatedCaches);
    }
  };

  const handleInputChange = (index, value) => {
    const updatedCaches = [...caches];
    updatedCaches[index].inputValue = value;
    setCaches(updatedCaches);
  };

  return (
    <div className="cache-container">
      <h2>Cache Table</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter cache name"
          value={cacheName}
          onChange={(e) => setCacheName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter cache size"
          value={cacheSize}
          onChange={(e) => setCacheSize(e.target.value)}
        />
        <button onClick={handleAddCache}>Add Cache</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Cache Name</th>
            <th>Cache Size</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {caches.map((cache, index) => (
            <tr key={index}>
              <td>{cache.name}</td>
              <td>{cache.size}</td>
              <td>
                <ul>
                  {cache.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                  <li>
                    <div className="item-input">
                      <input
                        type="text"
                        placeholder="Enter item"
                        value={cache.inputValue}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                      <button onClick={() => handleAddItem(index)}>Add</button>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CacheTable;
