var carousel = document.querySelector(".carousel");
var carouselInner = carousel.querySelector(".carousel-inner");
var carouselNav = document.querySelector(".carousel-nav");
var prevBtn = carouselNav.querySelector(".prev");
var nextBtn = carouselNav.querySelector(".next");
var dots = document.querySelectorAll(".dot");

// lấy danh sách các items
var carouselItems = carouselInner.children;

// tính chiều rộng của 1 item
var itemWidth = carouselInner.clientWidth; //trả về chiều rộng của 1 el

// tính tổng kích thước các items
var totalWidth = itemWidth * carouselItems.length;

// cập nhật css carausel inner
carouselInner.style.width = `${totalWidth}px`;

// Vị trí ban đầu
var position = 0;
var currentIndex = 0;
// lắng nghe sự kiện vào nút next
nextBtn.addEventListener("click", function () {
  // tính toạ độ

  if (Math.abs(position) < totalWidth) {
    position -= itemWidth;

    // cập nhật css vào caroursel-inner để chuyển slide
    carouselInner.style.translate = `${position}px`;
    currentIndex++;
  } else {
    position = 0; // Quay lại slide đầu tiên
    currentIndex = 0;
  }
  updateDot(currentIndex);
});

prevBtn.addEventListener("click", function () {
  if (Math.abs(position) > 0) {
    position += itemWidth;
    carouselInner.style.translate = `${position}px`;
    currentIndex--;
  } else {
    position = -(totalWidth - itemWidth); // Quay về slide cuối
    currentIndex = carouselItems.length - 1;
  }
  updateDot(currentIndex);
});

function updateDot(index) {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}
dots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    position = -itemWidth * index;
    carouselInner.style.translate = `${position}px`;
    currentIndex = index;
    updateDot(currentIndex);
  });
});
