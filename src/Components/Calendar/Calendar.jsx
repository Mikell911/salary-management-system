import "./Calendar.scss";
import React, { useCallback, useEffect, useState } from "react";

const Calendar = (props) => {
    const Month = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const Weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [lastDayOfMonth, setLastDayOfMonth] = useState(0);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);
    const [lastDayOfLastMonth, setLastDayOfLastMonth] = useState(0);
    const [activeDay, setActiveDay] = useState(null);
    const [workingDaysCount, setWorkingDaysCount] = useState(0);

    const initializeCalendar = useCallback(() => {
        const date = new Date(year, monthIndex, 1);
        const firstDay = date.getDay();
        const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();
        const lastDayOfLastMonth = new Date(year, monthIndex, 0).getDate();

        setFirstDayOfMonth(firstDay === 0 ? 7 : firstDay);
        setLastDayOfMonth(lastDayOfMonth);
        setLastDayOfLastMonth(lastDayOfLastMonth);

        setWorkingDaysCount(countWorkingDays(year, monthIndex));
    }, [monthIndex, year]);

    useEffect(() => {
        initializeCalendar();
    }, [initializeCalendar]);

    const countWorkingDays = (year, monthIndex) => {
        let count = 0;
        for (let i = 1; i <= new Date(year, monthIndex + 1, 0).getDate(); i++) {
            const day = new Date(year, monthIndex, i).getDay();
            if (day >= 1 && day <= 5) {
                count++;
            }
        }
        return count;
    };

    const generateDays = (lastDayOfMonth) => {
        return Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);
    };

    const generateLastDays = (firstDayOfMonth) => {
        return Array.from({ length: firstDayOfMonth - 1 }, (_, i) => lastDayOfLastMonth - i).reverse();
    };

    const daysArray = generateDays(lastDayOfMonth);
    const daysLastArray = generateLastDays(firstDayOfMonth);

    const handleMonthChange = (direction) => {
        const newMonthIndex = monthIndex + direction;
        if (newMonthIndex < 0) {
            setMonthIndex(11);
            setYear(year - 1);
        } else if (newMonthIndex > 11) {
            setMonthIndex(0);
            setYear(year + 1);
        } else {
            setMonthIndex(newMonthIndex);
        }
        setActiveDay(null)
    };

    const clickDay = (day) => {
        setActiveDay(day);

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = (monthIndex + 1).toString().padStart(2, '0');
        const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

        if (props.onSelect) {
            props.onSelect(formattedDate);
        }
        props.workingDays(workingDaysCount);
    };

    return (
        <div className={'calendar'}>
            <div className={'calendar__content'}>
                <div className={'calendar__header'}>
                    <span>
                        <svg
                            onClick={() => handleMonthChange(-1)}
                            className={'calendar__arrow'}
                            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M9.5 16.866C8.83333 16.4811 8.83333 15.5189 9.5 15.134L18.5 9.93782C19.1667 9.55292 20 10.034 20 10.8038L20 21.1962C20 21.966 19.1667 22.4471 18.5 22.0622L9.5 16.866Z" fill={monthIndex === 0 ? '#898DA9' : '#CBB6E5'} />
                        </svg>
                    </span>

                    <p className={'calendar__month'}>
                        {Month[monthIndex]} {year}
                    </p>

                    <span>
                        <svg
                            onClick={() => handleMonthChange(1)}
                            className={'calendar__arrow'}
                            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M22.5 16.866C23.1667 16.4811 23.1667 15.5189 22.5 15.134L13.5 9.93782C12.8333 9.55292 12 10.034 12 10.8038L12 21.1962C12 21.966 12.8333 22.4471 13.5 22.0622L22.5 16.866Z" fill={monthIndex === 11 ? '#898DA9' : '#CBB6E5'} />
                        </svg>
                    </span>
                </div>

                <div className={'calendar__row'}>
                    {Weekdays.map((day, index) => (
                        <p key={index} className={'calendar__weekdays'}>{day}</p>
                    ))}

                    {daysLastArray.map((day, index) => (
                        <p key={index} className={'calendar__last-days'}>{day}</p>
                    ))}

                    {daysArray.map((day, index) => (
                        <p
                            key={index}
                            onClick={() => clickDay(day)}
                            className={`calendar__days ${(daysLastArray.length + day) % 7 === 0 ? 'red-button' : 'blue-button'}
                        ${activeDay === day ? 'active' : ''}
                        `}
                        >
                            {day}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
