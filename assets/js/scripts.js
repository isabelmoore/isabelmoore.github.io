document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById("start-button");
    const gameContainer = document.querySelector(".game");
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");

    function jump() {
        if (!dino.classList.contains("jump")) {
            dino.classList.add("jump");

            setTimeout(function () {
                dino.classList.remove("jump");
            }, 300);
        }
    }

    let isAlive;

    function startGame() {
        gameContainer.style.display = "block";
        startButton.style.display = "none";

        isAlive = setInterval(function () {
            // get current dino Y position
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

            // get current cactus X position
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

            // detect collision
            if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
                // collision
                alert("Game Over!");
                clearInterval(isAlive);
                gameContainer.style.display = "none";
                startButton.style.display = "inline-block";
            }
        }, 10);

        document.addEventListener("keydown", function (event) {
            if (event.code === "Space") {
                jump();
            }
        });
    }

    startButton.addEventListener("click", startGame);
});
