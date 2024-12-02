import React, { useState } from 'react';
import './App.css';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';

const App = () => {
  const [curData, setCurData] = useState({ name: '', designation: '' });
  const [editIndex, setEditIndex] = useState(null); // Initialize as null, not undefined

  const handleCurrentData = (event) => {
    const { name, value } = event.target;
    setCurData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      // Update the existing item if editing
      const updatedData = [...data];
      updatedData[editIndex] = curData;
      setData(updatedData);
      setEditIndex(null); // Reset the edit index after updating
    } else {
      // Add a new item if not editing
      setData([...data, curData]);
    }
    setCurData({ name: '', designation: '' }); // Clear input fields after submission
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleUpdate = (index) => {
    setCurData(data[index]);
    setEditIndex(index); // Set the index to edit the correct item
  };

  return (
    <>
      <div className="input-container">
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={curData.name}
            onChange={handleCurrentData}
          />
          <input
            type="text"
            name="designation"
            placeholder="Enter your designation"
            value={curData.designation}
            onChange={handleCurrentData}
          />
          <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
        </form>
      </div>
      <div className="task-container">
        <div className="task-list">
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                {item.name} : {item.designation}
                <span>
                  <button onClick={() => handleDelete(index)}>
                    <FaRegTrashCan />
                  </button>
                </span>
                <span>
                  <button onClick={() => handleUpdate(index)}>
                    <FaRegEdit />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
