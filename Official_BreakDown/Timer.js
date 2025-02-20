document.addEventListener("DOMContentLoaded", function () {
    const timerDisplay = document.getElementById("timerDisplay");
    const startPauseBtn = document.getElementById("startPauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const sessionCounter = document.getElementById("sessionCounter");
    const pomodoroCount = document.getElementById("pomodoroCount");
    const circleProgress = document.getElementById("circleProgress");
    const toggleThemeBtn = document.getElementById("toggleTheme");
    const settingsPanel = document.getElementById("settingsPanel");
    const saveSettingsBtn = document.getElementById("saveSettings");
    const workTimeInput = document.getElementById("workTime");
    const breakTimeInput = document.getElementById("breakTime");
    const longBreakTimeInput = document.getElementById("longBreakTime");
    
    let timer;
    let time = parseInt(localStorage.getItem("workTime")) || 1500;
    let isRunning = false;
    let session = 1;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    function updateDisplay() {
        const minutes = String(Math.floor(time / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;
        sessionCounter.textContent = `Session: ${session} / 4`;
        let progress = ((1500 - time) / 1500) * 100;
        circleProgress.style.background = `conic-gradient(#007bff ${progress}%, #222 0%)`;
    }
    
    function startPauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            startPauseBtn.textContent = "Start";
        } else {
            timer = setInterval(() => {
                if (time > 0) {
                    time--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    playSound();
                    completeSession();
                }
            }, 1000);
            startPauseBtn.textContent = "Pause";
        }
        isRunning = !isRunning;
    }
    
    function completeSession() {
        session++;
        time = session < 5 ? parseInt(breakTimeInput.value) * 60 : parseInt(longBreakTimeInput.value) * 60;
        alert(session < 5 ? "Time for a short break!" : "Long break time!");
        updateDisplay();
    }
    
    function resetTimer() {
        clearInterval(timer);
        time = parseInt(workTimeInput.value) * 60;
        session = 1;
        isRunning = false;
        startPauseBtn.textContent = "Start";
        updateDisplay();
    }
    
    function playSound() {
        let audio = new Audio("alert.mp3");
        audio.play();
    }
    
    function toggleSettings() {
        settingsPanel.style.display = settingsPanel.style.display === "block" ? "none" : "block";
    }
    
    saveSettingsBtn.addEventListener("click", () => {
        localStorage.setItem("workTime", workTimeInput.value * 60);
        localStorage.setItem("breakTime", breakTimeInput.value * 60);
        localStorage.setItem("longBreakTime", longBreakTimeInput.value * 60);
        alert("Settings saved!");
        toggleSettings();
    });
    
    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });
    
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    
    startPauseBtn.addEventListener("click", startPauseTimer);
    resetBtn.addEventListener("click", resetTimer);
    updateDisplay();
});