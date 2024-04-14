import React from "react";

export default function CountryFilter ({countries_list, countries_readable, defaultChecked, handleChange}) {
  if (countries_list === null || countries_list === undefined) {
    return;
  }

  return (
    <div className="country_row">
      { countries_list.map((a) => 
        <span key={"countries_" + a} className="month">
          <span className="checkbox">
              <input 
                  value={a} 
                  type="checkbox"
                  defaultChecked={defaultChecked} 
                  onChange={handleChange}/>
              {countries_readable[a]}
          </span>
        </span>
      )}
    </div>
  );
}