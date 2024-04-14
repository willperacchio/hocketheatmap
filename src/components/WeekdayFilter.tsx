import React from "react";

export default function WeekdayFilter ({weekdays_list, weekdays_readable, defaultChecked, handleChange}) {
  if (weekdays_list === null || weekdays_list === undefined) {
    return;
  }

  return (
    <div className="weekday_row">
      { weekdays_list.map((a) => 
        <span key={"weekday_" + a} className="month">
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox" 
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              {weekdays_readable[a]}
          </span>
        </span>
      )}
    </div>
  );
}