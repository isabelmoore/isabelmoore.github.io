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
let cactus = document.getElementById('cactus');

const cactusTextures = [
    { src: '/assets/cacti/cactus2.png', width: 20, height: 30 },
    { src: '/assets/cacti/cactus3.png', width: 20, height: 30 },
    { src: '/assets/cacti/doubleCactus.png', width: 30, height: 25 },
    { src: '/assets/cacti/tripleCactus.png', width: 30, height: 25 }
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
let cactusIndex = 0;
let birdTextureIndex = 0;
let cactusInView = false;

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

    // Check if the cactus is in view and count frames
    let cactusRect = cactus.getBoundingClientRect();
    if (cactusRect.right > 0 && cactusRect.left < window.innerWidth) {
        if (!cactusInView) {
            cactusInView = true;
            cactusFramesVisible = 0;
        }
        cactusFramesVisible++;
    } else if (cactusInView) {
        cactusInView = false;
        console.log('Cactus was in view for:', cactusFramesVisible, 'frames');
        resetCactus();
    }
}

function resetCactus() {
    cactusIndex = Math.floor(Math.random() * cactusTextures.length);
    setCactusTexture();
    cactus.style.left = '580px';
    cactusFramesVisible = 0;
}

function setBirdTexture() {
    birdTextureIndex = (birdTextureIndex + 1) % birdTextures.length;
    bird.style.backgroundImage = `url(${birdTextures[birdTextureIndex]})`;
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
    let birdRect = bird.getBoundingClientRect();

    if (
        (doggoRect.x < cactusRect.x + cactusRect.width &&
        doggoRect.x + doggoRect.width > cactusRect.x &&
        doggoRect.y < cactusRect.y + cactusRect.height &&
        doggoRect.y + doggoRect.height > cactusRect.y) ||
        (doggoRect.x < birdRect.x + birdRect.width &&
        doggoRect.x + doggoRect.width > birdRect.x &&
        doggoRect.y < birdRect.y + birdRect.height &&
        doggoRect.y + doggoRect.height > birdRect.y)
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
    bird.style.animation = 'none';
}

function animateDoggo() {
    if (score % 5 === 0) { // Change doggo animation frame every few frames
        doggoTextureIndex = (doggoTextureIndex + 1) % doggoTextures.length;
        doggo.style.backgroundImage = `url(${doggoTextures[doggoTextureIndex]})`;
    }
}

function animateBird() {
    if (score % 20 === 0) { // Change bird animation frame every few frames
        setBirdTexture();
    }
}

function playSound(soundFileName) {
    const audio = new Audio(`/assets/sounds/${soundFileName}`);
    audio.play();
}
