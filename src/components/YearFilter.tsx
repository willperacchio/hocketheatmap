import React from "react";

export default function YearFilter ({years_list, defaultChecked, handleChange}) {
  if (years_list === null || years_list === undefined) {
    return;
  }

  return (
    <div className="month_row">
      { years_list.map((a) => 
        <span key={"months_" + a} className="month">
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox" 
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              {a}
          </span>
        </span>
      )}
    </div>
  );
}