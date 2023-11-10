/// This script holds variables that are needed by other scripts.
const pixelSize = 32;

const entityList = [];
const gameMap = document.querySelector("#gameMap");
const gameEntities = document.querySelector("#gameEntities");

const mapSizeX = 19;
const mapSizeY = 11;

const maxFrames = 60; // Reducing for testing stuff, set to 60 when done.

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

//# MAPS
const mapKey = 
{
  // Terrain (Non interactive elements)
  wall: ":",
  door_open: ">",
  door_closed: "<",
  empty: " ",
  block: "#",
  water: "~",
  
  // Objects (Interactive elements)
  rock: "R",
  
  // Entities (Actor elements)
  player: "P",
  enemy_random: "E",
  enemy_type0: "0", // Slime
  enemy_type1: "1", // Skeleton
  enemy_type2: "2", // ?
  enemy_type3: "3", // ?
  enemy_type4: "4"  // ?
}


const testMap = 
`
::::::::>>>::::::::
:                 :
:                 :
:    B  0 0  B    :
>                 >
>                 >
>                 >
:    B       B    :
:        P        :
:        0        :
::::::::>>>::::::::
`;

const map_StartingRoom = 
`
::::::::>>>::::::::
:                 :
:                 :
:                 :
>                 >
>                 >
>                 >
:                 :
:        P        :
:                 :
::::::::<<<::::::::
`;

