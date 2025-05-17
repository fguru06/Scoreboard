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
}

function subtractMusaPoints() {
    const musaPointsElement = document.getElementById('musaPoints');
    let musaPoints = parseInt(musaPointsElement.textContent, 10);
    musaPoints--;
    musaPointsElement.textContent = musaPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
}

function resetPoints() {
    document.getElementById('musaPoints').textContent = '0';
    document.getElementById('jozyPoints').textContent = '0';
    playSound('Scoreboard_Images_And_Music/Dun-Dun-Duun.mp3');
}

function addJozyPoints() {
    const jozyPointsElement = document.getElementById('jozyPoints');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints++;
    jozyPointsElement.textContent = jozyPoints;
    showScoreImage('scoreImage1', 'Scoreboard_Images_And_Music/+1 Jozy Point!.png');
    playSound('Scoreboard_Images_And_Music/crowd-cheering.mp3');
}

function subtractJozyPoints() {
    const jozyPointsElement = document.getElementById('jozyPoints');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints--;
    jozyPointsElement.textContent = jozyPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
}

function addMusaPointss() {
    const musaPointsElement = document.getElementById('musaPointss');
    let musaPoints = parseInt(musaPointsElement.textContent, 10);
    musaPoints++;
    musaPointsElement.textContent = musaPoints;
    showScoreImage('scoreImage2', 'Scoreboard_Images_And_Music/+1 Musa Win!.png');
    playSound('Scoreboard_Images_And_Music/crowd-cheering.mp3');
}

function subtractMusaPointss() {
    const musaPointsElement = document.getElementById('musaPointss');
    let musaPoints = parseInt(musaPointsElement.textContent, 10);
    musaPoints--;
    musaPointsElement.textContent = musaPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
}

function resetPointss() {
    document.getElementById('musaPointss').textContent = '0';
    document.getElementById('jozyPointss').textContent = '0';
    playSound('Scoreboard_Images_And_Music/Dun-Dun-Duun.mp3');
}

function addJozyPointss() {
    const jozyPointsElement = document.getElementById('jozyPointss');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints++;
    jozyPointsElement.textContent = jozyPoints;
    showScoreImage('scoreImage2', 'Scoreboard_Images_And_Music/+1 Jozy Win!.png');
    playSound('Scoreboard_Images_And_Music/crowd-cheering.mp3');
}

function subtractJozyPointss() {
    const jozyPointsElement = document.getElementById('jozyPointss');
    let jozyPoints = parseInt(jozyPointsElement.textContent, 10);
    jozyPoints--;
    jozyPointsElement.textContent = jozyPoints;
    playSound('Scoreboard_Images_And_Music/Awww.mp3');
}
