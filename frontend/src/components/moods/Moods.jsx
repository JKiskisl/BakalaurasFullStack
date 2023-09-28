import React, { useState, useEffect } from "react";

import "./datepickers.css";
import MoodForm from "./MoodForm";
import MoodTable from "./MoodTable";

import "./moods.css";
import {
  addMood,
  deleteMoods,
  getMoods,
  updateMood,
} from "../../services/moods.service";
import { getTokenFromLocalStorage } from "../../services/auth.service";

const Moods = () => {
  const [moods, setMoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newMoodAdded, setNewMoodAdded] = useState(false);
  const [newMood, setNewMood] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [editMood, setEditMood] = useState(null);
  const [editFormValue, setEditFormValue] = useState({});

  const handleEditMood = (mood) => {
    setEditMood(mood);
    setEditFormValue({
      title: mood.title,
      content: mood.content,
      date: mood.date,
      happythings: mood.happythings,
      waterintake: mood.waterintake,
      todaysmood: mood.todaysmood,
      selfcareActivities: mood.selfcareActivities,
      Breakfast: mood.Breakfast,
      Lunch: mood.Lunch,
      Dinner: mood.Dinner,
      Snacks: mood.Snacks,
      Anxious: mood.Anxious,
      Sad: mood.Sad,
    });
    setSelectedDate(new Date(mood.date));
    setShowForm(true);
  };

  const handleUpdateMood = async (event) => {
    event.preventDefault();

    const updatedMoodData = {
      title: editFormValue.title,
      content: editFormValue.content,
      date: editFormValue.date,
      happythings: editFormValue.happythings,
      waterintake: editFormValue.waterintake,
      todaysmood: editFormValue.todaysmood,
      selfcareActivities: editFormValue.selfcareActivities,
      Breakfast: editFormValue.Breakfast,
      Lunch: editFormValue.Lunch,
      Dinner: editFormValue.Dinner,
      Snacks: editFormValue.Snacks,
      Anxious: editFormValue.Anxious,
      Sad: editFormValue.Sad,
    };

    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await updateMood(
        accessToken,
        editMood.id,
        updatedMoodData
      );

      if (response.error === null) {
        const updatedMood = {
          ...editMood,
          ...updatedMoodData,
        };
        setMoods((prevMoods) =>
          prevMoods.map((mood) =>
            mood.id === editMood.id ? updatedMood : mood
          )
        );
        setEditMood(null);
        setEditFormValue({});
        setErrorMessage("");
        setShowForm(false);
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getMoodsData = async () => {
      try {
        const accessToken = await getTokenFromLocalStorage();
        const response = await getMoods(accessToken);

        console.log(response.data);

        if (!isMounted) {
          return;
        }

        if (response.error === null) {
          setMoods(response.data);
          console.log(response.data);
          setErrorMessage("");
          if (newMoodAdded) {
            setNewMoodAdded(false);
          }
        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        setErrorMessage(JSON.stringify(error.message, null, 2));
      }
    };

    getMoodsData();

    return () => {
      isMounted = false;
    };
  }, [newMoodAdded]);

  const handleDeleteMood = async (moodId) => {
    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await deleteMoods(accessToken, moodId);

      if (response.error === null) {
        // Update the state to remove the deleted mood
        setMoods((prevMoods) => prevMoods.filter((mood) => mood.id !== moodId));
        setErrorMessage("");
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  const handleAddMood = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const title = event.target.title.value;
    const content = event.target.content.value;

    const date = event.target.date.value;
    const happythings = event.target.happythings.value;
    const waterintake = event.target.waterintake.value;
    const todaysmood = event.target.todaysmood.value;
    const selfcareActivities = event.target.selfcareActivities.value;
    const Breakfast = event.target.Breakfast.value;
    const Lunch = event.target.Lunch.value;
    const Dinner = event.target.Dinner.value;
    const Snacks = event.target.Snacks.value;
    const Anxious = event.target.Anxious.value;
    const Sad = event.target.Sad.value;

    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await addMood(accessToken, {
        title,
        content,
        date,
        happythings,
        waterintake,
        todaysmood,
        selfcareActivities,
        Breakfast,
        Lunch,
        Dinner,
        Snacks,
        Anxious,
        Sad,
      });

      if (response.error === null) {
        // Add the newly added mood to the state
        const newMood = {
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          date: response.data.date,
          happythings: response.data.happythings,
          waterintake: response.data.waterintake,
          todaysmood: response.data.todaysmood,
          selfcareActivities: response.data.selfcareActivities,
          Breakfast: response.data.Breakfast,
          Lunch: response.data.Lunch,
          Dinner: response.data.Dinner,
          Snacks: response.data.Snacks,
          Anxious: response.data.Anxious,
          Sad: response.data.Sad,
        };

        setMoods((prevMoods) => [...prevMoods, newMood]);
        setErrorMessage("");
        setShowForm(false);
        setNewMoodAdded(true);
        console.log("Deleted Mood Set to True");
        console.log("popup closed");
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  const showPopUpClear = () => {
    setEditFormValue({});
    setSelectedDate(null);
    setEditMood(null);
    setShowForm(true);
  };

  return (
    <div className="moods">
      <h2>Moods</h2>
      <button className="add-mood-button" onClick={() => showPopUpClear()}>
        Add Mood
      </button>
      {showForm && (
        <MoodForm
          editFormValue={editFormValue}
          selectedDate={selectedDate}
          setEditFormValue={setEditFormValue}
          setSelectedDate={setSelectedDate}
          handleAddMood={handleAddMood}
          handleUpdateMood={handleUpdateMood}
          editMood={editMood}
          setShowForm={setShowForm}
          handleDeleteMood={handleDeleteMood}
        />
      )}

      <MoodTable
        moods={moods}
        handleEditMood={handleEditMood}
        handleDeleteMood={handleDeleteMood}
        newMood={newMood}
      />
    </div>
  );
};

export default Moods;
