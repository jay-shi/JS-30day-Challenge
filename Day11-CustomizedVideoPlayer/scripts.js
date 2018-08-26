/**
 * select elements
 */
const video = document.querySelector(".player__video");
const playButton = document.querySelector("button.player__button");
const volumeInput = document.querySelector("input[name='volume']");
const speedInput = document.querySelector("input[name='playbackRate']");
const forwardButton = document.querySelector("button[data-skip='25']");
const backwardButton = document.querySelector("button[data-skip='-10']");
const progressBar = document.querySelector("div.progress__filled");
const wholeProgressBar = document.querySelector('div.progress');


let isPaused = true;
let isMouseDown = false;

function togglePlay() {
    isPaused = !isPaused;
    if(isPaused) {
        video.pause();
        playButton.textContent = "►";
    }else {
        video.play();
        playButton.textContent = "||";
    }
}

function adjustVolume() {
    video.volume = this.value;
}

function adjustSpeed() {
    video.playbackRate = this.value;
}

function forward() {
    video.currentTime += 25;
}

function backward() {
    video.currentTime -= 10;
}

function handleTimeChange() {
    progressBar.style.flexBasis = `${this.currentTime/this.duration * 100}%`;
}

function scrub(e) {
    if(!isMouseDown) return;
    let curTime = e.offsetX / this.offsetWidth * video.duration;
    video.currentTime = curTime;
}


/**
 * event listener
 */
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleTimeChange);
playButton.addEventListener('click', togglePlay);
volumeInput.addEventListener('change', adjustVolume);
volumeInput.addEventListener('mousemove', adjustVolume);
speedInput.addEventListener('change', adjustSpeed);
speedInput.addEventListener('mousemove', adjustSpeed);
forwardButton.addEventListener('click', forward);
backwardButton.addEventListener('click', backward);
wholeProgressBar.addEventListener('mousemove', scrub);
wholeProgressBar.addEventListener('click', scrub);
wholeProgressBar.addEventListener('mousedown', ()=>{
    isMouseDown = true;
});
wholeProgressBar.addEventListener('mouseup', ()=>{
    isMouseDown = false;
});
