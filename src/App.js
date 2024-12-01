import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SelectedDate from "./components/SelectedDate/SelectedDate";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app-wrapper">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Daily Weather Checker</h1>
        <div className="d-flex justify-content-center">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <SelectedDate className="m-auto" date={selectedDate} />
      </div>
      <footer className="footer">
        <div className="footer-content text-center">
          <p>&copy; {new Date().getFullYear()} Junaet Mahbub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
