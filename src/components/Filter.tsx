import React from "react";

export default function Filter ({filters_list, filters_readable, defaultChecked, handleChange, style, grid}) {
  if (filters_list === null || filters_list === undefined) {
    return;
  }

  return (
    <div className={`filter_row ` + grid}>
      { filters_list.map((a) => 
        <span key={"filters_" + a} className={`filter ` + style}>
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox" 
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              {filters_readable[a]}
          </span>
        </span>
      )}
    </div>
  );
}