

function highlight(lineIdx, wordIdxs, color) {
  wordIdxs.forEach(function (wordIdx) {
    let els = document.querySelectorAll(`.source-${lineIdx}-${wordIdx}`);
    els.forEach(function (el) {
      el.style.color = color;
    });
  });
}

function renderSourceWord(word, lineIdx, wordIdx) {
  let el = document.createElement("a");
  el.innerHTML = word;
  el.href = `http://archives.nd.edu/cgi-bin/wordz.pl?keyword=${word}`;
  el.target = "_blank";
  el.className = `source-${lineIdx}-${wordIdx}`;
  el.addEventListener("mouseover", function () {
    highlight(lineIdx, [wordIdx], "red");
  });
  el.addEventListener("mouseout", function () {
    highlight(lineIdx, [wordIdx], "black");
  });
  return el;
}

function renderTransWord(trans, lineIdx) {
  let el = document.createElement("span");
  el.innerHTML = trans.phrase;
  trans.sourceIdxs.forEach(function (sourceIdx) {
    el.className += `source-${lineIdx}-${sourceIdx}`;
  });
  el.addEventListener("mouseover", function () {
    highlight(lineIdx, trans.sourceIdxs, "red");
  });
  el.addEventListener("mouseout", function () {
    highlight(lineIdx, trans.sourceIdxs, "black");
  });
  return el;
}

function createTextElement(elementType, text) {
  let el = document.createElement(elementType);
  el.innerHTML = text;
  return el;
}

function renderLine(line, lineIdx) {
  let row = document.createElement("div");
  row.className = "row";

  let col3 = document.createElement("div");
  col3.className = "col-3";

  let latin = createTextElement("div", "Latin");
  let english = createTextElement("div", "English");

  col3.appendChild(latin);
  col3.appendChild(english);
  row.appendChild(col3);

  let col = document.createElement("div");
  col.className = "col";

  let source = document.createElement("div");
  line.source.forEach(function (word, wordIdx) {
    let el = renderSourceWord(word, lineIdx, wordIdx);
    source.appendChild(el);
    source.appendChild(document.createTextNode(" "));

    let br = document.createElement("br");
      row.appendChild(br);

  });

  let trans = document.createElement("div");
  let transEm = document.createElement("em");
  line.trans.forEach(function (trans) {
    let el = renderTransWord(trans, lineIdx);
    transEm.appendChild(el);
    transEm.appendChild(document.createTextNode(" "));
  });

  trans.appendChild(transEm);

  col.appendChild(source);
  col.appendChild(trans);

  row.appendChild(col);

  return row;
}

function render(data) {
  let root = document.createElement("div");
  data.lines.forEach(function (line, lineIdx) {
    let el = renderLine(line, lineIdx);
    root.appendChild(el);
  });
  // data.forEach(function (word) {
  //   let el = renderWord(word);
  //   root.appendChild(el);
  //   root.appendChild(document.createTextNode(" "));
  // });
  document.querySelector("#app").appendChild(root);
}

let data = {
  lines: [
    {
      source: ["At", "regina", "gravi", "iamdudum", "saucia", "cura"],
      trans: [
        { phrase: "But", sourceIdxs: [0] },
        { phrase: "the queen,", sourceIdxs: [1] },
        { phrase: "inflicted", sourceIdxs: [4] },
        { phrase: "for a long time now", sourceIdxs: [3] },
        { phrase: "with", sourceIdxs: [5] },
        { phrase: "grave", sourceIdxs: [2] },
        { phrase: "anxiety", sourceIdxs: [5] },
      ],
    },

    {
      source: ["vulnus", "alit", "venis", "et", "caeco", "carpitur", "igni."],
      trans: [
        {phrase: "nourished", sourceIdxs: [1]},
        {phrase: "a wound", sourceIdxs: [0]},
        {phrase: "in her veins", sourceIdxs: [2]},
        {phrase: "and", sourceIdxs: [3]},
        {phrase: "was consumed", sourceIdxs: [5]},
        {phrase: "by a", sourceIdxs: [6]},
        {phrase: "hidden", sourceIdxs: [4]},
        {phrase: "fire.", sourceIdxs: [6]}
      ],
    },
  ],
};

render(data);
