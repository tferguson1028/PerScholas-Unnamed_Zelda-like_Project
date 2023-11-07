/// This script holds variables that are needed by other scripts.
const pixelSize = 32;
const entityList = [];
const gameMap = document.querySelector("#gameMap");
const gameEntities = document.querySelector("#gameEntities");

//https://www.w3schools.com/css/css3_variables_javascript.asp
document.querySelector(":root").style.setProperty("--tileSize", `${pixelSize}px`);
