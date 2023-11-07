/**
 * These are entities that are controllable. 
 */
class Actor extends Entity
{
  constructor(htmlElement, spriteSheet, initX, initY, sizeX, sizeY, name, health)
  {
    super(htmlElement, spriteSheet, initX, initY, sizeX, sizeY);
    this.name = name;
    this.maxHealth = health;
    this.health = health;
  }
}
