var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var time_hover = document.querySelector(".time_hover");

// Tính độ dài của progress-bar
var progressBarWidth = progressBar.clientWidth;
var isDrag = false; //cắm cờ
var initialClientX;
var initialValue = 0;
var value;
var handleUpdateCalue = function (value) {
  progress.style.width = `${value}%`;
};

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    var offsetX = e.offsetX;
    value = (offsetX * 100) / progressBarWidth;
    initialValue = value;
    initialClientX = e.clientX;
    isDrag = true;
    handleUpdateCalue(value);
    seekAudio(value); // Tua nhạc khi click
  }
});

progressSpan.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    e.stopPropagation();
    isDrag = true;
    initialClientX = e.clientX;
  }
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    value = (moveWidth * 100) / progressBarWidth;
    value = initialValue + value;
    if (value < 0) {
      value = 0;
    }
    if (value > 100) {
      value = 100;
    }
    handleUpdateCalue(value);
    seekAudio(value); // Cập nhật thời gian khi kéo thanh tiến trình
  }
});

document.addEventListener("mouseup", function (e) {
  isDrag = false;
  initialValue = value;
});

// Xây dựng trình phát nhạc
var audio = document.querySelector(".audio");
var playBtn = document.querySelector(".play-btn");

var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds -= mins * 60;
  seconds = Math.floor(seconds);
  return `${mins < 10 ? `0${mins}` : mins}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

var durationEl = progressBar.nextElementSibling;
var currentEl = progressBar.previousElementSibling;

audio.addEventListener("loadeddata", function () {
  durationEl.innerText = getTime(audio.duration);
});

var playBtnIcon = `<i class="fa-solid fa-play"></i>`;
var pauseBtnIcon = `<i class="fa-solid fa-pause"></i>`;

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseBtnIcon;
  } else {
    audio.pause();
    this.innerHTML = playBtnIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  currentEl.innerText = getTime(audio.currentTime);
  var value = (audio.currentTime * 100) / audio.duration;
  handleUpdateCalue(value);
});

// Hàm tua nhạc
var seekAudio = function (value) {
  if (!isNaN(audio.duration)) {
    var newTime = (audio.duration * value) / 100;
    audio.currentTime = newTime; // Cập nhật thời gian của audio
  }
};

// khi nhạc hết chạy lại từ đầu
audio.addEventListener("ended", function () {
  playBtn.innerHTML = playBtnIcon;
  audio.currentTime = 0;
  handleUpdateCalue(0); // Đặt lại thanh tiến trình về 0
  currentEl.innerText = getTime(0); // Đặt lại thời gian hiện tại là 0
});

progressBar.addEventListener("mousemove", function (e) {
  var offsetX = e.offsetX;
  var hoverValue = (offsetX * 100) / progressBar.clientWidth;

  // Tính thời gian tương ứng
  var hoverTime = (audio.duration * hoverValue) / 100;
  time_hover.innerText = getTime(hoverTime);
  time_hover.style.left = `${offsetX}px`;
  time_hover.style.display = "block";
  progressSpan.addEventListener("mousemove", function (e) {
    e.stopPropagation();
  });
});

progressBar.addEventListener("mouseleave", function (e) {
  time_hover.style.display = "none"; // Ẩn tooltip khi không hover
});
