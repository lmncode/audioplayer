const audios = [
  {
    id: 0,
    url: "./Tamino_Indigo_Night.mp3",
    name: "Indigo Night",
    artist: "Tamino",
  },
  { id: 1, url: "./Habibi.mp3", name: "Habibi", artist: "tamino" },
  { id: 3, url: "./My_Way.mp3", name: "My Way", artist: "Ali Bakgor" },
];

const playButton = document.querySelector("#play i");
let intervalId;
let firstPlay = true;
const slider = document.querySelector(".slider");
slider.min = 0;
slider.value = 0;

//current audio
let indexAudio = 2;
const audio = new Audio(audios[indexAudio].url);
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
        playButton.classList.add("fa-play");
        playButton.classList.remove("fa-pause");
        slider.value = 0;
        audio.currentTime = 0;
        formatTime(audio);
        clearInterval(intervalId);
      }
    }, 1000);
  } else {
    audio.pause();
    playButton.classList.add("fa-play");
    playButton.classList.remove("fa-pause");
    clearInterval(intervalId);
  }
};

playButton.addEventListener("click", playAudio);

slider.addEventListener("input", () => {
  audio.currentTime = slider.value;
  formatTime(audio);
});

const formatTime = (audio) => {
  const timeRemaining = document.querySelector("#time");
  //m:ss format
  const min = Math.floor((audio.duration - audio.currentTime) / 60);
  const sec = Math.floor((audio.duration - audio.currentTime) % 60);
  //show time remaining
  timeRemaining.innerHTML = `
    -${min}:${sec / 10 >= 1 ? sec : `0${sec}`}
    `;
};
