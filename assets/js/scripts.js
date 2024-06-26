document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById("start-button");
    const jumpButton = document.getElementById("jump-button");
    const gameContainer = document.querySelector(".game");
    const dino = document.getElementById("dino");

    function jump() {
        if (!dino.classList.contains("jump")) {
            dino.classList.add("jump");

            setTimeout(function () {
                dino.classList.remove("jump");
            }, 900); // Match the jump animation duration
        }
    }

    let isAlive;
    let cactusInterval;

    function createCactus() {
        const cactus = document.createElement('div');
        cactus.classList.add('cactus');
        cactus.style.left = gameContainer.offsetWidth + 'px'; // Start at the right edge of the game container
        gameContainer.appendChild(cactus);

        cactus.addEventListener('animationend', () => {
            cactus.remove();
        });
    }

    function startGame() {
        gameContainer.style.display = "block";
        startButton.style.display = "none";
        jumpButton.style.display = "inline-flex";

        createCactus(); // Create the first cactus

        cactusInterval = setInterval(createCactus, 2000); // Create a new cactus every 2 seconds

        isAlive = setInterval(function () {
            // get current dino Y position
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

            // get all cacti
            let cacti = document.querySelectorAll('.cactus');

            cacti.forEach(cactus => {
                let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

                // detect collision
                if (cactusLeft < 90 && cactusLeft > 0 && dinoTop >= 120) {
                    // collision
                    alert("Game Over!");
                    clearInterval(isAlive);
                    clearInterval(cactusInterval);
                    gameContainer.style.display = "none";
                    startButton.style.display = "inline-flex";
                    jumpButton.style.display = "none";

                    // Remove all cacti
                    cacti.forEach(cactus => cactus.remove());
                }
            });
        }, 10);
    }

    startButton.addEventListener("click", startGame);
    jumpButton.addEventListener("click", jump);

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            jump();
        }
    });
});
