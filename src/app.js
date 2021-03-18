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

/**
 * render line takes two arguments, 'line' and 'lineIdx'.
 * line should be an object with property of 'source' and 'trans'.
 * 'source' should be an array.
 * 'trans' should also be an array.
 * 'lineIdx' is just being passed through.
 * return a new html element representing one row, which contains two columns, each with two rows of text (contained in divs).
 */
function renderLine(line, lineIdx) {
  let row = document.createElement("div");
  row.className = "row line";

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

/** 
render takes one argument, 'data'. 
'data' should be an object with a property named 'lines'.
'data.lines' should be an array.
*/
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

let theData = {
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
        { phrase: "nourishes", sourceIdxs: [1] },
        { phrase: "a wound", sourceIdxs: [0] },
        { phrase: "in her veins", sourceIdxs: [2] },
        { phrase: "and", sourceIdxs: [3] },
        { phrase: "is consumed", sourceIdxs: [5] },
        { phrase: "by a", sourceIdxs: [6] },
        { phrase: "hidden", sourceIdxs: [4] },
        { phrase: "fire.", sourceIdxs: [6] },
      ],
    },
    {
      /*There should be a line break after recursat*/
      source: [
        "multa",
        "viri",
        "virtus",
        "animo",
        "multusque" /*Ideally que highlights separately with que*/,
        "recursat",
        "gentis",
        "honos;",
      ],
      trans: [
        { phrase: "many times", sourceIdxs: [0] },
        { phrase: "the excellence", sourceIdxs: [2] },
        { phrase: "of the man", sourceIdxs: [1] },
        { phrase: "and many times", sourceIdxs: [4] },
        { phrase: "the honour", sourceIdxs: [7] },
        { phrase: "of his lineage", sourceIdxs: [6] },
        { phrase: "keep recurring", sourceIdxs: [5] },
        { phrase: "in her mind;", sourceIdxs: [3] },
      ],
    },
    {
      /* There should be a line break after vultus*/
      source: ["haerent", "infixi", "pectore", "vultus", "verbaque"],
      trans: [
        { phrase: "his face", sourceIdxs: [3] },
        { phrase: "and his words", sourceIdxs: [4] },
        { phrase: "are stuck", sourceIdxs: [0] },
        { phrase: "affixed", sourceIdxs: [1] },
        { phrase: "in her chest", sourceIdxs: [2] },
      ],
    },
  ],
};

render(theData);
