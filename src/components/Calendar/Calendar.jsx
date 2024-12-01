import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SimpleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    
    <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div className="selected-date m-5">
        <h2>Selected Date:</h2>
        <p>{selectedDate.toDateString()}</p>
      </div>
    </div>
  );
};

export default SimpleCalendar;
