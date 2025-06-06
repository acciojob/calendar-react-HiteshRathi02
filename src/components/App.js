import React, { useState } from "react";

const App = () => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showYearInput, setShowYearInput] = useState(false);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.selectedIndex);
    };

    const handleYearDoubleClick = () => {
        setShowYearInput(true);
    };

    const handleYearInput = (event) => {
        setSelectedYear(event.target.value);

        document.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                setShowYearInput(false);
            }
        });
    };

    const handlePreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const handlePreviousYear = () => {
        setSelectedYear(selectedYear - 1);
    };

    const handleNextYear = () => {
        setSelectedYear(selectedYear + 1);
    };

    const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

    const createTableCells = (selectedMonth, selectedYear) => {
        let cells = [];
        const numberOfDays = daysInMonth(selectedMonth + 1, selectedYear);
        const startingDay = new Date(selectedYear, selectedMonth).getDay();
        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                let cellId = `cell${i + j + 1}`;

                if (i === 0 && j < startingDay) {
                    row.push(<td key={j} id={cellId}></td>);
                } else if (date > numberOfDays) {
                    row.push(<td key={j} id={cellId}></td>);
                } else {
                    let currentDate = new Date();
                    if (
                        selectedYear === currentDate.getFullYear() &&
                        selectedMonth === currentDate.getMonth() &&
                        date === currentDate.getDate()
                    ) {
                        cellId = "today";
                    }
                    row.push(
                        <td key={j} id={cellId}>
                            {date}
                        </td>
                    );
                    date++;
                }
            }
            cells.push(<tr key={i}>{row}</tr>);
        }
        return cells;
    };

    return (
        <div>
            <h1 id="heading">Calendar</h1>
            <select
                id="month"
                value={months[selectedMonth]}
                onChange={handleMonthChange}
            >
                {months.map((month, index) => (
                    <option key={month}>{month}</option>
                ))}
            </select>
            {showYearInput ? (
                <input
                    id="year-text-box"
                    type="text"
                    value={selectedYear}
                    onChange={handleYearInput}
                />
            ) : (
                <span id="year" onDoubleClick={handleYearDoubleClick}>
                    {selectedYear}
                </span>
            )}
            <table>
                <thead>
                    <tr>
                        {days.map((day) => (
                            <td key={day} id={day}>
                                {day}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>{createTableCells(selectedMonth, selectedYear)}</tbody>
            </table>
            <button id="previous-year" onClick={handlePreviousYear}>
                &lt;&lt;
            </button>
            <button id="previous-month" onClick={handlePreviousMonth}>
                &lt;
            </button>

            <button id="next-month" onClick={handleNextMonth}>
                &gt;
            </button>
            <button id="next-year" onClick={handleNextYear}>
                &gt;&gt;
            </button>
        </div>
    );
};

export default App;