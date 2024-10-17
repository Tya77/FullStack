const txt_bold = document.querySelector(".txt_bold");
const txt_underline = document.querySelector(".txt_underline");
const txt_italic = document.querySelector(".txt_italic");
const color = document.querySelector("#color");

function formatDoc(cmd, value = null) {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

txt_bold.addEventListener("click", function () {
  formatDoc("bold");
});
txt_underline.addEventListener("click", function () {
  formatDoc("underline");
});
txt_italic.addEventListener("click", function () {
  formatDoc("italic");
});
color.addEventListener("input", function () {
  formatDoc("foreColor", this.value);
});

const select = document.querySelector(".select");
select.addEventListener("change", function () {
  const selectedValue = this.value;
  fileHandle(selectedValue);
  this.selectedIndex = 0;
});

function addLink() {
  const url = prompt("Insert url");
  formatDoc("createLink", url);
}

const content = document.querySelector(".content");

content.addEventListener("mouseenter", function () {
  const a = content.querySelectorAll("a");
  a.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      content.setAttribute("contenteditable", false);
      item.target = "_blank";
    });
    item.addEventListener("mouseleave", function () {
      content.setAttribute("contenteditable", true);
    });
  });
});

const filename = document.getElementById("filename");

function fileHandle(value) {
  if (value === "new") {
    content.innerHTML = "";
    filename.value = "untitled";
  } else if (value === "txt") {
    const blob = new Blob([content.innerText]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename.value}.txt`;
    link.click();
  } else if (value === "pdf") {
    html2pdf(content).save(filename.value);
  }
}

const char = document.querySelector(".char");
const word = document.querySelector(".word");
// Hàm đếm ký tự, từ
function count() {
  const text = content.innerText.trim(); // Lấy nội dung và loại bỏ khoảng trắng
  const charCount = text.length; // Đếm số ký tự
  const wordCount = text ? text.split(/\s+/).length : 0; // Đếm số từ dựa trên khoảng trắng hoặc dấu cách

  // Cập nhật số ký tự và số từ
  char.textContent = `Số ký tự: ${charCount}`;
  word.textContent = `Số từ: ${wordCount}`;
}
content.addEventListener("input", count);
count();
