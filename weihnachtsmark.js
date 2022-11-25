let weihnachtsmarkt = [];

const sizeOfMarkt = 70;
const typMin = 0;
const typMax = 3;

const sizeMin = 0;
const sizeMax = 2;

const selectRandomTyp = (min, max) => {
  var selected = Math.floor(Math.random() * (max - min) + min);
  var typ = "";
  switch (selected) {
    case 0:
      typ = "Glühwein";
      break;
    case 1:
      typ = "Futter ";
      break;
    case 2:
      typ = "Verkaufs ";
      break;
  }
  return typ;
};

const selectRandomSize = (min, max) => {
  var selected = Math.floor(Math.random() * (max - min) + min);

  var size = "";
  switch (selected) {
    case 0:
      size = "offen";
      break;
    case 1:
      size = "umbaut";
      break;
  }
  return size;
};

const fillMarkt = (size) => {
  for (let i = 0; i < size; i++) {
    const stand = {
      typ: 0,
      size: selectRandomSize(sizeMin, sizeMax),
      sizeSM: 0,
    };
    weihnachtsmarkt.push(stand);

    // select size based on given %
    if (i < size * 0.1) {
      stand.typ = "Glühweinstände";
    } else if (i >= size * 0.1 && i < size * 0.4) {
      stand.typ = "Futterstände";
    } else {
      stand.typ = "Verkaufsstände";
    }

    //selected random SM size based on size
    if (weihnachtsmarkt[i].size === "offen") {
      var minSize = 15;
      var maxSize = 25;
      var SmSize = Math.floor(Math.random() * (maxSize - minSize) + minSize);
      stand.sizeSM = SmSize;
    }
    if (weihnachtsmarkt[i].size === "umbaut") {
      var minSize = 30;
      var maxSize = 75;
      var SmSize = Math.floor(Math.random() * (maxSize - minSize) + minSize);
      stand.sizeSM = SmSize;
    }
  }
};

//displays in html the elements

const openWeihnachtsmarkt = (size) => {
  var container = document.getElementById("cont");

  for (let i = 0; i < size; i++) {
    var newStand = document.createElement("div");
    if (weihnachtsmarkt[i].typ === "Glühweinstände") {
      newStand.classList.add("gluhwein");
    } else if (weihnachtsmarkt[i].typ === "Futterstände") {
      newStand.classList.add("futter");
    } else {
      newStand.classList.add("verkauf");
    }

    newStand.textContent = weihnachtsmarkt[i].sizeSM + "qm";
    container.appendChild(newStand);
  }
};

console.log(weihnachtsmarkt);
//calculating Einnahmen
const besucher = 10000;
const tage = 24;
const geldImG = 25;
const geldImF = 20;
const geldImV = 30;

const Einnahmen = (visits, days, amountStands) => {
  var amountG = 0;
  var amountF = 0;
  var amountV = 0;
  var besucherG = visits * 0.3;
  var besucherF = visits * 0.2;
  var besucherV = visits * 0.1;
  var besucherVG = visits * 0.25;
  var besucherVGF = visits * 0.15;

  weihnachtsmarkt.forEach((element) => {
    if (element.typ === "Glühweinstände") {
      amountG++;
    } else if (element.typ === "Futterstände") {
      amountF++;
    } else if (element.typ === "Verkaufsstände") {
      amountV++;
    }
  });

  console.log(amountG, amountF, amountV);
  console.log(besucherG, besucherF, besucherV, besucherVG, besucherVGF);
  //calculating
  var EGS = besucherG * geldImG * days;
  var EFS = besucherF * geldImF * days;
  var EVS = besucherV * geldImV * days;
  var EVGS = (besucherVG * geldImV + besucherVG * geldImG) * days;
  var EVGF =
    (besucherVGF * geldImV + besucherVGF * geldImG + besucherVGF * geldImF) *
    days;

  console.log(EGS, EFS, EVS, EVGS, EVGF);
};

var calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener("click", calculate);

function calculate() {
  fillMarkt(sizeOfMarkt);
  openWeihnachtsmarkt(sizeOfMarkt);
  Einnahmen(besucher, tage, sizeOfMarkt);
  console.log("calculating");
  weihnachtsmarkt = [];
}
