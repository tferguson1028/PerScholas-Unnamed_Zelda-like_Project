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
    let moveSpeed = this.speed*pixelSize*deltaTime;
    if(InputCatcher.isInputPressed('w'))
    {
      this.translate(0, -moveSpeed);
    }else if(InputCatcher.isInputPressed('s'))
    {
      this.translate(0, moveSpeed);
    }
    
    if(InputCatcher.isInputPressed('a'))
    {
      this.translate(-moveSpeed, 0);
    }else if(InputCatcher.isInputPressed('d'))
    {
      this.translate(moveSpeed, 0)
    }
    
  }
}
