const timerDisplay = document.getElementById("timerDisplay");
const alarm = document.getElementById("alarm");
let timer = null;
let totalTime = 0;
let isRunning = false;

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

function updateTimerDisplay() {
	updatetotalTime();
	const hours = String(hoursInput.value).padStart(2, "0");
	const minutes = String(minutesInput.value).padStart(2, "0");
	const seconds = String(secondsInput.value).padStart(2, "0");

	timerDisplay.textContent = `${hours}:${minutes}:${seconds}.00`.replace(
		/^0+:/,
		""
	);
}

function updatetotalTime() {
	if (!isRunning) {
		totalTime =
			hoursInput.value * 3600000 +
			minutesInput.value * 60000 +
			secondsInput.value * 1000;
	}
}

hoursInput.addEventListener("input", updateTimerDisplay);
minutesInput.addEventListener("input", updateTimerDisplay);
secondsInput.addEventListener("input", updateTimerDisplay);

updateTimerDisplay();

function toggle() {
	if (!isRunning) {
		toggleButton.value = "Stop";
		toggleButton.classList.remove("start");
		toggleButton.classList.add("stop");
		isRunning = true;
		timer = setInterval(update, 10);
	} else {
		if (totalTime > 0) {
			alarm.pause();
			toggleButton.value = "Start";
			toggleButton.classList.remove("stop");
			toggleButton.classList.add("start");
			updatetotalTime();
			isRunning = false;
			clearInterval(timer);
		} else {
			reset();
		}
	}
}

function reset() {
	alarm.pause();
	toggleButton.value = "Start";
	toggleButton.classList.remove("stop");
	toggleButton.classList.add("start");
	clearInterval(timer);
	isRunning = false;
	updateTimerDisplay();
}

function update() {
	if (totalTime >= 0) {
		let hours = Math.floor(totalTime / (1000 * 60 * 60));
		let minutes = Math.floor((totalTime / (1000 * 60)) % 60);
		let seconds = Math.floor((totalTime / 1000) % 60);
		let milliseconds = Math.floor((totalTime % 1000) / 10);

		hours = String(hours).padStart(2, "0");
		minutes = String(minutes).padStart(2, "0");
		seconds = String(seconds).padStart(2, "0");
		milliseconds = String(milliseconds).padStart(2, "0");

		timerDisplay.textContent =
			`${hours}:${minutes}:${seconds}.${milliseconds}`.replace(/^0+:/, "");
		totalTime -= 10;
	} else {
		alarm.play();
	}
}
