import React from "react";
import moment from "moment";
import classes from "./Calendar.module.css";

const Calendar = () => {
    const date = moment();
    const firstDayOfMonth = () => moment(date).startOf("month").format("d");
    const displayTime = () => moment.utc(date).local().format("h:mm:ss");
    const [currentTime, setCurrentTime] = React.useState();
    React.useEffect(() => {
        const interval = setInterval(() => setCurrentTime(displayTime()), 1000);
        return () => clearInterval(interval);
    });

    let weekdayShort = moment.weekdaysShort();
    let weekdayShortName = weekdayShort.map((day, i) => {
        return (
            <th key={day + i} className={classes.WeekDay}>
                {day[0]}
            </th>
        );
    });

    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push(
            <td key={"blank_" + i} className={classes.CalendarDay}></td>
        );
    }

    let daysInMonth = [];
    for (let d = 1; d <= moment().daysInMonth(); d++) {
        let dayClass =
            d === date.date() ? classes.CurrentDay : classes.CalendarDay;
        daysInMonth.push(
            <td key={"day_" + d} className={dayClass}>
                {d}
            </td>
        );
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row); // if index not equal 7 that means not go to next week
        } else {
            rows.push(cells); // when reach next week we contain all td in last week to rows
            cells = []; // empty container
            cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) {
            // when end loop we add remain date
            rows.push(cells);
        }
    });

    daysInMonth = rows.map((d, i) => {
        return <tr key={d + i}>{d}</tr>;
    });

    return (
        <div className={classes.CalendarWrapper}>
            <div className={classes.TodayWrapper}>
                <div className={classes.TodayHeader}>
                    <div className={classes.Month}>
                        {date.format("MMM").toUpperCase()}
                    </div>
                    <div className={classes.Today}>{date.date()}</div>
                </div>
                <div className={classes.Time}>
                    {currentTime ? currentTime : displayTime()}
                </div>
            </div>

            <div className={classes.Calendar}>
                <table className={classes.WeekDayHeader}>
                    <thead className={classes.WeekDayHead}>
                        <tr className={classes.WeekDayHead}>
                            {weekdayShortName}
                        </tr>
                    </thead>
                </table>
                <table className={classes.DaysHeader}>
                    <tbody className={classes.CalendarDayHead}>
                        {daysInMonth}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
