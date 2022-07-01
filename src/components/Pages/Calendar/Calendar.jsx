import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useTitle from "../../../hooks/useTitle";

const css = `
  .my-selected { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover { 
    border-color: black;
    color: black;
  }
  .my-today { 
    border: 2px solid currentColor;
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

const Calendar = () => {
  useTitle("Calendar");
  const [selected, setSelected] = useState(new Date());

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You select {format(selected, "PP")}.</p>;
  }
  return (
    <div className="py-36 px-4 h-screen">
      <div className="card bg-base-100 w-full md:w-96 lg:w-96 shadow-xl mx-auto flex justify-center items-center">
        <style>{css}</style>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          modifiersClassNames={{
            selected: "my-selected",
            today: "my-today",
          }}
          footer={footer}
        />
      </div>
    </div>
  );
};

export default Calendar;
