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


//# Doors
const dungeonDoors = {
  top: undefined,
  bottom: undefined,
  left: undefined,
  right: undefined
};

let doorXCenterPos = ((mapSizeX/2)*pixelSize)-(32+(16));
let doorYCenterPos = ((mapSizeY/2)*pixelSize)-(32+(16));
dungeonDoors.top =    new AreaActivate(doorXCenterPos, 0, undefined, pixelSize*3, pixelSize);
dungeonDoors.bottom = new AreaActivate(doorXCenterPos, (mapSizeY*pixelSize)-pixelSize, undefined, pixelSize*3, pixelSize);
dungeonDoors.left =   new AreaActivate(0, doorYCenterPos, undefined, pixelSize, pixelSize*3);
dungeonDoors.right =  new AreaActivate((mapSizeX*pixelSize)-pixelSize, doorYCenterPos, undefined, pixelSize, pixelSize*3);


//# Creating actors
const playerActor = new PlayerCharacter(
  document.querySelector(".player")
)

// const testEnemy = new Enemy(new EnemyAIBase(), null, mapSizeX*pixelSize/2-(32/2), mapSizeY*pixelSize/2-(32/2), "enemy_0", 4);
// const testSlime = new Slime(mapSizeX/2*pixelSize, 32, "sdbubbly", 8);

// playerActor.xPos = (mapSizeX*pixelSize/2)-(pixelSize/2);
// playerActor.yPos = (mapSizeY*pixelSize)-(pixelSize*3);

// TODO: Remove this generation when making game start and round system.
generateMap(map_StartingRoom, "tileID-floor0");
generateEntities(map_StartingRoom);
dungeonDoors.bottom.enabled = false;

// const roomEnemies = EnemyGenerator.createEnemies(4);

// Testing deleting objects. It works
// playerActor.dispose();
