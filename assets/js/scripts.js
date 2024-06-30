// script.js
document.getElementById('start-button').addEventListener('click', function() {
    gameActive = true;
    document.getElementById('jump-button').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.querySelector('.game').style.display = 'block';
    this.style.display = 'none';
    startGame();
});

document.getElementById('jump-button').addEventListener('click', jump);

let score = 0;
let gameActive = false;
let doggo = document.getElementById('doggo');
let ground = document.getElementById('ground');
let cloud = document.getElementById('cloud');
let tree = document.getElementById('tree');
let moon = document.getElementById('moon');
let bird = document.getElementById('bird');

const cactusTextures = [
    { src: '/assets/cacti/cactus2.png', width: 40, height: 50 },
    { src: '/assets/cacti/cactus3.png', width: 40, height: 50 },
    { src: '/assets/cacti/doubleCactus.png', width: 80, height: 50 },
    { src: '/assets/cacti/tripleCactus.png', width: 120, height: 50 }
];

const doggoTextures = [
    '/assets/doggo/dogOne.png',
    '/assets/doggo/dogTwo.png',
    '/assets/doggo/dogThree.png',
    '/assets/doggo/dogFour.png',
    '/assets/doggo/dogFive.png',
    '/assets/doggo/dogSix.png',
    '/assets/doggo/dogSeven.png',
    '/assets/doggo/dogEight.png'
];

const birdTextures = [
    '/assets/doggo/flyer1.png',
    '/assets/doggo/flyer2.png'
];

let doggoTextureIndex = 0;
let cactus = document.getElementById('cactus');
let cactusIndex = 0;
let birdTextureIndex = 0;

function startGame() {
    score = 0;
    setCactusTexture();
    setBirdTexture();
    cactus.style.animation = 'block 2s infinite linear';
    ground.style.animation = 'moveGround 5s linear infinite';
    cloud.style.animation = 'moveCloud 10s linear infinite';
    tree.style.animation = 'moveTree 8s linear infinite';
    moon.style.animation = 'moveMoon 20s linear infinite';
    bird.style.animation = 'moveBird 5s linear infinite';
    updateGame();
}

function updateGame() {
    if (!gameActive) return;
    requestAnimationFrame(updateGame);
    checkCollisions();
    animateDoggo();
    animateBird();
    score++;
    document.getElementById('score').innerText = 'Score: ' + Math.floor(score / 10);

    // Change cactus texture
    if (score % 500 === 0) {
        cactusIndex = (cactusIndex + 1) % cactusTextures.length;
        setCactusTexture();
    }
}

function setCactusTexture() {
    const texture = cactusTextures[cactusIndex];
    cactus.style.backgroundImage = `url(${texture.src})`;
    cactus.style.width = `${texture.width}px`;
    cactus.style.height = `${texture.height}px`;
}

function jump() {
    if (!doggo.classList.contains('jump')) {
        doggo.classList.add('jump');
        setTimeout(function() {
            doggo.classList.remove('jump');
        }, 900);
        playSound('jump.wav');
    }
}

function checkCollisions() {
    let doggoRect = doggo.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();

    if (
        doggoRect.x < cactusRect.x + cactusRect.width &&
        doggoRect.x + doggoRect.width > cactusRect.x &&
        doggoRect.y < cactusRect.y + cactusRect.height &&
        doggoRect.y + doggoRect.height > cactusRect.y
    ) {
        gameOver();
    }
}

function gameOver() {
    gameActive = false;
    playSound('die.wav');
    alert('Game Over! Your score was: ' + Math.floor(score / 10));
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('jump-button').style.display = 'none';
    document.querySelector('.game').style.display = 'none';
    resetAnimations();
    cactus.style.left = '580px';
}

function resetAnimations() {
    cactus.style.animation = 'none';
    ground.style.animation = 'none';
    cloud.style.animation = 'none';
    tree.style.animation = 'none';
    moon.style.animation = 'none';
}

function animateDoggo() {
    if (score % 5 === 0) { // Change doggo animation frame every few frames
        doggoTextureIndex = (doggoTextureIndex + 1) % doggoTextures.length;
        doggo.style.backgroundImage = `url(${doggoTextures[doggoTextureIndex]})`;
    }
}

function playSound(soundFileName) {
    const audio = new Audio(`/assets/sounds/${soundFileName}`);
    audio.play();
}