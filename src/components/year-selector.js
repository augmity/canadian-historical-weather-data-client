import React from 'react';


/*
 * YearSelector
 */
const YearSelector = ({ range, onChange }) => {
  
  const years = (range)
    ? Array(range.to - range.from + 1).fill().map((_, idx) => range.from + idx)
    : [];

  const change = (event) => {
    if (onChange) {
      onChange(parseInt(event.target.value) || null);
    }
  };

  return <div className="select">
    <select onChange={change}>
      <option>(Select Year)</option>
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  </div>;
}

export default YearSelector;
