var span = document.querySelector("span");
var btn = document.querySelector("button");

let countdown = 15;
let timer = 0;
let dowload = false;

const Countdown = (startTime) => {
  if (timer <= startTime) {
    countdown--;
    span.textContent = countdown;
    timer = startTime + 1000;
  }
  if (countdown === 0) {
    dowload = true;
    btn.removeAttribute("disabled");
    btn.classList.add("active");
    btn.addEventListener("click", function () {
      window.location.href = "https://www.tiktok.com/foryou";
    });
  }
  if (countdown > 0) {
    window.requestAnimationFrame(Countdown);
  }
};

requestAnimationFrame(Countdown);
