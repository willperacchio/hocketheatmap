import React from "react";

export default function MonthFilter ({months_list, months_readable, defaultChecked, handleChange}) {
  if (months_list === null || months_list === undefined) {
    return;
  }

  return (
    <div className="month_row">
      { months_list.map((a) => 
        <span key={"months_" + a} className="month">
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox" 
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              {months_readable[a]}
          </span>
        </span>
      )}
    </div>
  );
}