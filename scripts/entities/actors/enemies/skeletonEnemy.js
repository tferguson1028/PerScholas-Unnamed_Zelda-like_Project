class Skeleton
{
  static spritePath = "";
  constructor(initX, initY, name, health)
  {
    super(new AIStraightPath(), spritePath, initX, initY, name, health);
    brain.setOwner(this);
  }
  
  
  process(deltaTime)
  {
    super.process();
    switch(this.brain.getAction(undefined))
    {
      case aiActions.moveTo: break;
      case aiActions.moveAway: break;
      case aiActions.attack: break;
    }
  }
}
