import React, { useState } from 'react';

const MonthYearSelector = ({
  currentMonth,
  currentYear,
  onChange,
}: {
  currentMonth: number;
  currentYear: number;
  onChange: (month: number, year: number) => void;
}) => {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const handleChange = () => {
    onChange(month, year);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="px-3 py-1 border rounded-md text-sm"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {`เดือน ${i + 1}`}
          </option>
        ))}
      </select>
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="px-3 py-1 border rounded-md text-sm"
      >
        {Array.from({ length: 5 }, (_, i) => {
          const y = new Date().getFullYear() - 2 + i;
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
      <button
        onClick={handleChange}
        className="ml-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        🔄 โหลด
      </button>
    </div>
  );
};

export default MonthYearSelector;