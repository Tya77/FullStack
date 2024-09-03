// Bài 1
var arr1 = [1, 4, 3, 2];
var arr2 = [5, 2, 6, 7, 1];
var arr3 = arr1.reduce(function (pre, curr) {
  if (arr2.includes(curr)) {
    pre.push(curr);
  }
  return pre;
}, []);
console.log(arr3);

// Bài 2
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
var newArr = arr.join(",");
var arr1 = [];
for (var i = 0; i <= 12; i++) {
  arr1.push(i);
}

console.log(arr1);

// Bài 3: Tách phần tử theo đúng kiểu dữ liệu
// [["a", "b"], [1, 2], [true, false]]
var arr = [
  ["a", 1, true],
  ["b", 2, false],
];
var strings = [];
var numbers = [];
var booleans = [];

arr.forEach((newArr) => {
  newArr.forEach((item) => {
    if (typeof item === "string") {
      strings.push(item);
    } else if (typeof item === "number") {
      numbers.push(item);
    } else if (typeof item === "boolean") {
      booleans.push(item);
    }
  });
});

var result = [strings, numbers, booleans];

console.log(result);

// Bài 4
var content = [
  {
    img: "https://picsum.photos/200",
    h2: "Tiêu đề bài viết 1",
    p: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quae optio, libero aliquam excepturi odio atque? Repudiandae dolorum, veritatis placeat, quia possimus exercitationem tenetur distinctio beatae et, delectus numquam ex.",
  },
  {
    img: "https://picsum.photos/200",
    h2: "Tiêu đề bài viết 2",
    p: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quae optio, libero aliquam excepturi odio atque? Repudiandae dolorum, veritatis placeat, quia possimus exercitationem tenetur distinctio beatae et, delectus numquam ex.",
  },
  {
    img: "https://picsum.photos/200",
    h2: "Tiêu đề bài viết 3",
    p: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quae optio, libero aliquam excepturi odio atque? Repudiandae dolorum, veritatis placeat, quia possimus exercitationem tenetur distinctio beatae et, delectus numquam ex.",
  },
];

var container = document.querySelector(".container");
var html = content
  .map(
    (item) =>
      `
  <div class="item">
        <img src="${item.img}" alt="${item.h2}">
    <div class="content">
        <h2 class="title">${item.h2}</h2>
        <p class="desc">${item.p}</p>
    </div>
  </div>
  `
  )
  .join("");

container.innerHTML = html;
