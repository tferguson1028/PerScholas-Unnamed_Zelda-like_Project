/**
 * An "abstract" class meant to be extended into defined classes.
 */
class Enemy extends Actor
{
  constructor(aiController, spriteSheet, initX, initY, name, health, speed)
  {
    super(document.createElement("div"), spriteSheet, initX, initY, name, health);
    this.linkedHTMLElement.classList.add("entity");
    this.brain = aiController instanceof EnemyAIBase ? aiController : new EnemyAIBase();
    this.speed = speed || 1;
    
    this.hurtForceLeft = new Force(this.linkedHTMLElement.cloneNode(), -24, 0, this.borderLeft.forceX, this.borderLeft.forceY);
    this.hurtForceRight = new Force(this.linkedHTMLElement.cloneNode(), 24, 0, this.borderRight.forceX, this.borderRight.forceY);
    this.hurtForceTop = new Force(this.linkedHTMLElement.cloneNode(), 0, -24, this.borderTop.forceX, this.borderTop.forceY);
    this.hurtForceBottom = new Force(this.linkedHTMLElement.cloneNode(), 0, 24, this.borderBottom.forceX, this.borderBottom.forceY);
    
    this.hurtForceLeft.scaleY = 1.5;
    this.hurtForceRight.scaleY = 1.5;
    
    this.hurtForceLeft.linkedHTMLElement.className = "forceEntity";
    this.hurtForceRight.linkedHTMLElement.className = "forceEntity";
    this.hurtForceTop.linkedHTMLElement.className = "forceEntity";
    this.hurtForceBottom.linkedHTMLElement.className = "forceEntity";
    
    this.hurtForceLeft.enabled = false;
    this.hurtForceRight.enabled = false;
    this.hurtForceTop.enabled = false;
    this.hurtForceBottom.enabled = false;
    
    this.hurtForceLeft.owner = this;
    this.hurtForceRight.owner = this;
    this.hurtForceTop.owner = this;
    this.hurtForceBottom.owner = this;
    
    this.hurtArea = new Hitbox(0, 0, this, 1.1, 1.1, 1);    
    this.hurtArea.enabled = true;
    
    this.attachChild(this.hurtArea);
    this.attachChild(this.hurtForceLeft);
    this.attachChild(this.hurtForceRight);
    this.attachChild(this.hurtForceTop);
    this.attachChild(this.hurtForceBottom);
  }
  
  process(deltaTime)
  {
    super.process(deltaTime);
    if(this.hurtArea.isColliding(playerActor))
    {
      console.log(playerActor.health);
      this.hurtForceLeft.enabled = true;
      this.hurtForceRight.enabled = true;
      this.hurtForceTop.enabled = true;
      this.hurtForceBottom.enabled = true;
    }else
    {
      this.hurtForceLeft.enabled = false;
      this.hurtForceRight.enabled = false;
      this.hurtForceTop.enabled = false;
      this.hurtForceBottom.enabled = false;
    }
      
  }
  
  /**
   * Move in linear direction to given position (x,y)
   * @param {Number} x 
   * @param {Number} y 
   */
  moveTo(x, y, deltaTime)
  {
    let xSign = -x/(Math.abs(x));
    let ySign = -y/(Math.abs(y));
    this.translate(this.speed*deltaTime*pixelSize*xSign, this.speed*pixelSize*deltaTime*ySign);
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

