"use strict";

let scrollPos = 0;

let svg = {};
let debrisSVG = {};
//let topsvg = {};
//let scrollY = window.scrollY;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("script works");
  getShipH();
  document.querySelector(".grid-container").addEventListener("click", gridClickController);
  getHeadline();
  //hentSVG2();
  //hentSVG();
  //document.onmousemove = startInteractive;
  document.onscroll = startScrollCalc;
  document.addEventListener("scroll", startScrollCalc);

  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      let buttonID = button.dataset.id;
      console.log(buttonID);
      scrollTo(buttonID);
    });
  });
  //document.querySelector("body").addEventListener("scroll", startInteractive);
}

function scrollTo(buttonID) {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: document.querySelector(`#${buttonID}`).getBoundingClientRect().top + window.scrollY
  });
}

function getShipH() {
  let bgWave = document.querySelector(".hero-container").getBoundingClientRect().top;
  document.querySelector(".ship").style.setProperty("--ship-h", bgWave - 10);
}

let typing = document.querySelector("#string-placeholder").textContent;
let typingP = document.querySelector("#string-placeholder");
let typingLength = typing.length;
const stringArray = ["Frontend Development", "Graphic Design", "Fun Stuff", "Dive Deeper!"];
let arrayCnt = 0;

function getHeadline() {
  document.querySelector("#string-placeholder").classList.add("typing");
  document.querySelector("#string-placeholder").textContent = stringArray[0];
  typingP.style.setProperty("--string_l", 21);

  setInterval(startH1Array, 5000);
}

function startH1Array() {
  //console.log("startH1Array");
  typingP.style.setProperty("--string_l", 0);
  arrayCnt = (arrayCnt + 1) % (stringArray.length + 1);
  //console.log(arrayCnt);
  if (arrayCnt == stringArray.length) {
    arrayCnt = 0;
  }
  typingLength = stringArray[arrayCnt].length;
  document.querySelector("#string-placeholder").textContent = stringArray[arrayCnt];
  //console.log(stringArray[arrayCnt]);
  setTimeout(function() {
    typingP.style.setProperty("--string_l", typingLength + 1);
  }, 800);
}

async function hentSVG() {
  let url = "svg/test2.svg";
  let svgData = await fetch(url);

  svg = await svgData.text();
  //console.log(svg);

  visSVG();
}

async function hentSVG2() {
  let url = "svg/test.svg";
  let svgData = await fetch(url);

  debrisSVG = await svgData.text();

  visSVG();
}

function startScrollCalc(event) {
  const scrollYL = scrollY;
  let shipMove = scrollYL * -0.15;
  document.querySelector(".ship svg").style.transform = `translateY(${shipMove}px)`;

  let headerPos1 = document.querySelector("header svg").getBoundingClientRect();
  const headerPos = headerPos1.bottom - headerPos1.top;

  let blackPos = document.querySelector(".hero-container.foreground").getBoundingClientRect();
  //let blackPos = document.querySelector(".bottom").getBoundingClientRect();
  let aboutPos = document.querySelector("#about").getBoundingClientRect();
  let offset = blackPos.bottom - headerPos;
  let offsetNext = aboutPos.top - headerPos;
  if (document.body.getBoundingClientRect().top > scrollPos) {
    //console.log("is up");
    //offset = blackPos.top - headerPos.top;
    offset = blackPos.bottom - headerPos;
    offsetNext = aboutPos.top - headerPos;
    // console.log(offset, offsetNext);
    if (offset > 50 || offsetNext < 50) {
      document.querySelectorAll("nav button").forEach(button => {
        button.style.color = "white";
      });
      document.querySelector("header svg").style.fill = "black";
      document.querySelector(".ship svg").style.fill = "black";
    } else {
      document.querySelectorAll("nav button").forEach(button => {
        button.style.color = "black";
      });
      document.querySelector(".ship svg").style.fill = "white";
      document.querySelector("header svg").style.fill = "white";
    }
  } else {
    //console.log("is down");
    //console.log(offset, offsetNext);
    if (offset > 30 || offsetNext < 30) {
      document.querySelectorAll("nav button").forEach(button => {
        button.style.color = "white";
      });
      document.querySelector(".ship svg").style.fill = "black";
      document.querySelector("header svg").style.fill = "black";
    } else {
      document.querySelectorAll("nav button").forEach(button => {
        button.style.color = "black";
      });
      document.querySelector(".ship svg").style.fill = "white";
      document.querySelector("header svg").style.fill = "white";
    }
  }

  scrollPos = document.body.getBoundingClientRect().top;
  // save the new position for iteration.

  //console.log("header top, left, bottom, right: " + headerPos.top, headerPos.left, headerPos.bottom, headerPos.right);
  //   console.log("Work top, left, bottom, right: " + workPos.top, workPos.left, workPos.bottom, workPos.right);

  //   console.log(offset);
  //   console.log(offsetNext);
}

function startInteractive(event) {
  //let dotsArray = document.querySelectorAll(`${svg}`);
  let dotsArray = document.querySelectorAll("ellipse, circle");
  //let dotsArray2 = document.querySelectorAll("circle");
  //console.log(dotsArray);
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  let i;
  for (i = 0; i < dotsArray.length; i++) {
    //console.log(dotsArray[i]);
    const ellipsePos = dotsArray[i].getBoundingClientRect();
    const distance = Math.hypot(ellipsePos.left - mouseX, ellipsePos.top - mouseY);

    //console.log(`#${i} dist: ${distance}`);
    if (distance < 50) {
      console.log("condition fulfilled");
      dotsArray[i].style.fill = "red";
    }
  }
}

function visSVG() {
  document.querySelector(".svg-container-debris.top").innerHTML += debrisSVG;
  document.querySelector(".svg-container-debris.bottom").innerHTML += svg;
}

function gridClickController(event) {
  let element = event.target;
  const id = element.dataset.id;
  let i;

  //console.log(element);
  //console.log(id);
  const workCases = document.querySelectorAll(".work-case");
  console.log(workCases);
  for (i = 0; i < workCases.length; i++) {
    document.querySelector(`.grid-container p[data-id="${i + 1}"]`).parentElement.style.display = "none";
    document.querySelector(`.grid-container article[data-id="${i + 1}"]`).style.gridColumn = "span 1";
    document.querySelector(`.grid-container article[data-id="${i + 1}"] img`).style.width = "100%";
  }

  //document.querySelector(`.grid-container p[data-id="${id}"]`).parentElement.style.maxHeight = "900px";
  document.querySelector(`.grid-container p[data-id="${id}"]`).parentElement.style.transform = "scale(1)";

  //document.querySelector(`.grid-container p[data-id="${id}"]`).style.maxHeight = "600px";
  //document.querySelector(`.grid-container p[data-id="${id}"]`).parentElement.style.transform = "scaleY(1)";
  document.querySelector(`.grid-container article[data-id="${id}"]`).style.gridColumn = "span 2";

  document.querySelector(`.grid-container article[data-id="${id}"] img`).style.width = "85%";
  document.querySelector(`.grid-container`).style.gridRowGap = "5vh";
  //   setTimeout(function() {
  //     document.querySelector(`.grid-container p[data-id="${id}"]`).parentElement.style.display = "block";
  //   }, 200);

  document.querySelector(`.grid-container p[data-id="${id}"]`).parentElement.style.display = "block";
}
