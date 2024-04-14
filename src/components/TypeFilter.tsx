import React from "react";

export default function TypeFilter ({types_list, types_readable, defaultChecked, handleChange}) {
  if (types_list === null || types_list === undefined) {
    return;
  }

  return (
    <div className="type_row">
      { types_list.map((a) => 
        <span key={"type_" + a} className="month">
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox" 
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              {types_readable[a]}
          </span>
        </span>
      )}
    </div>
  );
}