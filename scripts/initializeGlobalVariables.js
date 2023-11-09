/// This script holds variables that are needed by other scripts.
const pixelSize = 32;
const entityList = [];
const gameMap = document.querySelector("#gameMap");
const gameEntities = document.querySelector("#gameEntities");

const mapSizeX = 19;
const mapSizeY = 13;

//https://www.w3schools.com/css/css3_variables_javascript.asp
document.querySelector(":root").style.setProperty("--tileSize", `${pixelSize}px`);
document.querySelector(":root").style.setProperty("--tilesX", `${mapSizeX}`);
document.querySelector(":root").style.setProperty("--tilesY", `${mapSizeY}`);


// Used for actors
const direction = 
{
  N: "north",
  E: "east",
  S: "south",
  W: "west",
  NE: "northeast",
  SE: "southeast",
  NW: "northwest",
  SW: "southwest"
};
