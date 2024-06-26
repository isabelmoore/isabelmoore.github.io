document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById("start-button");
    const jumpButton = document.getElementById("jump-button");
    const gameContainer = document.querySelector(".game");
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");

    function jump() {
        if (!dino.classList.contains("jump")) {
            dino.classList.add("jump");

            setTimeout(function () {
                dino.classList.remove("jump");
            }, 900); // Match the jump animation duration
        }
    }

    let isAlive;

    function startGame() {
        gameContainer.style.display = "block";
        startButton.style.display = "none";
        jumpButton.style.display = "inline-flex";

        isAlive = setInterval(function () {
            // get current dino Y position
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

            // get current cactus X position
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

            // detect collision
            if (cactusLeft < 90 && cactusLeft > 0 && dinoTop >= 120) {
                // collision
                alert("Game Over, Sowwy!");
                clearInterval(isAlive);
                gameContainer.style.display = "none";
                startButton.style.display = "inline-flex";
                jumpButton.style.display = "none";
            }
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
