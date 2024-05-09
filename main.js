"use strict";

function formatDoc(cmd, value = "") {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

function addLink() {
  const url = prompt(`Insert url`);
  formatDoc("createLink", url);
}

const content = document.getElementById("content");

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

const showCode = document.getElementById("show-code");
let active = false;

showCode.addEventListener("click", function () {
  showCode.dataset.active = !active;

  if (active) {
    content.innerHTML = content.textContent;
    content.setAttribute("contenteditable", true);
  } else {
    content.textContent = content.innerHTML;
    content.setAttribute("contenteditable", false);
  }
  active = !active;
});

const filename = document.getElementById("filename");
const selectFile = document.getElementById("file");

function fileHandle(value) {
  if (value === "new") {
    content.innerHTML = "";
    filename.value = "United";
  } else if (value === "txt") {
    const blob = new Blob([content.innerText]);
    console.log(blob);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename.value}.txt`;
    link.click();
  } else if (value === "pdf") {
    html2pdf().from(content).save(filename.value);
    filename.value = "United";
    selectFile.selectedIndex = "0";
  }
}

const charNumber = document.querySelector(".char-number");
const wordNumber = document.querySelector(".word-number");

const countEvent = new Event("count");

charNumber.addEventListener("count", function () {
  var countChar = content.innerText
    .replace(/(\n\n)/g, "\n")
    .replace(/\t/g, "    ").length;
  charNumber.innerHTML = `Số ký tự: ${countChar}`;
});

wordNumber.addEventListener("count", function () {
  var str = content.innerText.trim();
  if (str) {
    var countWord = str.split(/[\s\t]+/g).length;
    wordNumber.innerHTML = `Số từ: ${countWord}`;
  } else {
    wordNumber.innerHTML = `Số từ: 0`;
  }
});

content.addEventListener("input", function () {
  charNumber.dispatchEvent(countEvent);
  wordNumber.dispatchEvent(countEvent);
});

const boldEl = document.querySelector(".bold");
const underlineEl = document.querySelector(".underline");
const italicEl = document.querySelector(".italic");

window.addEventListener("keyup", function (e) {
  if (e.ctrlKey && e.key === "b") {
    boldEl.classList.toggle("active");
  }

  if (e.ctrlKey && e.key === "u") {
    underlineEl.classList.toggle("active");
  }

  if (e.ctrlKey && e.key === "i") {
    italicEl.classList.toggle("active");
  }
});
