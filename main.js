'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');




let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();

    } else {
        startGame();
    }
});

popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
})



function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        score++;
        palySound(carrotSound);
        updateScoreBoard();
        if (score === CARROT_COUNT) {

            finishGame(true);
        }

    } else if (target.matches('.bug')) {

        finishGame(false);

    }

}

function palySound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound) {
    sound.pause();
}
function finishGame(win) {
    started = false;
    stopGameTimer();
    hideGameBtn();
    stopSound(bgSound);
    if (win) {
        palySound(winSound);
    } else {
        palySound(bugSound);
    }
    showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOST');
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function startGame() {
    palySound(bgSound);
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameBtn();
    showPopUpWithText('REPLAY?');
    palySound(alertSound);
    stopSound(bgSound);
}

function showStopBtn() {
    const icon = document.querySelector('.play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function stopGameTimer() {
    clearInterval(timer)
}

function hideGameBtn() {
    gameBtn.style.visibility = 'hidden';
}

function showPopUpWithText(text) {
    popUp.classList.remove('pop-up--hide');
    popUpText.innerText = text;
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');

}

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    //벌레와 당근을 생성한 뒤 field에 추가해 줌.
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}


function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}




// 'use strict'

// const CARROT_SIZE = 80;
// const CARROT_COUNT = 5;
// const BUG_COUNT = 5;
// const GAME_DURATION_TIME = 5;
// const field = document.querySelector(".game__field");
// const fieldRect = field.getBoundingClientRect();
// const gameBtn = document.querySelector(".game__button");
// const gameTimer = document.querySelector('.game__timer');
// const gameScore = document.querySelector('.game__score');

// const popUp = document.querySelector('.pop-up');
// const popUpRefresh = document.querySelector('.pop-up__refresh');
// const popUpText = document.querySelector('.pop-up__message');

// let started = false;
// let score = 0;
// let timer = undefined;

// gameBtn.addEventListener('click', () => {
//     if (started) {
//         stopGame();
//     } else {
//         startGame();
//     }
//     started = !started;
// })

// function startGame() {
//     initGame();
//     showStopBtn();
//     showScoreAndTimer();
//     startTimer();
// }

// function stopGame() {
//     hideBtn();
//     stopTimer();
//     showPopUp('Replay?');

// }

// function hideBtn() {
//     gameBtn.style.visibility = 'hidden';
// }

// function stopTimer() {
//     clearInterval(timer);
// }

// function showPopUp(text) {
//     popUp.classList.remove('pop-up--hide');
//     popUpText.innerText = text;
// }

// function initGame() {
//     field.innerHTML = '';
//     gameScore.innerText = CARROT_COUNT;
//     addItem('carrot', CARROT_COUNT, 'img/carrot.png');
//     addItem('bug', BUG_COUNT, 'img/bug.png');
// }

// function showStopBtn() {
//     const icon = document.querySelector('.fa-play');
//     icon.classList.remove('fa-play');
//     icon.classList.add('fa-stop');
// }

// function showScoreAndTimer() {
//     gameTimer.style.visibility = 'visible';
//     gameScore.style.visibility = 'visible';
// }

// function startTimer() {
//     let remainingTimeSeconds = GAME_DURATION_TIME;
//     updateTimer(remainingTimeSeconds);
//     timer = setInterval(() => {
//         if (remainingTimeSeconds <= 0) {
//             clearInterval(timer);
//             return;
//         }
//         updateTimer(--remainingTimeSeconds);

//     }, 1000)

// }

// function updateTimer(sec) {
//     const minutes = Math.floor(sec / 60);
//     const seconds = sec % 60;
//     gameTimer.innerText = `${minutes}:${seconds}`;
// }

// function addItem(className, count, imgPath) {
//     for (let i = 0; i < count; i++) {
//         const x1 = fieldRect.width - CARROT_SIZE;
//         const y1 = fieldRect.height - CARROT_SIZE;
//         const item = document.createElement('img');
//         item.setAttribute('src', imgPath);
//         item.setAttribute('class', className);
//         item.style.position = 'absolute';
//         const x = Math.random() * x1;
//         const y = Math.random() * y1
//         item.style.left = `${x}px`
//         item.style.top = `${y}px`
//         field.appendChild(item);
//     }
// }