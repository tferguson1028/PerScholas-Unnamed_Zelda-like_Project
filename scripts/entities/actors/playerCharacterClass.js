class PlayerCharacter extends Actor
{
  //Making static due to JS rules
  static spriteSheetPath = "assets/*";
  speed = pixelSize*5; // Moves speed pixels per second
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
    // console.log(this.getCollisionBox());
    if(InputCatcher.isInputPressed('w'))
    {
      this.yPos -= this.speed*deltaTime;
    }else if(InputCatcher.isInputPressed('s'))
    {
      this.yPos += this.speed*deltaTime;
    } 
    
    if(InputCatcher.isInputPressed('a'))
    {
      this.xPos -= this.speed*deltaTime;
    }else if(InputCatcher.isInputPressed('d'))
    {
      this.xPos += this.speed*deltaTime;
    }
  }
}
