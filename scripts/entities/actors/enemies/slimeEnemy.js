class Slime extends Enemy
{
  static spritePath = "";
  constructor(initX, initY, name, health)
  {
    super(new AIStraightPath(), Slime.spritePath, initX, initY, name, health, 1.5);
    this.brain.setOwner(this);
    this.spriteSpeed = 0.001;
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
  
  update()
  {
    super.update()
    {
      this.spriteIndex = (this.spriteIndex + this.spriteSpeed) % 4;
      this.linkedHTMLElement.style.backgroundImage = `url(../../../../assets/sprites/slime/slime_${Math.floor(this.spriteIndex)}.png)`;    
    }
  }
}
