class PlayerCharacter extends Actor
{
  //Making static due to JS rules
  static spriteSheetPath = "assets/*";
  speed = 6;
  constructor(htmlElement, initX = 0, initY = 0)
  {
    super(htmlElement, PlayerCharacter.spriteSheetPath, initX, initY, pixelSize, pixelSize)
    
    this.attackHitbox = new Hitbox(0, 0, this, 0.5, 1, 2);
    this.forceHitbox = new Force(document.createElement('div'), 0, 0, 8, 0);
    this.attackHitbox.enabled = false;
    this.forceHitbox.enabled = true;
    
    this.attackHitbox.linkedHTMLElement.classList.add("hurtbox");
    this.forceHitbox.linkedHTMLElement.classList.add("forceEntity");
    
    this.attachChild(this.attackHitbox);
    this.attachChild(this.forceHitbox);
  }
  
  /**
   * Holds logic for updating entities. Is empty in base entity class.
   * @param {Number} deltaTime 
   */
  process(deltaTime)
  {
    this.doMovement(deltaTime);
    this.doAttack(deltaTime);
    
    switch(this.direction)
    {
      case direction.N:
        this.forceHitbox.xPos = 0;
        this.forceHitbox.yPos = -(pixelSize+2);
        this.attackHitbox.xPos = 0;
        this.attackHitbox.yPos = -(pixelSize+2);
        break;
        
      case direction.E:
        this.forceHitbox.xPos = (pixelSize+2);
        this.forceHitbox.yPos = 0;
        this.attackHitbox.xPos = (pixelSize+2);
        this.attackHitbox.yPos = 0;
        break;
        
      case direction.S:
        this.forceHitbox.xPos = 0;
        this.forceHitbox.yPos = (pixelSize+2);
        this.attackHitbox.xPos = 0;
        this.attackHitbox.yPos = (pixelSize+2);
        break;
        
      case direction.W:
        this.forceHitbox.xPos = -(pixelSize+2);
        this.forceHitbox.yPos = 0;
        this.attackHitbox.xPos = -(pixelSize+2);
        this.attackHitbox.yPos = 0;
        break;
    }
  }
  
  doMovement(deltaTime)
  {
    let moveSpeed = this.speed*pixelSize*deltaTime;
    let prevDir = this.direction;
    this.direction = "";
    
    // I only want player to face cardinal directions, so replace
    if(InputCatcher.isInputPressed('w'))
    {
      this.translate(0, -moveSpeed);
      this.direction = direction.N;
    }else if(InputCatcher.isInputPressed('s'))
    {
      this.translate(0, moveSpeed);
      this.direction = direction.S;
    }
    
    if(InputCatcher.isInputPressed('a'))
    {
      this.translate(-moveSpeed, 0);
      this.direction = direction.W;
    }else if(InputCatcher.isInputPressed('d'))
    {
      this.translate(moveSpeed, 0)
      this.direction = direction.E;
    }
    
    if(this.direction === "")
      this.direction = prevDir;
  }
  
  doAttack(deltaTime)
  {
    if(InputCatcher.isInputJustPressed('k'))
    {
      this.attackHitbox.enabled = true;
      this.forceHitbox.enabled = true;
      setTimeout(() => {
        this.attackHitbox.enabled = false;
        this.forceHitbox.enabled = false;
      },
        200
      );
    }
  }
}
