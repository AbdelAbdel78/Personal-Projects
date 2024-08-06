const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const lapTable = document.querySelector(".lapTable");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let lapCount = 0;
let isRunning = false;

function toggle(){

    if (!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        resetLapButton.textContent = "Lap";
        toggleButton.textContent = "Stop";
        toggleButton.classList.remove("start");
        toggleButton.classList.add("stop");
        isRunning = true;
    }
    
    else{
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        resetLapButton.textContent = "Reset";
        toggleButton.textContent = "Start"
        toggleButton.classList.remove("stop");
        toggleButton.classList.add("start");
        isRunning = false;
    }
}

function resetLap(){
    
    const tableBody = document.querySelector('#container tbody');

    if (!isRunning){
        tableBody.innerHTML = '';
        lapTable.style.opacity = 0;
        clearInterval(timer);
        startTime = 0;
        elapsedTime = 0;
        lapCount = 0;
        isRunning = false;
        stopwatchDisplay.textContent = "00:00:00.00"
    }

    else{
        lapTable.style.opacity = 1;
        lapCount++;

        const newRow = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = `Lap ${lapCount}`;
        newRow.appendChild(cell1);
        const cell2 = document.createElement('td');
        cell2.textContent = stopwatchDisplay.textContent;
        newRow.appendChild(cell2);
        tableBody.appendChild(newRow);
    }
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`.replace(/^0+:/, '');
}
