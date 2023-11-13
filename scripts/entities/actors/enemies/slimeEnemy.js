class Slime extends Enemy
{
  static spritePath = "";
  constructor(initX, initY, name, health)
  {
    super(new AIStraightPath(), Slime.spritePath, initX, initY, name, health, 1.5);
    this.brain.setOwner(this);
    
    this.linkedHTMLElement.classList.add("sprite_slime");
    this.spriteSpeed = 6;
    this.spriteIndex = 0;
  }
  
  process(deltaTime)
  {
    super.process(deltaTime);
    switch(this.brain.getAction(undefined))
    {
      default:
        let distance = this.brain.distanceToTarget(playerActor);
        this.moveTo(distance.X, distance.Y, deltaTime); 
    }
  }
  
  update(deltaTime)
  {
    super.update(deltaTime);
    this.spriteIndex = (this.spriteIndex + (this.spriteSpeed*deltaTime)) % 4;
    for(let i = 0; i < 4; i++)
      this.linkedHTMLElement.classList.remove(`spriteIndex_${i}`);
    this.linkedHTMLElement.classList.add(`spriteIndex_${Math.floor(this.spriteIndex)}`);
    
    // console.log(this.linkedHTMLElement.classList);
  }
}
