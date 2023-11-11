let currentFrame = 0;

let runTimeSeconds = 0; // I used this for testing deltaTime
let lastFrameTime = 0;

let paused = false;
let previousDoor = "bottom";

setInterval(() => 
  {
    // deltaTime is used to create consistency when doing movement in situations when frame rate can vary. 
    // i.e. Someone with 30fps and someone with 144fps will experience movement the same way.
    
    // performance.now() gotten from https://stackoverflow.com/a/1975103
    const deltaTime = Math.abs(Number(performance.now()) - Number(lastFrameTime))/1000; // 1000 indicates a 1 second.
    lastFrameTime = Number(performance.now());
    currentFrame = (currentFrame+1)%maxFrames;
    runTimeSeconds += deltaTime;
    
    // paused = true;
    if(InputCatcher.isInputJustPressed("tab"))
    {
      console.log("Paused toggled");
      paused = !paused;
    }
    
    if(!paused)
    {
      if(InputCatcher.isInputJustPressed('`'))
        console.log("DebugKey: Pressed");
        
      if(InputCatcher.isInputHeld('`') > 1)
        console.log("DebugKey: Held");
        
      if(InputCatcher.isInputJustReleased('`'))
        console.log("DebugKey: Released");
        
      main(deltaTime);
      update();
      ui();
    }
    
    // Updating input catcher after running logic allows for just pressed and just released to function
    InputCatcher.update(deltaTime);
  },
  1000/maxFrames // This function runs maxFrames every second
);

/**
 * Place processing code in this function such as checks, inputs, collision, etc.
 * @param {Number} deltaTime 
 */
function main(deltaTime)
{

  entityList.forEach((entity) => 
  {
    entity.processEntity(deltaTime);
    for(let boundary in worldBoundary)
    {
      if(worldBoundary[boundary] instanceof Force)
        worldBoundary[boundary].pushAsBoundary(entity, deltaTime);
    }
  });
  
  for(let door in dungeonDoors) 
  {
    if(
      dungeonDoors[door].enabled && 
      previousDoor !== door && 
      dungeonDoors[door].isColliding(playerActor))
    {
      previousDoor = door;
      generateNewRoom();
      setClosedDoor(door);
      currentRoom++;
      console.log("Room count: " + currentRoom);
      
      entityList.forEach((entity) => {
        if(entity.linkedHTMLElement.classList.contains("enemy"))
        {
          entity.enabled = false;
          setTimeout(() => entity.enabled = true, 400);
        }
      });
    }
  }
  
  if(isPlayerDead()) { endGame(); return; }
  
  if(isRoomCleared()){ openAllDoors(); }
  else { closeAllDoors(); }
}

/**
 * Updates all entities CSS based on their new parameters and variables
 */
function update()
{
  // May change this later
  entityList.forEach(entity => entity.update());
}

/**
 * Holds UI updates for the player
 */
function ui()
{
  //TODO: Update UI based on game variables.
}

function startGame()
{
  //TODO: Start game using a function instead of on script load

}

function resetGame()
{
  //TODO: Restart button (optional)

}

function endGame()
{

}

function isPlayerDead() { return playerActor.health <= 0; }

function isRoomCleared()
{
  for(let entity of entityList)
    if(entity.linkedHTMLElement.classList.contains("enemy")) 
      return false;
      
  return true;
}

function generateNewRoom()
{
  clearRoom();
  generateMap(testMap, "tileID-floor0");
  generateEntities(testMap);
  
  switch(previousDoor)
  {
    case "top":
      // playerActor.xPos = (mapSizeX/2)*pixelSize;
      playerActor.yPos = (mapSizeY-1)*pixelSize;
      break;
      
    case "bottom":
      // playerActor.xPos = (mapSizeX/2)*pixelSize;
      playerActor.yPos = (1)*pixelSize;
      break;
      
    case "left":
      playerActor.xPos = (mapSizeX-1)*pixelSize;
      // playerActor.yPos = (mapSizeY/2)*pixelSize;
      break;
      
    case "right":
      playerActor.xPos = (1)*pixelSize;
      // playerActor.yPos = (mapSizeY/2)*pixelSize;
      break;
  }
}

function openAllDoors()
{
  for(let door in dungeonDoors)
    if(door !== previousDoor)
      dungeonDoors[door].enabled = true;
}

function closeAllDoors()
{
  for(let door in dungeonDoors)
    dungeonDoors[door].enabled = false;
}

function setClosedDoor(door)
{
  switch(door)
  {
    case "top": previousDoor = "bottom"; break;
    case "bottom": previousDoor = "top"; break;
    case "left": previousDoor = "right"; break;
    case "right": previousDoor = "left"; break;
  }
}

