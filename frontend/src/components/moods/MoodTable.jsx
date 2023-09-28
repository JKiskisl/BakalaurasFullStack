// MoodTable.jsx
import React from "react";
import MoodTableRow from "./MoodTableRow";

const MoodTable = ({ moods, handleEditMood, handleDeleteMood, newMood }) => {
  return (
    <table className="mood-table">
      <thead>
        <tr>
          <th>Mood Title</th>
          <th>Date</th>
          <th>Mood Rating</th>
          <th>Water Intake</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {moods.map((mood) => (
          <MoodTableRow
            key={mood.id}
            mood={mood}
            handleEditMood={handleEditMood}
            handleDeleteMood={handleDeleteMood}
          />
        ))}
        {newMood && (
          <MoodTableRow
            key={newMood.id}
            mood={newMood}
            handleEditMood={handleEditMood}
            handleDeleteMood={handleDeleteMood}
          />
        )}
      </tbody>
    </table>
  );
};

export default MoodTable;
