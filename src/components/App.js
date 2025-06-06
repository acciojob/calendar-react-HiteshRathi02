import React, { useState } from 'react';

const Calendar = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()); 
  const [year, setYear] = useState(today.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);


  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const calendar = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }

    return calendar;
  };

  const calendarData = generateCalendar();

  const changeMonth = (offset) => {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const changeYear = (offset) => {
    setYear(prev => prev + offset);
  };

  return (
    <div style={{ textAlign: 'center' }}>
    <h2>Calendar</h2>
      <div style={{ marginBottom: '20px' }}>
  <select
    id="months"
    onChange={(e) => setMonth(Number(e.target.value))}
    value={month}
    style={{ marginRight: '10px' }}
  >
    {monthNames.map((month, ind) => (
      <option key={ind} value={ind}>
        {month}
      </option>
    ))}
  </select>

  {isEditingYear ? (
    <input
      type="number"
      value={year}
      autoFocus
      onChange={(e) => setYear(Number(e.target.value))}
      onBlur={() => setIsEditingYear(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') setIsEditingYear(false);
      }}
    />
  ) : (
    <span
      onDoubleClick={() => setIsEditingYear(true)}
      style={{
        cursor: 'pointer',
        borderBottom: '1px dashed gray',
        padding: '4px',
        fontSize: '16px',
      }}
      title="Double-click to edit"
    >
      {year}
    </span>
  )}
</div>



      <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} style={{ padding: '5px', border: '1px solid black' }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td
                  key={j}
                  style={{
                    padding: '10px',
                    border: '1px solid black',
                    backgroundColor: day ? '#e3f2fd' : '#f5f5f5'
                  }}
                >
                  {day || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => changeMonth(-1)}>Prev Month</button>
        <button onClick={() => changeMonth(1)} style={{ marginLeft: '10px' }}>Next Month</button>
        <br /><br />
        <button onClick={() => changeYear(-1)}> Prev Year</button>
        <button onClick={() => changeYear(1)} style={{ marginLeft: '10px' }}>Next Year</button>
      </div>
    </div>
  );
};

export default Calendar;
