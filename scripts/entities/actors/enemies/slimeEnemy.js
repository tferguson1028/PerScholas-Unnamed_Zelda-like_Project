class Slime extends Enemy
{
  static spritePath = "";
  constructor(initX, initY, name, health)
  {
    super(new AIStraightPath(), spritePath, initX, initY, name, health);
  }
}
