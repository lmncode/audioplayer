const audios = [
  {
    id: 0,
    url: "./audio/Tamino_Indigo_Night.mp3",
    name: "Indigo Night",
    artist: "Tamino",
    img: "./img/tamino1.jpg",
  },
  {
    id: 1,
    url: "./audio/Tamino_Habibi.mp3",
    name: "Habibi",
    artist: "tamino",
    img: "./img/tamino3.jpg",
  },
  {
    id: 3,
    url: "./audio/My_Way.mp3",
    name: "My Way",
    artist: "Ali Bakgor",
    img: "./img/ali.jpg",
  },
];

const playButton = document.querySelector("#play i");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const repeatButton = document.querySelector("#repeat i");
const randomButton = document.querySelector("#random i");
const name = document.querySelector("#name");
const artist = document.querySelector("#artist");
const bg = document.querySelector(".bg-image");
const detailsBg = document.querySelector(".details");

let intervalId;
let firstPlay = true;
let isRepeatActive = false;
let isRandomActive = false;
let randomIndex;
console.log(randomIndex);
const slider = document.querySelector(".slider");
slider.min = 0;
slider.value = 0;

//current audio
let indexAudio = 0;

let audio = new Audio(audios[indexAudio].url);

const playAudio = () => {
  if (firstPlay) {
    slider.max = audio.duration;
    firstPlay = false;
  }
  if (audio.paused) {
    audio.play();
    playButton.classList.add("fa-pause");
    playButton.classList.remove("fa-play");

    intervalId = setInterval(() => {
      formatTime(audio);
      slider.value = audio.currentTime;

      //reset when audio ends
      if (audio.currentTime === audio.duration) {
        if (isRandomActive) {
          randomIndex = Math.floor(Math.random() * 3);
        }
        if (isRepeatActive) {
          audio.play();
        } else {
          skipToNextAudio(randomIndex);
        }
        slider.value = 0;
        audio.currentTime = 0;
        formatTime(audio);
      }
    }, 1000);
  } else {
    pauseAudio();
  }
};

function pauseAudio() {
  audio.pause();
  playButton.classList.add("fa-play");
  playButton.classList.remove("fa-pause");
  clearInterval(intervalId);
}

//next audio
function skipToNextAudio(randomIndex = undefined) {
  console.log(randomIndex);
  //is random button active
  if (randomIndex !== undefined) {
    indexAudio = randomIndex;
  } else {
    indexAudio++;
    if (indexAudio === audios.length) {
      indexAudio = 0;
    }
  }
  pauseAudio();
  audio = new Audio(audios[indexAudio].url);

  //change bg image and details
  name.innerHTML = audios[indexAudio].name;
  artist.innerHTML = audios[indexAudio].artist;
  bg.style.backgroundImage = `url(${audios[indexAudio].img})`;
  detailsBg.style.backgroundImage = `url(${audios[indexAudio].img})`;
  firstPlay = true;
  setTimeout(() => {
    playAudio();
  }, 500);
}

//previous audio
function skipToPrevAudio() {
  if (indexAudio === 0) {
    return;
  }
  console.log(indexAudio);
  indexAudio--;
  pauseAudio();
  audio = new Audio(audios[indexAudio].url);

  //change bg image and details
  name.innerHTML = audios[indexAudio].name;
  artist.innerHTML = audios[indexAudio].artist;
  bg.style.backgroundImage = `url(${audios[indexAudio].img})`;
  detailsBg.style.backgroundImage = `url(${audios[indexAudio].img})`;

  firstPlay = true;
  setTimeout(() => {
    playAudio();
  }, 500);
}

const formatTime = (audio) => {
  const timeRemaining = document.querySelector("#time");
  //m:ss format
  const min = Math.floor((audio.duration - audio.currentTime) / 60);
  const sec = Math.floor((audio.duration - audio.currentTime) % 60);

  //show time remaining
  if (isNaN(min)) {
    timeRemaining.innerHTML = "0:00";
  } else {
    timeRemaining.innerHTML = `
    -${min}:${sec / 10 >= 1 ? sec : `0${sec}`}
    `;
  }
};

playButton.addEventListener("click", playAudio);
nextButton.addEventListener("click", () => {
  skipToNextAudio();
});
prevButton.addEventListener("click", skipToPrevAudio);

//change repeat button color
repeatButton.addEventListener("click", () => {
  if (isRepeatActive) {
    repeatButton.classList.remove("active");
  } else {
    repeatButton.classList.add("active");
  }
  isRepeatActive = !isRepeatActive;
});

//change random button color
randomButton.addEventListener("click", () => {
  if (isRandomActive) {
    randomButton.classList.remove("active");
  } else {
    randomButton.classList.add("active");
  }
  isRandomActive = !isRandomActive;
});

//update slider value
slider.addEventListener("input", () => {
  audio.currentTime = slider.value;
  formatTime(audio);
});
