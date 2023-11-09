class Skeleton extends Enemy
{
  static spritePath = "";
  constructor(initX, initY, name, health)
  {
    super(new AIStraightPath(), spritePath, initX, initY, name, health, 2);
    brain.setOwner(this);
  }
  
  
  process(deltaTime)
  {
    super.process(deltaTime);
    switch(this.brain.getAction(undefined))
    {
      case aiActions.moveTo: break;
      case aiActions.moveAway: break;
      case aiActions.attack: break;
    }
  }
}
