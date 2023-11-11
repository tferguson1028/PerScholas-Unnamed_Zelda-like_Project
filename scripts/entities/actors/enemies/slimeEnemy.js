class Slime extends Enemy
{
  static spritePath = "";
  constructor(initX, initY, name, health)
  {
    super(new AIStraightPath(), Slime.spritePath, initX, initY, name, health, 1.5);
    this.brain.setOwner(this);
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
}
