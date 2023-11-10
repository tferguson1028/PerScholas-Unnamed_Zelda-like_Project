let currentFrame = 0;

let runTimeSeconds = 0; // I used this for testing deltaTime
let lastFrameTime = 0;

let paused = false;
let previousDoor = null;

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
    if(InputCatcher.isInputJustPressed("`"))
      paused = !paused;
    
    if(!paused)
    {
      if(InputCatcher.isInputJustPressed('`'))
        console.log("Pressed");
        
      if(InputCatcher.isInputHeld('`') > 1)
        console.log("Held");
        
      if(InputCatcher.isInputJustReleased('`'))
        console.log("Released");
        
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
    if(dungeonDoors[door].enabled && dungeonDoors[door].isColliding(playerActor))
    {
      console.log("EEE");
      previousDoor = door;
      generateNewRoom();
      dungeonDoors[door].enabled = false;
    }
  }
  
  if(isPlayerDead()) { endGame(); return; }
  
  if(isRoomCleared()){ console.log("OPENUP"); openAllDoors(true); }
  else { closeAllDoors(false); }
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
  // Since forEach uses a function within, I need to use a for-of
  // entityList.forEach((entity) =>
  // {
  //   if(entity.linkedHTMLElement.classList.contains("enemy")) 
  //   {
  //     return false;
  //   }
  // });
  
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
  console.log("AHEIEEEEEEEEEEEEEEEEEE!");
}

function openAllDoors()
{
  for(let door in dungeonDoors)
  {
    if(door !== previousDoor)
      dungeonDoors[door].enabled = true;
  }
}

function closeAllDoors()
{
  for(let door in dungeonDoors)
  {  
    dungeonDoors[door].enabled = false;
  }
}


