function showScoreImage(imgId, imgSrc) {
    const img = document.getElementById(imgId);
    img.src = imgSrc;
    img.style.display = 'block';
    img.style.opacity = 0;
    // Force reflow to ensure transition
    void img.offsetWidth;
    img.style.opacity = 1;
    setTimeout(() => {
        img.style.opacity = 0;
        setTimeout(() => {
            img.style.display = 'none';
        }, 500);
    }, 1000);
}

function playSound(soundPath) {
    const audio = new Audio(soundPath);
    audio.play();
}

function addMusaPoints() {
    const musaPointsElement = document.getElementById('musaPoints');
    let musaPoints = parseInt(musaPointsElement.textContent, 10);
    musaPoints++;
    musaPointsElement.textContent = musaPoints;
    showScoreImage('scoreImage1', 'Scoreboard_Images_And_Music/+1 Musa Point!.png');
    playSound('Scoreboard_Images_And_Music/crowd-cheering.mp3');
    checkWinner();
}

function subtractMusaPoints() {
    const musaPointsElement = document.getElementById('musaPoints');
    let musaPoints = parseInt(musaPointsElement.textContent, 10);
    musaPoints--;
    musaPointsElement.textContent = musaPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
    checkWinner();
}

function resetPoints() {
    document.getElementById('musaPoints').textContent = '0';
    document.getElementById('jozyPoints').textContent = '0';
    playSound('Scoreboard_Images_And_Music/Dun-Dun-Duun.mp3');
    checkWinner();
}

function addJozyPoints() {
    const jozyPointsElement = document.getElementById('jozyPoints');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints++;
    jozyPointsElement.textContent = jozyPoints;
    showScoreImage('scoreImage1', 'Scoreboard_Images_And_Music/+1 Jozy Point!.png');
    playSound('Scoreboard_Images_And_Music/crowd-cheering.mp3');
    checkWinner();
}

function subtractJozyPoints() {
    const jozyPointsElement = document.getElementById('jozyPoints');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints--;
    jozyPointsElement.textContent = jozyPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
    checkWinner();
}

// Save win scores to localStorage
function saveWinScores() {
    localStorage.setItem('musaWins', document.getElementById('musaPointss').textContent);
    localStorage.setItem('jozyWins', document.getElementById('jozyPointss').textContent);
}

// Load win scores from localStorage
function loadWinScores() {
    const musaWins = localStorage.getItem('musaWins');
    const jozyWins = localStorage.getItem('jozyWins');
    if (musaWins !== null) document.getElementById('musaPointss').textContent = musaWins;
    if (jozyWins !== null) document.getElementById('jozyPointss').textContent = jozyWins;
}

// Update win score functions to save after change
function addMusaPointss() {
    const musaPointsElement = document.getElementById('musaPointss');
    let musaPoints = parseInt(musaPointsElement.textContent, 10);
    musaPoints++;
    musaPointsElement.textContent = musaPoints;
    showScoreImage('scoreImage2', 'Scoreboard_Images_And_Music/+1 Musa Win!.png');
    playSound('Scoreboard_Images_And_Music/crowd-cheering.mp3');
    saveWinScores();
}

function subtractMusaPointss() {
    const musaPointsElement = document.getElementById('musaPointss');
    let musaPoints = parseInt(musaPointsElement.textContent, 10);
    musaPoints--;
    musaPointsElement.textContent = musaPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
    saveWinScores();
}

function resetPointss() {
    document.getElementById('musaPointss').textContent = '0';
    document.getElementById('jozyPointss').textContent = '0';
    playSound('Scoreboard_Images_And_Music/Dun-Dun-Duun.mp3');
    saveWinScores();
}

function addJozyPointss() {
    const jozyPointsElement = document.getElementById('jozyPointss');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints++;
    jozyPointsElement.textContent = jozyPoints;
    showScoreImage('scoreImage2', 'Scoreboard_Images_And_Music/+1 Jozy Win!.png');
    playSound('Scoreboard_Images_And_Music/crowd-cheering.mp3');
    saveWinScores();
}

function subtractJozyPointss() {
    const jozyPointsElement = document.getElementById('jozyPointss');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints--;
    jozyPointsElement.textContent = jozyPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
    saveWinScores();
}

function checkWinner() {
    const musaPoints = parseInt(document.getElementById('musaPoints').textContent, 10);
    const jozyPoints = parseInt(document.getElementById('jozyPoints').textContent, 10);
    let message = '';
    if (musaPoints > jozyPoints) {
        message = `Musa is winning by ${musaPoints - jozyPoints} point(s)!`;
    } else if (jozyPoints > musaPoints) {
        message = `Jozy is winning by ${jozyPoints - musaPoints} point(s)!`;
    } else {
        message = "It's a tie!";
    }
    document.getElementById('winnerMessage').textContent = message;
}

// Load win scores on page load
window.addEventListener('DOMContentLoaded', loadWinScores);
