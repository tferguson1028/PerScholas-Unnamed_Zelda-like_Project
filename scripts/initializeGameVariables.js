const map = document.querySelector("#gameMap");

const worldBoundary = new Entity(
  map,
  null,
  0,
  0,
  map.getBoundingClientRect().x,
  map.getBoundingClientRect().y
);

const playerActor = new PlayerCharacter(
  document.querySelector(".player")
)

// Testing deleting objects. It works
// playerActor.dispose();
