import React from "react";
import axios from "axios";
import classes from "./Agenda.module.css";
import moment from "moment";
import useIsMount from "../../Utilities/MountRef/MountRef";

const Agenda = (props) => {
    const [agenda, setAgenda] = React.useState([]);
    const isMount = useIsMount();

    const updateAgenda = () => {
        axios.get("/agenda").then((response) => {
            let temp = {};
            let data = response.data["events"];

            for (let i = 0; i < data.length; i++) {
                let dateData = null;
                let time = null;

                if (data[i]["start"]["dateTime"] !== undefined) {
                    dateData = data[i]["start"]["dateTime"];
                    time = moment(dateData).format("LT");
                } else {
                    dateData = data[i]["start"]["date"];
                }
                dateData = moment(dateData).format("MMM D, YYYY");

                if (temp[dateData] === undefined) {
                    temp[dateData] = [];
                }
                temp[dateData].push({
                    time: time,
                    summary: data[i]["summary"],
                });
            }
            setAgenda(temp);
        });
    };

    React.useEffect(() => {
        if (isMount) {
            updateAgenda();
        } else {
            const interval = setInterval(() => updateAgenda(), 300000);
            return () => clearInterval(interval);
        }
    }, [isMount]);

    let agendaFormat = Object.keys(agenda).map((key) => {
        let summary = agenda[key].map((entry) => {
            return (
                <div className={classes.Entry}>
                    <div className={classes.Time}>
                        {entry["time"] ? entry["time"] : "All Day"}
                    </div>
                    <div className={classes.Summary}>{entry["summary"]}</div>
                </div>
            );
        });
        return (
            <div>
                <div className={classes.AgendaDate}>
                    {moment(key).format("MMM D, YYYY")}
                </div>
                {summary}
            </div>
        );
    });

    return (
        <div className={classes.Agenda}>
            <div className={classes.AgendaHeader}>Agenda</div>
            {agenda ? agendaFormat : ""}
        </div>
    );
};

export default Agenda;
