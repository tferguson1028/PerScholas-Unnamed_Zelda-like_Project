/**
 * An "abstract" class meant to be extended into defined classes.
 */
class Enemy extends Actor
{
  constructor(aiController, htmlElement, spriteSheet, initX, initY, name, health)
  {
    super(htmlElement, spriteSheet, initX, initY, name, health);
    this.brain = aiController;
  }
}
