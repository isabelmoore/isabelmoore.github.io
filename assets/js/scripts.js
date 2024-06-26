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
            }, 600);
        }
    }

    let isAlive;

    function startGame() {
        gameContainer.style.display = "block";
        startButton.style.display = "none";
        jumpButton.style.display = "inline-block"; // Show the jump button

        isAlive = setInterval(function () {
            // get current dino Y position
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

            // get current cactus X position
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

            // detect collision
            if (cactusLeft < 90 && cactusLeft > 0 && dinoTop >= 120) {
                alert("Game Over!");
                clearInterval(isAlive);
                gameContainer.style.display = "none";
                startButton.style.display = "inline-block";
                jumpButton.style.display = "none"; // Hide the jump button
            }
        }, 10);

        document.addEventListener("keydown", function (event) {
            if (event.code === "Space") {
                jump();
            }
        });

        jumpButton.addEventListener("click", jump);
    }

    startButton.addEventListener("click", startGame);
});
