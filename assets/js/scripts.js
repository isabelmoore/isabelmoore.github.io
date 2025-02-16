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
let cloud2 = document.getElementById('cloud2'); // New cloud
let tree = document.getElementById('tree');
let moon = document.getElementById('moon');
let bird = document.getElementById('bird');
let cactus = document.getElementById('cactus');
let tumbleweed = document.getElementById('tumbleweed');

const cactusTextures = [
    { src: '/assets/cacti/cactus2.png', width: 20, height: 30 },
    { src: '/assets/cacti/cactus3.png', width: 20, height: 30 },
    { src: '/assets/cacti/doubleCactus.png', width: 40, height: 30 },
    { src: '/assets/cacti/tripleCactus.png', width: 40, height: 30 }
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


const tumbleTextures = [
    '/assets/tumbleweed/tumble11.png',
    '/assets/tumbleweed/tumble10.png',
    '/assets/tumbleweed/tumble9.png',
    '/assets/tumbleweed/tumble8.png',
    '/assets/tumbleweed/tumble7.png',
    '/assets/tumbleweed/tumble6.png',
    '/assets/tumbleweed/tumble5.png',
    '/assets/tumbleweed/tumble4.png',
    '/assets/tumbleweed/tumble3.png',
    '/assets/tumbleweed/tumble2.png',
    '/assets/tumbleweed/tumble1.png'
];

const birdTextures = [
    '/assets/doggo/flyer1.png',
    '/assets/doggo/flyer2.png'
];

let doggoTextureIndex = 0;
let cactusIndex = 0;
let birdTextureIndex = 0;
let cactusFramesVisible = 0;
let cactusInView = false;
let startFrame = 0;
let tumbleTextureIndex = 0;

function startGame() {
    score = 0;
    setCactusTexture();
    setBirdTexture();
    setTumbleweedTexture();
    cactus.style.animation = 'block 4s infinite linear';
    ground.style.animation = 'moveGround 5s linear infinite';
    cloud.style.animation = 'moveCloud 10s linear infinite';
    cloud2.style.animation = 'moveCloud2 12s linear infinite';
    tree.style.animation = 'moveTree 8s linear infinite';
    moon.style.animation = 'moveMoon 20s linear infinite';
    bird.style.animation = 'moveBird 6s linear infinite';
    tumbleweed.style.animation = 'moveTumbleweed 2s linear infinite';
    updateGame();
}

function updateGame() {
    if (!gameActive) return;
    requestAnimationFrame(updateGame);
    checkCollisions();
    animateDoggo();
    animateBird();
    animateTumbleweed();
    score++;
    document.getElementById('score').innerText = 'Score: ' + Math.floor(score / 10);
    console.log('Cactus was in view for:', score, 'frames');

    if (score % 120 === 0) {
        cactusIndex = Math.floor(Math.random() * cactusTextures.length);
        setCactusTexture();
    }
}

function resetCactus() {
    cactusIndex = Math.floor(Math.random() * cactusTextures.length);
    setCactusTexture();
    cactus.style.left = '580px';
    cactusFramesVisible = 0;
}

function setCactusTexture() {
    const texture = cactusTextures[cactusIndex];
    cactus.style.backgroundImage = `url(${texture.src})`;
    cactus.style.width = `${texture.width}px`;
    cactus.style.height = `${texture.height}px`;
    cactus.style.backgroundSize = `${texture.width}px ${texture.height}px`;
}

function setBirdTexture() {
    birdTextureIndex = (birdTextureIndex + 1) % birdTextures.length;
    bird.style.backgroundImage = `url(${birdTextures[birdTextureIndex]})`;
}

function setTumbleweedTexture() {
    tumbleTextureIndex = (tumbleTextureIndex + 1) % tumbleTextures.length;
    tumbleweed.style.backgroundImage = `url(${tumbleTextures[tumbleTextureIndex]})`;
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
    let tumbleweedRect = tumbleweed.getBoundingClientRect();

    // Adjust the rectangles by subtracting 10 pixels from width and height
    doggoRect = {
        x: doggoRect.x,
        y: doggoRect.y,
        width: doggoRect.width - 15,
        height: doggoRect.height - 15
    };

    cactusRect = {
        x: cactusRect.x,
        y: cactusRect.y,
        width: cactusRect.width - 10,
        height: cactusRect.height - 10
    };

    birdRect = {
        x: birdRect.x,
        y: birdRect.y,
        width: birdRect.width - 20,
        height: birdRect.height - 20
    };

    tumbleweedRect = {
        x: tumbleweedRect.x,
        y: tumbleweedRect.y,
        width: tumbleweedRect.width - 10,
        height: tumbleweedRect.height - 10
    };

    if (
        (doggoRect.x < cactusRect.x + cactusRect.width &&
        doggoRect.x + doggoRect.width > cactusRect.x &&
        doggoRect.y < cactusRect.y + cactusRect.height &&
        doggoRect.y + doggoRect.height > cactusRect.y) ||

        (doggoRect.x < birdRect.x + birdRect.width &&
        doggoRect.x + doggoRect.width > birdRect.x &&
        doggoRect.y < birdRect.y + birdRect.height &&
        doggoRect.y + doggoRect.height > birdRect.y) ||

        (doggoRect.x < tumbleweedRect.x + tumbleweedRect.width &&
        doggoRect.x + doggoRect.width > tumbleweedRect.x &&
        doggoRect.y < tumbleweedRect.y + tumbleweedRect.height &&
        doggoRect.y + doggoRect.height > tumbleweedRect.y)
    ) {
        gameOver();
    }
}


function gameOver() {
    gameActive = false;
    playSound('die.wav');
    alert('Game Over, Sowwy! Your score was: ' + Math.floor(score / 10));
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
    cloud2.style.animation = 'none';
    tree.style.animation = 'none';
    moon.style.animation = 'none';
    bird.style.animation = 'none';
    tumbleweed.style.animation = 'none';
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

function animateTumbleweed() {
    if (score % 5 === 0) { // Change bird animation frame every few frames
        setTumbleweedTexture();
    }
}

function playSound(soundFileName) {
    const audio = new Audio(`/assets/sounds/${soundFileName}`);
    audio.play();
}
