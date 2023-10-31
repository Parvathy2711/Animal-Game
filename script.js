score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        croc = document.querySelector('.croc');
        croc.classList.add('animateCroc');
        setTimeout(() => {
            croc.classList.remove('animateCroc')
        }, 700);
    }
    if (e.keyCode == 39) {
        croc = document.querySelector('.croc');
        crocX = parseInt(window.getComputedStyle(croc, null).getPropertyValue('left'));
        croc.style.left = crocX + 112 + "px";
    }
    if (e.keyCode == 37) {
        croc = document.querySelector('.croc');
        crocX = parseInt(window.getComputedStyle(croc, null).getPropertyValue('left'));
        croc.style.left = (crocX - 112) + "px";
    }
}

setInterval(() => {
    croc = document.querySelector('.croc');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(croc, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(croc, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleSnake')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCount.innerHTML = "Your Score: " + score
}
