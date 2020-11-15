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

//current audio
let indexAudio = 2;
const audio = new Audio(audios[indexAudio].url);

const playAudio = () => {
  if (audio.paused) {
    audio.play();
    playButton.classList.add("fa-pause");
    playButton.classList.remove("fa-play");

    intervalId = setInterval(() => {
      const timeRemaining = document.querySelector("#time");

      //m:ss format
      const min = Math.floor((audio.duration - audio.currentTime) / 60);
      const sec = Math.floor((audio.duration - audio.currentTime) % 60);

      //show time remaining
      timeRemaining.innerHTML = `
    -${min}:${sec / 10 >= 1 ? sec : `0${sec}`}
    `;

      //reset when audio ends
      if (audio.currentTime === audio.duration) {
        playButton.classList.add("fa-play");
        playButton.classList.remove("fa-pause");
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
