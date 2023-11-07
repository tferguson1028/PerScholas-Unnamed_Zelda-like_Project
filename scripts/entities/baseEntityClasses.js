class Entity
{
  constructor(htmlElement, spriteSheet, initX, initY, sizeX, sizeY)
  {
    this.linkedHTMLElement = htmlElement;
    this.spriteSheet = spriteSheet;
    this.xPos = initX;
    this.yPos = initY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    
    this.spriteIndex = 0;
    
    entityList.push(this);
  }
  
  /**
   * Moves the internal position by given arguments.
   * @param {Number} deltaX 
   * @param {Number} deltaY 
   */
  translate(deltaX = 0, deltaY = 0)
  {
    this.xPos += Number(deltaX);
    this.yPos += Number(deltaY);
  }
    
  /**
   * Holds logic for updating entities. Is empty in base entity class.
   * @param {Number} deltaTime 
   */
  process(deltaTime) {}
  
  /**
   * Updates the CSS based on the Entity's internal variables.
   */
  update() 
  {
    if(typeof this.linkedHTMLElement !== "undefined")
    {
      this.linkedHTMLElement.style.translate = `${this.xPos}px ${this.yPos}px`;
    }
  }
  
  /**
   * Sets an object up for garbage collection.
   */
  dispose()
  {
    this.linkedHTMLElement.remove();
    delete this;
  }
  
  getCollisionBox()
  {
    // https://stackoverflow.com/a/63419039
    return this.linkedHTMLElement.getBoundingClientRect();
  }
  
  isColliding(other)
  {
    // Used solution from https://stackoverflow.com/a/63419039
    if(!other instanceof Entity)
      return false;
    
    let thisCollider = this.getCollisionBox();
    let otherCollider = other.getCollisionBox();
    
    // I shortened the code
    return !(
      thisCollider.left >= otherCollider.right || 
      thisCollider.right >= otherCollider.left ||
      thisCollider.top <= otherCollider.bottom ||
      thisCollider.bottom <= otherCollider.top
    );
  }
  
}

class Interactable extends Entity
{
  
}

/**
 * These are used to create attacks and damage. 
 * All hitboxes should be projectile class.
 * They will persist until their lifetime is over, then it will
 * delete itself.
 */
class Projectile extends Entity
{
  lifeTime = 0;
  speedX = 0;
  speedY = 0;
  owner = null;
  
  process(deltaTime)
  {
    if(this.lifeTime <= 0) { this.destroy(); return; }
    
    this.lifeTime -= deltaTime;
    this.translate(this.speedX*deltaTime, this.speedY*deltaTime);
  }
  
  startTraverse(speedX, speedY, lifeTime)
  {
    this.lifeTime = lifeTime;
    this.speedX = speedX;
    this.speedY = speedY;
  }
}
