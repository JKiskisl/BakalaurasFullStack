// MoodTableRow.jsx
import React from "react";

const MoodTableRow = ({ mood, handleEditMood, handleDeleteMood }) => {
  return (
    <tr>
      <td>{mood.title}</td>
      <td>{mood.date}</td>
      <td>{mood.todaysmood}</td>
      <td>{mood.waterintake}</td>
      <td>
        <button className="edit-button" onClick={() => handleEditMood(mood)}>
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => handleDeleteMood(mood.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MoodTableRow;
