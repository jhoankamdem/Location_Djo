//import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Menu() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    setDate(currentDate.toLocaleDateString('en-US', dateOptions) + ' ' + currentDate.toLocaleTimeString('en-US', timeOptions));
  }, []);

  return (
    <div className="gmenu">
      <h2 className="start"><span>Charone City</span></h2>
      <p className="end">{date} </p>
    </div>
  );
}
