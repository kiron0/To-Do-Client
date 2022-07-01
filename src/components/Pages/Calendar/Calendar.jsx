import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Calendar = () => {
  const [selected, setSelected] = useState(new Date());

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You select {format(selected, "PP")}.</p>;
  }
  return (
    <div className="py-36 px-4 h-screen">
      <div className="card bg-base-100 w-full md:w-96 lg:w-96 shadow-xl mx-auto flex justify-center items-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
        />
      </div>
    </div>
  );
};

export default Calendar;
