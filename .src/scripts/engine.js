let score = 0;
let time = 0;
let timer;

function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = score;
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById("time").textContent = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

const emojis = [
    "😒",
    "😒",
    "🤨",
    "🤨",
    "🥵",
    "🥵",
    "😡",
    "😡",
    "👹",
    "👹",
    "👻",
    "👻",
    "👾",
    "👾",
    "🤖",
    "🤖"
];
let openCards = [];


let shuffleEmojis  = emojis.sort(() => (Math.random() > 0.5 ? 2: -1));

for(let i=0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (!timer) { 
        startTimer();
    }

    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        updateScore(100); 
    } 
    else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        updateScore(-20); 
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        stopTimer();
        alert(`Win! 🎆\nTime: ${time}s\nScore: ${score}`);
    }
};
