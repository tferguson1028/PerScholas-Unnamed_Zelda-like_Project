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
    this.forceHitbox.owner = this;
    
    this.attackHitbox.enabled = false;
    this.forceHitbox.enabled = false;
    this.forceHitbox.scaleX = 0.8;
    this.speed = 6;
    
    this.attackHitbox.linkedHTMLElement.classList.add("hurtbox");
    this.forceHitbox.linkedHTMLElement.classList.add("forceEntity");
    
    this.attachChild(this.attackHitbox);
    this.attachChild(this.forceHitbox);
    
    this.spriteSpeed = 4;
    this.spriteIndex = 0;
    
    this.walkSprite(0);
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
    
    let attackOffset = pixelSize-2;
    switch(this.direction)
    {
      case direction.N:
        this.forceHitbox.xPos = 0;
        this.forceHitbox.yPos = -attackOffset;
        this.forceHitbox.rotation = 0;
        this.forceHitbox.forceX = 0
        this.forceHitbox.forceY = -8;
        
        this.attackHitbox.xPos = 0;
        this.attackHitbox.yPos = -attackOffset;
        this.attackHitbox.rotation = 0;
        break;
        
      case direction.E:
        this.forceHitbox.xPos = attackOffset;
        this.forceHitbox.yPos = 0;
        this.forceHitbox.rotation = 90;
        this.forceHitbox.forceX = 8;
        this.forceHitbox.forceY = 0;
        
        this.attackHitbox.xPos = attackOffset;
        this.attackHitbox.yPos = 0;
        this.attackHitbox.rotation = 90;
        break;
        
      case direction.S:
        this.forceHitbox.xPos = 0;
        this.forceHitbox.yPos = attackOffset;
        this.forceHitbox.rotation = 180;
        this.forceHitbox.forceX = 0;
        this.forceHitbox.forceY = 8;
        
        this.attackHitbox.xPos = 0;
        this.attackHitbox.yPos = attackOffset;
        this.attackHitbox.rotation = 180;
        break;
        
      case direction.W:
        this.forceHitbox.xPos = -attackOffset;
        this.forceHitbox.yPos = 0;
        this.forceHitbox.rotation = 270;
        this.forceHitbox.forceX = -8;
        this.forceHitbox.forceY = 0;
        
        this.attackHitbox.xPos = -attackOffset;
        this.attackHitbox.yPos = 0;
        this.attackHitbox.rotation = 270;
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
      this.linkedHTMLElement.classList.add("attacking");
      this.attackHitbox.linkedHTMLElement.classList.add("attacking");
      setTimeout(() => {
        this.attackHitbox.enabled = false;
        this.forceHitbox.enabled = false;
        this.linkedHTMLElement.classList.remove("attacking");
        this.attackHitbox.linkedHTMLElement.classList.remove("attacking");
      },
        200
      );
    }
  }
  
  update(deltaTime)
  {
    super.update(deltaTime);
    if(
      InputCatcher.isInputPressed('w') ||
      InputCatcher.isInputPressed('a') ||
      InputCatcher.isInputPressed('s') ||
      InputCatcher.isInputPressed('d')
    )
    {
      this.walkSprite(deltaTime);   
    }
  }
  
  walkSprite(deltaTime)
  { 
    for(let i = 0; i < 2; i++)
      this.linkedHTMLElement.classList.remove(`spriteIndex_${i}`);
    
    for(let dir in direction)
      this.linkedHTMLElement.classList.remove(`direction_${direction[dir]}`);
      
    this.spriteIndex = (this.spriteIndex + (this.spriteSpeed*deltaTime)) % 2;
    this.linkedHTMLElement.classList.add(`direction_${this.direction}`);
    this.linkedHTMLElement.classList.add(`spriteIndex_${Math.floor(this.spriteIndex)}`);   
  }
}
