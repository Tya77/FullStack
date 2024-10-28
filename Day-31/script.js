const btn = document.querySelector(".btn");
const searchBox = document.querySelector(".search-box");
const action = document.querySelector(".action");
const result = document.querySelector(".result");

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.lang = "vi-VN";
recognition.continuous = false;

btn.addEventListener("click", function () {
  action.innerHTML = "Hãy nói theo cách của bạn";
  recognition.start();
});

recognition.onend = function () {
  action.innerHTML = "Đã nói xong. Hy vọng kết quả như ý bạn";
};

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript.trim().toLowerCase();
  var handled = false;

  if (transcript === "google") {
    window.location.href = "https://www.google.com";
    handled = true;
  } else if (transcript === "facebook") {
    window.location.href = "https://www.facebook.com";
    handled = true;
  } else if (transcript === "youtube") {
    window.location.href = "https://www.youtube.com";
    handled = true;
  } else if (transcript === "google drive") {
    window.location.href = "https://drive.google.com";
    handled = true;
  } else if (transcript === "google maps" || transcript === "bản đồ") {
    window.location.href = "https://maps.google.com";
    handled = true;
  } else if (
    transcript.includes("chỉ đường") ||
    transcript.includes("tới") ||
    transcript.includes("đường tới")
  ) {
    const destination = transcript
      .replace("chỉ đường", "")
      .replace("tới", "")
      .replace("đường tới", "")
      .trim();
    window.location.href = `https://maps.google.com/?q=${destination}`;
    handled = true;
  } else if (transcript.includes("bài hát")) {
    const song = transcript.replace("bài hát", "").trim();
    window.location.href = `https://mp3.zing.vn/tim-kiem/bai-hat.html?q=${song}`;
    handled = true;
  } else if (
    transcript.includes("video") ||
    transcript.includes("mở video") ||
    transcript.includes("xem video")
  ) {
    const video = transcript
      .replace("video", "")
      .replace("mở video", "")
      .replace("xem video", "")
      .trim();
    window.location.href = `https://www.youtube.com/results?search_query=${video}`;
    handled = true;
  }
  if (handled) {
    result.innerHTML = "Đã thực hiện xong";
  } else {
    result.innerHTML = "Không thực hiện được yêu cầu";
  }
};
