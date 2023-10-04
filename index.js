let audioPlayers = document.querySelectorAll(".audio-player");

audioPlayers.forEach((player) => {
  let audio = player.querySelector(".audio-element");
  let playPauseButton = player.querySelector(".playPauseButton");
  let progress = player.querySelector(".progress");

  playPauseButton.addEventListener("click", function () {
    if (audio.paused) {
      // pause all other audios and reset buttons to "Play"
      document.querySelectorAll(".audio-element").forEach((el) => {
        el.pause();
        if (el !== audio) {
          el
            .closest(".audio-player")
            .querySelector(".playPauseButton").textContent = "Play";
        }
      });

      audio.play();
      playPauseButton.textContent = "Pause";
    } else {
      audio.pause();
      playPauseButton.textContent = "Play";
    }
  });

  audio.addEventListener("timeupdate", function () {
    let position = audio.currentTime / audio.duration;
    progress.style.width = position * 100 + "%";
    console.log(progress.style.width);
  });

  audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    audio.pause();
    let playPauseButton = audio.closest('.audio-player').querySelector('.playPauseButton');
    playPauseButton.textContent = "Play";
});

  player.querySelector(".progress-bar").addEventListener("click", function (e) {
    let rect = this.getBoundingClientRect();
    let clickPosition = (e.clientX - rect.left) / rect.width;
    audio.currentTime = clickPosition * audio.duration;
  });
});
