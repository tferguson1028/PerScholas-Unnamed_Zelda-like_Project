//# Creating boundaries
const worldBoundary = {
  left: undefined,
  right: undefined,
  top: undefined,
  bottom: undefined
};

let boundary = document.createElement("div");
boundary.classList.add("forceEntity");
boundary.style.width = `${gameMap.getBoundingClientRect().width}px`;
boundary.style.height = `${gameMap.getBoundingClientRect().height}px`;

worldBoundary.left = new Force(boundary.cloneNode(), -gameMap.getBoundingClientRect().width, 0, 1, 0);
worldBoundary.right = new Force(boundary.cloneNode(), gameMap.getBoundingClientRect().width, 0, -1, 0);
worldBoundary.top = new Force(boundary.cloneNode(), 0, -gameMap.getBoundingClientRect().height, 0, 1);
worldBoundary.bottom = new Force(boundary.cloneNode(), 0, gameMap.getBoundingClientRect().height, 0, -1);

//# Creating actors
const playerActor = new PlayerCharacter(
  document.querySelector(".player")
)

// Testing deleting objects. It works
// playerActor.dispose();
