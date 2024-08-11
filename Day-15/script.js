const textElement = document.querySelector(".text");
const words = textElement.textContent.split(" ");

let newContent = "";
for (let i = 0; i < words.length; i++) {
  newContent += `<span>${words[i]} </span>`;
}
textElement.innerHTML = newContent;

let j = 0;
function changeColor() {
  if (j < words.length) {
    textElement.children[j].style.color = "red";
    j++;
    setTimeout(changeColor, 1000);
  }
}

changeColor();


// 
var fullname = "kiều duy tùng";
//Chuyển thành Kiều Duy Tùng
var fixname = fullname.replace("k", "K").replace("d", "D").replace("t", "T");

console.log(fixname);