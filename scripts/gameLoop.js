const maxFrames = 60; // Reducing for testing stuff, set to 60 when done.
let currentFrame = 0;

let runTimeSeconds = 0; // I used this for testing deltaTime
let lastFrameTime = 0;

let paused = false;

setInterval(() => 
  {
    // deltaTime is used to create consistency when doing movement in situations when frame rate can vary. 
    // i.e. Someone with 30fps and someone with 144fps will experience movement the same way.
    
    // performance.now() gotten from https://stackoverflow.com/a/1975103
    const deltaTime = Math.abs(Number(performance.now()) - Number(lastFrameTime))/1000; // 1000 indicates a 1 second.
    lastFrameTime = Number(performance.now());
    currentFrame = (currentFrame+1)%maxFrames;
    runTimeSeconds += deltaTime;
    
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
    entity.process(deltaTime)
    for(let boundary in worldBoundary)
    {
      if(worldBoundary[boundary] instanceof Force)
        worldBoundary[boundary].repeatPushOut(entity, deltaTime);
    }
  });
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
  
}
