
import { useState } from "react";

const YearSelector = ({ defaultYear = new Date().getFullYear(), onChange }) => {
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 2025 + 1 },
    (_, index) => currentYear - index
  );

  const handleChange = (event) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    onChange?.(year);
  };

  return (
    <>
      <h2 className="fs-2 mb-3">Collection {selectedYear}</h2>

      <div className="year-selector">
        <svg
          className="year-calendar-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="3.5" y="6.5" width="25" height="22" rx="2"
            stroke="currentColor" strokeWidth="2" />
          <path d="M10 3V10M22 3V10M4 13H28"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 18H10.01M16 18H16.01M22 18H22.01M10 23H10.01M16 23H16.01"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <span className="year-label">Year</span>

        <div className="year-dropdown">
          <select
            value={selectedYear}
            onChange={handleChange}
            aria-label="Select year"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <span className="year-value">{selectedYear}</span>

          <svg
            className="year-dropdown-arrow"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 9L12 16L19 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default YearSelector;
