const list = document.querySelector(".list");
const listModule = document.querySelectorAll(".title-module span");
const title = document.querySelectorAll(".title");
const list_item = document.querySelectorAll(".list-item");
const allEl = document.querySelectorAll("body");

list_item.forEach(function (item, index) {
  index++;
  var innerItem = item.innerText;
  item.innerHTML = `Bài ${index}:<span> ${innerItem}</span>`;
});
title.forEach(function (item, index) {
  index++;
  var innerItem = item.innerText;
  item.innerHTML = `Module ${index}:<span> ${innerItem}</span>`;
});

title.forEach(function (item) {
  item.draggable = "true";
  item.addEventListener("dragstart", function () {
    item.style.opacity = "0.5";
  });
  item.addEventListener("dragend", function () {
    item.style.opacity = "1";
  });
});

list_item.forEach(function (item) {
  item.draggable = "true";
  item.addEventListener("dragstart", function () {
    item.classList.add("opacity");
  });
  item.addEventListener("dragend", function () {
    item.classList.remove("opacity");
  });
});

// Kéo thả
function addDragEvents(items) {
  items.forEach(function (item) {
    item.draggable = true;
    item.addEventListener("dragstart", function () {
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", function () {
      item.classList.remove("dragging");
      updateOrder();
    });
  });
}

addDragEvents(title);
addDragEvents(list_item);

list.addEventListener("dragover", function (e) {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  const items = Array.from(list.querySelectorAll(".list-item, .title"));

  // Tìm vị trí
  const afterElement = items.find((item) => {
    return (
      e.clientY <= item.getBoundingClientRect().top + item.offsetHeight / 2
    );
  });

  if (afterElement) {
    list.insertBefore(draggingItem, afterElement);
  } else {
    list.appendChild(draggingItem);
  }
});

//Cập nhật lại sau khi kéo thả
function updateOrder() {
  const list_item = document.querySelectorAll(".list-item");
  const titles = document.querySelectorAll(".title");

  list_item.forEach(function (item, index) {
    index++;
    const span = item.querySelector("span");
    if (span) {
      item.firstChild.textContent = `Bài ${index}: `;
    }
  });

  titles.forEach(function (module, index) {
    index++;
    const span = module.querySelector("span");
    if (span) {
      module.firstChild.textContent = `Module ${index}: `;
    }
  });
}
