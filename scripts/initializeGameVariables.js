//# Creating boundaries
const worldBoundary = {
  left: undefined,
  right: undefined,
  top: undefined,
  bottom: undefined
};

let boundary = document.createElement("div");
boundary.classList.add("forceEntity");
boundary.style.width = `${mapSizeX*pixelSize}px`;
boundary.style.height = `${mapSizeY*pixelSize}px`;

worldBoundary.left = new Force(boundary.cloneNode(), -(mapSizeX*pixelSize)+pixelSize, 0, 1, 0);
worldBoundary.right = new Force(boundary.cloneNode(), (mapSizeX*pixelSize)-pixelSize, 0, -1, 0);
worldBoundary.top = new Force(boundary.cloneNode(), 0, -(mapSizeY*pixelSize)+pixelSize, 0, 1);
worldBoundary.bottom = new Force(boundary.cloneNode(), 0, (mapSizeY*pixelSize)-pixelSize, 0, -1);

//# Initializing Map
{
  const tile = document.createElement("div");
  tile.className = "tile tileID-floor0";
  tile.innerHTML = `<img class="sprite" src="">`;

  for(let i = 0; i < mapSizeX*mapSizeY; i++)
  {
    gameMap.appendChild(tile.cloneNode(true));
  }
}
//# Creating actors
const playerActor = new PlayerCharacter(
  document.querySelector(".player")
)

playerActor.xPos = (mapSizeX*pixelSize/2)-(pixelSize/2);
playerActor.yPos = (mapSizeY*pixelSize)-(pixelSize*3);

// const roomEnemies = EnemyGenerator.createEnemies(4);

// Testing deleting objects. It works
// playerActor.dispose();
