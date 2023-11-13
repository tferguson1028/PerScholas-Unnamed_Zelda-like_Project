class Slime extends Enemy
{
  static spritePath = "";
  constructor(initX, initY, name, health)
  {
    super(new AIStraightPath(), Slime.spritePath, initX, initY, name, health, 1.5);
    this.brain.setOwner(this);
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
    super.update(deltaTime)
    {
      this.spriteIndex = (this.spriteIndex + (this.spriteSpeed*deltaTime)) % 4;
      this.linkedHTMLElement.style.backgroundImage = `url(../../../../assets/sprites/slime/slime_${Math.floor(this.spriteIndex)}.png)`;    
    }
  }
}
