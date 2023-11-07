//# Creating boundaries
const gameMap = document.querySelector("#gameMap");
const gameEntities = document.querySelector("#gameEntities");

const worldBoundary = {
  left: undefined,
  right: undefined,
  top: undefined,
  bottom: undefined
};

const boundary = document.createElement("div");
boundary.classList.add("forceEntity");
boundary.style.width = `${gameMap.getBoundingClientRect().width}px`;
boundary.style.height = `${gameMap.getBoundingClientRect().height}px`;

worldBoundary.left = new Force(boundary.cloneNode(), 0, 0,  pixelSize,  0);
// worldBoundary.right =  new Force(boundary.cloneNode(), 0, 0,  0,  0);
// worldBoundary.top =    new Force(boundary.cloneNode(), 0, 0,  0,  0);
// worldBoundary.bottom = new Force(boundary.cloneNode(), 0, 0,  0,  0);

//# Creating actors
const playerActor = new PlayerCharacter(
  document.querySelector(".player")
)

// Testing deleting objects. It works
// playerActor.dispose();
