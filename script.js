/** VIDEO */
const videoContainer = document.querySelector(".video-container"),
  mainVideo = videoContainer.querySelector("video"),
  videoTimeline = videoContainer.querySelector(".video-timeline"),
  progressBar = videoContainer.querySelector(".progress-bar"),
  volumeBtn = videoContainer.querySelector(".volume i"),
  volumeSlider = videoContainer.querySelector(".left input"),
  currentVidTime = videoContainer.querySelector(".current-time"),
  videoDuration = videoContainer.querySelector(".video-duration"),
  skipBackward = videoContainer.querySelector(".skip-backward i"),
  skipForward = videoContainer.querySelector(".skip-forward i"),
  playPauseBtn = videoContainer.querySelector(".play-pause i"),
  speedBtn = videoContainer.querySelector(".playback-speed span"),
  speedOptions = videoContainer.querySelector(".speed-options"),
  picInPicBtn = videoContainer.querySelector(".pic-in-pic span"),
  fullScreenBtn = videoContainer.querySelector(".fullscreen i");

let timer;

/* Author: CodingNepal
Date: 27 Jul 2022
Title of source code: Build A Custom Video Player in HTML CSS & JavaScript
Type: source code
Web address: https://www.youtube.com/watch?v=-r9TTW0D3t4&ab_channel=CodingNepal */

const hideControls = () => {
  if (mainVideo.paused) return;
  timer = setTimeout(() => {
    videoContainer.classList.remove("show-controls");
  }, 3000);
};

hideControls();

videoContainer.addEventListener("mousemove", () => {
  videoContainer.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

mainVideo.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let percent = (currentTime / duration) * 100;

  // passing percent as progress bar width
  progressBar.style.width = `${percent}%`;

  currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", (e) => {
  videoDuration.innerText = formatTime(e.target.duration);
});

videoTimeline.addEventListener("click", (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

const draggableProgressBar = (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  currentVidTime.innerText = formatTime(mainVideo.currentTime);
};

videoTimeline.addEventListener("mousedown", () => {
  videoTimeline.addEventListener("mousemove", draggableProgressBar);
});

videoContainer.addEventListener("mouseup", () => {
  videoTimeline.removeEventListener("mousemove", draggableProgressBar);
});

videoTimeline.addEventListener("mousemove", (e) => {
  const progressTime = videoTimeline.querySelector("span");
  let offsetX = e.offsetX;
  progressTime.style.left = `${offsetX}px`;
  let timelineWidth = videoTimeline.clientWidth;
  let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
  progressTime.innerText = formatTime(percent);
});

/** Left */
volumeBtn.addEventListener("click", () => {
  if (!volumeBtn.classList.contains("fa-volume-high")) {
    mainVideo.volume = 0.5;
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  } else {
    mainVideo.volume = 0.0;
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", (e) => {
  // passing slider value as video volume
  mainVideo.volume = e.target.value;
  // if slider is 0, change icon to mute icon
  if (e.target.value == 0) {
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  }
});

/** Center */
skipBackward.addEventListener("click", () => {
  mainVideo.currentTime -= 5;
});

playPauseBtn.addEventListener("click", () => {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

// Changing icon to play/pause if video is pause/play
mainVideo.addEventListener("play", () => {
  playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause", () => {
  playPauseBtn.classList.replace("fa-pause", "fa-play");
});

skipForward.addEventListener("click", () => {
  mainVideo.currentTime += 5;
});

/** Right */
speedBtn.addEventListener("click", () => {
  speedOptions.classList.toggle("show");
});

speedOptions.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", () => {
    mainVideo.playbackRate = option.dataset.speed;
    speedOptions.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

// Hide speed options on document click
document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "SPAN" ||
    e.target.className !== "material-symbols-rounded"
  ) {
    speedOptions.classList.remove("show");
  }
});

picInPicBtn.addEventListener("click", () => {
  mainVideo.requestPictureInPicture();
});

/* Author: Volodymyr Zhyliaev
Date: 3 Mar 2024
Title of source code: Creating a Custom Video Player with HTML5 and JavaScript
Type: source code
Web address: https://volodymyrzh.medium.com/creating-a-custom-video-player-with-html5-and-javascript-9c1a776c4865 */

fullScreenBtn.addEventListener("click", () => {
  videoContainer.classList.toggle("fullscreen");
  if (document.fullscreenElement) {
    fullScreenBtn.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  }
  fullScreenBtn.classList.replace("fa-expand", "fa-compress");
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
} else if (videoContainer.mozRequestFullScreen) { /* Firefox */
    videoContainer.mozRequestFullScreen();
} else if (videoContainer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    videoContainer.webkitRequestFullscreen();
} else if (videoContainer.msRequestFullscreen) { /* IE/Edge */
    videoContainer.msRequestFullscreen();
}
});

/** QUIZ*/
const quizContainer = document.querySelector(".quiz-container"),
  quizTitle = quizContainer.querySelector(".quiz-title"),
  quizQuestion = quizContainer.querySelector(".quiz-question"),
  quizAnswers = quizContainer.querySelector(".quiz-answers"),
  quizFeedback = quizContainer.querySelector(".quiz-feedback"),
  continueButton = quizContainer.querySelector(".continue-btn");

let currQuizIndex = 0;

mainVideo.addEventListener("timeupdate", () => {
  if (
    currQuizIndex < quizData.length &&
    mainVideo.currentTime >= quizData[currQuizIndex].quizStartAt
  ) {
    mainVideo.pause();
    displayQuiz(quizData[currQuizIndex]);
  }
});

/* Author: GreatStack
Date: 15 Mar 2023
Title of source code: How To Make Quiz App Using JavaScript | Build Quiz App With HTML CSS & JavaScript
Type: source code
Web address: https://www.youtube.com/watch?v=PBcqGxrr9g8&ab_channel=GreatStack */

const displayQuiz = (quiz) => {
  resetState();

  let quizNo = currQuizIndex + 1;
  quizQuestion.innerHTML = quizNo + " ." + quiz.question;
  quizTitle.textContent = quiz.title;
  quizFeedback.textContent = "";

  quiz.answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.innerHTML = answer.text;
    answerButton.classList.add("answer-btn");
    quizAnswers.appendChild(answerButton);
    if (answer.correct) {
      answerButton.dataset.correct = answer.correct;
    }
    answerButton.addEventListener("click", checkAnswer);
  });

  quizContainer.style.display = "block";
};

const resetState = () => {
  continueButton.style.display = "none";
  while (quizAnswers.firstChild) {
    quizAnswers.removeChild(quizAnswers.firstChild);
  }
}

const checkAnswer = (e) => {
  const selectedAnswer = e.target;
  const isCorrect = selectedAnswer.dataset.correct === "true";
  if (isCorrect) {
    selectedAnswer.classList.add("bgr-correct");
    quizFeedback.textContent = quizData[currQuizIndex].feedback.correct;
    quizFeedback.classList.remove("color-incorrect");
    quizFeedback.classList.add("color-correct");
    quizFeedback.style.display = "block";
  } else {
    selectedAnswer.classList.add("bgr-incorrect");
    quizFeedback.textContent = quizData[currQuizIndex].feedback.incorrect;
    quizFeedback.classList.remove("color-correct");
    quizFeedback.classList.add("color-incorrect");
    quizFeedback.style.display = "block";
  }
  Array.from(quizAnswers.children).forEach((answerButton) => {
    if (answerButton.dataset.correct === "true") {
      answerButton.classList.add("bgr-correct");
    }
    answerButton.disabled = true;
  });
  continueButton.style.display = "block";
  continueButton.addEventListener("click", continueVideo);
};

const continueVideo = () => {
  quizContainer.style.display = "none";
  mainVideo.play();
  currQuizIndex++;
};
