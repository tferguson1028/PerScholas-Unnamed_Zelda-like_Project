/**
 * An "abstract" class meant to be extended into defined classes.
 */
class Enemy extends Actor
{
  constructor(aiController, spriteSheet, initX, initY, name, health)
  {
    super(document.createElement("div"), spriteSheet, initX, initY, name, health);
    this.linkedHTMLElement.classList.add("projectile");
    this.brain = aiController;
  }
  
  /**
   * Move in linear direction to given position (x,y)
   * @param {Number} x 
   * @param {Number} y 
   */
  moveTo(x, y)
  {
    
  }
  
  /**
   * Moves in linear direction away from given position (x,y)
   * @param {Number} x 
   * @param {Number} y 
   */
  moveAwayFrom(x, y)
  {
  
  }
}

class EnemyGenerator
{
  static createEnemies(numEnemies)
  {
    let arr = [];
    for(let i = 0; i < numEnemies; i++)
      arr.push(new Enemy(
        new AIController(),
        null,
        0,
        0,
        `enemy_${i}`,
        4
      ));
    
    return arr;
  }
}
