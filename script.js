const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const easyBtn = document.querySelector(".easy");
const medBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var difficulty = 0;
function changeText(){
    if (difficulty === 0){
        originText.innerHTML = "a b c d e f g"
    }
    else if (difficulty === 1){
        originText.innerHTML = "Let the bananas rain from the sky. It is time to be a monkey. Great times are coming my fellow apes"
    }
    else{
        originText.innerHTML= "Now you type like you have never typed before. Type and never stop typing. Type like your fingers are the feet of the late great Mohammad Ali or the legendary Micheal Jackson. Complete this feet and you shall be crowned the typing challenge. Wow! you are really going at this!!"
    }
};
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if(time <= 9){
        time = "0" + time;
    }
    return time;

}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime = leadingZero(timer[0]) + ":" +leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3] ++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor(timer[3]/100) - (timer[0]*60);
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.innerHTML.substring(0, textEntered.length);

    if (textEntered == originText.innerHTML){
        testWrapper.style.borderColor = "#429890";
        clearInterval(interval);
    }
    else if (textEntered == originTextMatch){
        testWrapper.style.borderColor = "#65CCf3";
    }
    else{
        testWrapper.style.borderColor = "#E95D0F";
    }
}

// Start the timer:
function start(){
    let textEnteredLength = testArea.value.length;

    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    console.log("reset button has been pressed");
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
easyBtn.addEventListener("click", ()=> {
    difficulty = 0;
    changeText();
}, false);
medBtn.addEventListener('click', ()=> {
    difficulty = 1;
    changeText();
}, false);
hardBtn.addEventListener('click', ()=> {
    difficulty = 2;
    changeText();
}, false);
document.addEventListener('DOMContentLoaded', changeText, false);