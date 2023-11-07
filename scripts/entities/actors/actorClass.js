/**
 * These are entities that are controllable. 
 */
class Actor extends Entity
{
  constructor(htmlElement, spriteSheet, initX, initY, name, health)
  {
    super(htmlElement, spriteSheet, initX, initY);
    this.name = name;
    this.maxHealth = health;
    this.health = health;
  }
}
