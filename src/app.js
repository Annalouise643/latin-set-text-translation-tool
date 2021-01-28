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

