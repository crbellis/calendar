import Calendar from "./Containers/Calendar/Calendar";
import Agenda from "./Containers/Agenda/Agenda";
import classes from "./App.module.css";

function App() {
	return (
		<div className={classes.AppWrapper}>
			<div className={classes.App}>
				<Calendar />
			</div>
			<Agenda />
		</div>
	);
}

export default App;
