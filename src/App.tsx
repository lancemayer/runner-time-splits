import { ChronoUnit, LocalDateTime } from "@js-joda/core";
import { createSignal } from "solid-js";
import "./App.css";

function App() {
	const [startTime, setStartTime] = createSignal<LocalDateTime>();
	const [splitTime, setSplitTime] = createSignal<LocalDateTime>();
	const [timer, setTimer] = createSignal<number | null>(null);
	const [elapsedTime, setElapsedTime] = createSignal<number | null>(null);

	return (
		<>
			<div class="card">
				<button
					onClick={() => {
						setStartTime(LocalDateTime.now());

						setTimer(
							setInterval(() => {
								setElapsedTime(
									startTime()?.until(LocalDateTime.now(), ChronoUnit.SECONDS)
								);
							}, 1000)
						);
					}}
				>
					Start
				</button>
				<button onClick={() => setSplitTime(LocalDateTime.now())}>Split</button>
				<p>
					Time elapsed:{" "}
					{elapsedTime()
						? Math.floor(elapsedTime() / 60) +
						  ":" +
						  (elapsedTime() % 60).toString().padStart(2, "0")
						: ""}
				</p>
				<p>
					split:{" "}
					{splitTime()
						? startTime()?.until(splitTime(), ChronoUnit.MINUTES).toString() +
						  ":" +
						  (startTime()?.until(splitTime(), ChronoUnit.SECONDS) % 60)
								.toString()
								.padStart(2, "0")
						: ""}
				</p>
			</div>
		</>
	);
}

export default App;
