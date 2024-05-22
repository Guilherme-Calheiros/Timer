let countdownHoursInput = document.getElementById('countdownHoursInput');
let countdownMinutesInput = document.getElementById('countdownMinutesInput');
let countdownSecondsInput = document.getElementById('countdownSecondsInput');
let countdownTimer = document.getElementById('countdownTimer');

let stopwatchTimer = document.getElementById('stopwatchTimer');
let marksList = document.getElementById('marksList');
let intervalStopwatchId = 0
let timerStopwatch = 0
let elapsedTime = 0
let marks = []

let intervaCountdownlId

let select = document.getElementById('timeFunction')
select.addEventListener('change', () => {
    let optionSelected = select.querySelector('option:checked').value

    if (optionSelected === 'countdownFunction') {
        document.getElementById('countdown').style.display = 'flex'
        document.getElementById('stopwatch').style.display = 'none'
    } else if (optionSelected === 'stopwatchFunction'){
        document.getElementById('countdown').style.display = 'none'
        document.getElementById('stopwatch').style.display = 'flex'
    }
})

const toggleVisibility = () => {
    document.getElementById('inputsCountdown').classList.toggle('hidden')
    document.getElementById('countdownTimer').classList.toggle('hidden')
}

const formatTime = (time) => {
    const hours = Math.round(time / 1000 / 60 / 60);
    const minutes = Math.round(time / 1000 / 60) % 60;
    const seconds = Math.round(time / 1000) % 60;

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
}

const formatNumber = (number) =>{
    if (number < 10){
        return `0${number}`
    } else{
        return number
    }
}

const startCountdown = () => {

    toggleVisibility()

    const hours = parseInt(countdownHoursInput.value) || 0
    const minutes = parseInt(countdownMinutesInput.value) || 0
    const seconds = parseInt(countdownSecondsInput.value) || 0

    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + hours)
    targetTime.setMinutes(targetTime.getMinutes() + minutes)
    targetTime.setSeconds(targetTime.getSeconds() + seconds)

    const updateCountdown = () => {
        const currentTime = new Date();
        const timeDifference = targetTime.getTime() - currentTime.getTime();
        
        if (timeDifference > 0){
            countdownTimer.innerText = formatTime(timeDifference)

        } else {
            clearInterval(intervaCountdownlId);
            countdownTimer.innerText = '00:00:00'
            toggleVisibility()

        }
    }


    intervaCountdownlId = setInterval(updateCountdown, 1000);

    updateCountdown();
}

const stopCountdown = () => {

    clearInterval(intervaCountdownlId);
    const hours = '00'
    const minutes = '00'
    const seconds = '00'

    countdownTimer.innerText = `${hours}:${minutes}:${seconds}`
    countdownHoursInput.value = "";
    countdownMinutesInput.value = "";
    countdownSecondsInput.value = "";
    toggleVisibility()
}


const startStopwatch = () => {
    const button = document.getElementById('startStopwatch')
    const action = button.getAttribute('action')

    if (action === 'start' || action === 'continue'){
        let startTime = Date.now();
        intervalStopwatchId = setInterval(() => {
            const currentTime = Date.now();
            timerStopwatch = currentTime - startTime + elapsedTime;
            stopwatchTimer.innerText = formatTime(timerStopwatch)
        }, 1000)
        button.setAttribute('action', 'pause')
        button.innerHTML = '<span class="material-symbols-outlined">pause</span>'
    } else if(action === 'pause'){
        clearInterval(intervalStopwatchId);
        elapsedTime = timerStopwatch;

        button.setAttribute('action', 'continue')
        button.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>'
    }
}

const resetStopwatch = () => {
    clearInterval(intervalStopwatchId);
    elapsedTime = 0;
    timerStopwatch = 0;
    stopwatchTimer.innerText = '00:00:00'
    marksList.innerHTML = ''
    marks = []
    const button = document.getElementById('startStopwatch')
    button.setAttribute('action', 'start')
    button.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>'
}

const addMarkToList = (markIndex, markTime) => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>` 
}

const markTime = () => {
    marks.push(timerStopwatch)
    addMarkToList(marks.length, timerStopwatch)
}