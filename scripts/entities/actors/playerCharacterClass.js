class PlayerCharacter extends Actor
{
  //Making static due to JS rules
  static spriteSheetPath = "assets/*";
  speed = 4;
  constructor(htmlElement, initX = 0, initY = 0)
  {
    super(htmlElement, PlayerCharacter.spriteSheetPath, initX, initY, pixelSize, pixelSize)
  }
  
  /**
   * Holds logic for updating entities. Is empty in base entity class.
   * @param {Number} deltaTime 
   */
  process(deltaTime)
  {
    this.doMovement(deltaTime);
    this.doAttack(deltaTime);
  }
  
  doMovement(deltaTime)
  {
    let moveSpeed = this.speed*pixelSize*deltaTime;
    let prevDir = this.direction;
    this.direction = "";
    
    // Can only face cardinal directions, so replace
    if(InputCatcher.isInputPressed('a'))
    {
      this.translate(-moveSpeed, 0);
      this.direction = direction.W;
    }else if(InputCatcher.isInputPressed('d'))
    {
      this.translate(moveSpeed, 0)
      this.direction = direction.E;
    }
    
    if(InputCatcher.isInputPressed('w'))
    {
      this.translate(0, -moveSpeed);
      this.direction = direction.N;
    }else if(InputCatcher.isInputPressed('s'))
    {
      this.translate(0, moveSpeed);
      this.direction = direction.S;
    }
    
    
    if(this.direction === "")
      this.direction = prevDir;
  }
  
  doAttack(deltaTime)
  {
    if(InputCatcher.isInputJustPressed('k'))
    {
      switch(this.direction)
      {
        case direction.N: console.log("attackTo: " + this.direction); break;
        case direction.S: console.log("attackTo: " + this.direction); break;
        case direction.E: console.log("attackTo: " + this.direction); break;
        case direction.W: console.log("attackTo: " + this.direction); break;
      }
    }
  }
}
