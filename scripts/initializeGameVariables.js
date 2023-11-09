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
worldBoundary.left.linkedHTMLElement.style.width = `${pixelSize}px`;
worldBoundary.left.xPos = 0;
worldBoundary.left.update();

worldBoundary.right = new Force(boundary.cloneNode(), (mapSizeX*pixelSize)-pixelSize, 0, -1, 0);
worldBoundary.right.linkedHTMLElement.style.width = `${pixelSize}px`;
worldBoundary.right.xPos = (mapSizeX*pixelSize)-32;
worldBoundary.right.update();

worldBoundary.top = new Force(boundary.cloneNode(), 0, -(mapSizeY*pixelSize)+pixelSize, 0, 1);
worldBoundary.top.linkedHTMLElement.style.height = `${pixelSize}px`;
worldBoundary.top.yPos = 0;
worldBoundary.top.update();

worldBoundary.bottom = new Force(boundary.cloneNode(), 0, (mapSizeY*pixelSize)-pixelSize, 0, -1);
worldBoundary.bottom.linkedHTMLElement.style.height = `${pixelSize}px`;
worldBoundary.bottom.yPos = (mapSizeY*pixelSize)-32;
worldBoundary.bottom.update();


//# Initializing Map
{
  const tile = document.createElement("div");
  tile.className = "tile tileID-floor0";
  // tile.innerHTML = `<img class="sprite" src="">`;

  for(let i = 0; i < mapSizeX*mapSizeY; i++)
  {
    gameMap.appendChild(tile.cloneNode(true));
  }
}
//# Creating actors
const playerActor = new PlayerCharacter(
  document.querySelector(".player")
)

const testEnemy = new Enemy(new EnemyAIBase(), null, mapSizeX*pixelSize/2-(32/2), mapSizeY*pixelSize/2-(32/2), "enemy_0", 4);

playerActor.xPos = (mapSizeX*pixelSize/2)-(pixelSize/2);
playerActor.yPos = (mapSizeY*pixelSize)-(pixelSize*3);

// const roomEnemies = EnemyGenerator.createEnemies(4);

// Testing deleting objects. It works
// playerActor.dispose();
