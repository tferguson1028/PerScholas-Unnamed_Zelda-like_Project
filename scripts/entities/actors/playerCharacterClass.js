class PlayerCharacter extends Actor
{
  //Making static due to JS rules
  static spriteSheetPath = "assets/*";
  constructor(htmlElement, initX = 0, initY = 0)
  {
    super(htmlElement, PlayerCharacter.spriteSheetPath, initX, initY, "player", 20, "player");
    this.linkedHTMLElement.classList.add("player");
    
    this.attackHitbox = new Hitbox(0, 0, this, 0.8, 1, 2);
    this.forceHitbox = new Force(document.createElement('div'), 0, 0, 0, 0);
    this.attackHitbox.enabled = false;
    this.forceHitbox.enabled = false;
    this.forceHitbox.scaleX = 0.8;
    this.speed = 6;
    
    this.attackHitbox.linkedHTMLElement.classList.add("hurtbox");
    this.forceHitbox.linkedHTMLElement.classList.add("forceEntity");
    
    this.attachChild(this.attackHitbox);
    this.attachChild(this.forceHitbox);
    
    this.spriteSpeed = 0.01;
    this.spriteIndex = 0;
  }
  
  /**
   * Holds logic for updating entities. Is empty in base entity class.
   * @param {Number} deltaTime 
   */
  process(deltaTime)
  {
    super.process(deltaTime)
    if(this.attackHitbox.enabled || this.iFrames < this.iFramesMax)
      return;
      
    this.doMovement(deltaTime);
    this.doAttack(deltaTime);
    
    switch(this.direction)
    {
      case direction.N:
        this.forceHitbox.xPos = 0;
        this.forceHitbox.yPos = -(pixelSize+2);
        this.forceHitbox.rotation = 0;
        this.forceHitbox.forceX = 0
        this.forceHitbox.forceY = -8;
        
        this.attackHitbox.xPos = 0;
        this.attackHitbox.yPos = -(pixelSize+2);
        this.attackHitbox.rotation = 0;
        break;
        
      case direction.E:
        this.forceHitbox.xPos = (pixelSize+2);
        this.forceHitbox.yPos = 0;
        this.forceHitbox.rotation = 90;
        this.forceHitbox.forceX = 8
        this.forceHitbox.forceY = 0;
        
        this.attackHitbox.xPos = (pixelSize+2);
        this.attackHitbox.yPos = 0;
        this.attackHitbox.rotation = 90;
        break;
        
      case direction.S:
        this.forceHitbox.xPos = 0;
        this.forceHitbox.yPos = (pixelSize+2);
        this.forceHitbox.rotation = 0;
        this.forceHitbox.forceX = 0
        this.forceHitbox.forceY = 8;
        
        this.attackHitbox.xPos = 0;
        this.attackHitbox.yPos = (pixelSize+2);
        this.attackHitbox.rotation = 0;
        break;
        
      case direction.W:
        this.forceHitbox.xPos = -(pixelSize+2);
        this.forceHitbox.yPos = 0;
        this.forceHitbox.rotation = 90;
        this.forceHitbox.forceX = -8;
        this.forceHitbox.forceY = 0;
        
        this.attackHitbox.xPos = -(pixelSize+2);
        this.attackHitbox.yPos = 0;
        this.attackHitbox.rotation = 90;
        break;
    }
  }
  
  doMovement(deltaTime)
  {
    if(InputCatcher.isInputPressed("shift")) this.speed = 4;
    else this.speed = 6;
    
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
    
    if(this.keyPriority('a', 'd') === 'a')
    {
      this.translate(-moveSpeed, 0);
      this.direction = direction.W;
    }else if(this.keyPriority('a', 'd') === 'd')
    {
      this.translate(moveSpeed, 0)
      this.direction = direction.E;
    }
    
    if(this.direction === "" || InputCatcher.isInputPressed('shift'))
      this.direction = prevDir;
  }
  
  keyPriority(key1, key2)
  {
    // Returns oldest keypress
    if(InputCatcher.isInputPressed(key1) || InputCatcher.isInputPressed(key2))
    {
      let key1Hold = InputCatcher.isInputHeld(key1);
      let key2Hold = InputCatcher.isInputHeld(key2);
      return key1Hold > key2Hold ? key1 : key2;
    }
    return false;
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
  
  update()
  {
    super.update();
    if(
      InputCatcher.isInputPressed('w') ||
      InputCatcher.isInputPressed('a') ||
      InputCatcher.isInputPressed('s') ||
      InputCatcher.isInputPressed('d')
    )
    {
      switch(this.direction)
      {
        case direction.N: 
          this.spriteIndex = (this.spriteIndex + this.spriteSpeed) % 2;
          this.linkedHTMLElement.style.backgroundImage = `url(../../../../assets/sprites/hero/hero_walk_up_${Math.floor(this.spriteIndex)}.png)`;
          break;
        case direction.S: 
          this.spriteIndex = (this.spriteIndex + this.spriteSpeed) % 2;
          this.linkedHTMLElement.style.backgroundImage = `url(../../../../assets/sprites/hero/hero_walk_down_${Math.floor(this.spriteIndex)}.png)`;
          break;
          
        case direction.E: 
          this.spriteIndex = (this.spriteIndex + this.spriteSpeed) % 2;
          this.linkedHTMLElement.style.backgroundImage = `url(../../../../assets/sprites/hero/hero_walk_right_${Math.floor(this.spriteIndex)}.png)`;
          break;
          
        case direction.W: 
          this.spriteIndex = (this.spriteIndex + this.spriteSpeed) % 2;
          this.linkedHTMLElement.style.backgroundImage = `url(../../../../assets/sprites/hero/hero_walk_left_${Math.floor(this.spriteIndex)}.png)`;
          break;
        
      }
    }
  }
}
