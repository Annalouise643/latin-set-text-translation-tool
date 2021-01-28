function highlight() {
  let atElement = document.querySelector("#at");
  let butElement = document.querySelector("#but");

  atElement.style.color = "red";
  butElement.style.color = "red";
}

function undoHighlight() {
  let atElement = document.querySelector("#at");
  let butElement = document.querySelector("#but");

  atElement.style.color = "black";
  butElement.style.color = "black";
}

function highlightTwo() {
  let reginaElement = document.querySelector("#regina");
  let queenElement = document.querySelector("#queen");

  reginaElement.style.color = "purple";
  queenElement.style.color = "purple";
}

function undoHighlightTwo() {
  let reginaElement = document.querySelector("#regina");
  let queenElement = document.querySelector("#queen");

  reginaElement.style.color = "black";
  queenElement.style.color = "black";
}
