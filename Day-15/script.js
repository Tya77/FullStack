const textEle = document.querySelector(".text");
let textContent = textEle.innerText;

let arrText = textContent.split(" ");
let copyText = [...arrText];

let i = 0;

function highlightNextWord() {
  if (i > 0) {
    arrText[i - 1] = copyText[i - 1];
  }

  arrText[i] = `<span class="color">${arrText[i]}</span>`;

  textEle.innerHTML = arrText.join(" ");

  i++;
  if (i === arrText.length) {
    i = 0;
  }

  setTimeout(highlightNextWord, 1000);
}

highlightNextWord();



//
var fullname = "kiều duy tùng";
var word = fullname.split(" ");
var fixname = "";

for (var j = 0; j < word.length; j++) {
  var capitalizedWord = word[j].charAt(0).toUpperCase() + word[j].slice(1);

  fixname += capitalizedWord + " ";
}

console.log(fixname);
