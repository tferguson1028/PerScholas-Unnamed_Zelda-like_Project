class Entity
{
  constructor(htmlElement, spriteSheet, initX, initY)
  {
    this.linkedHTMLElement = htmlElement;
    this.linkedHTMLElement.style.position = "absolute";
    gameEntities.appendChild(this.linkedHTMLElement);
    
    this.linkedHTMLElement.style.zIndex = "-1";
    
    this.spriteSheet = spriteSheet;
    this.xPos = initX;
    this.yPos = initY;
    
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
    // This makes collision work
    this.update();

    // https://stackoverflow.com/a/63419039
    return this.linkedHTMLElement.getBoundingClientRect();
  }
  
  isColliding(other)
  {
    // Used solution from https://stackoverflow.com/a/63419039 as reference
    if(!(other instanceof Entity) || this === other)
      return false;
    
    let thisCollider = this.getCollisionBox();
    let otherCollider = other.getCollisionBox();
    
    let result = (
      (
        thisCollider.left <= otherCollider.right &&
        thisCollider.right >= otherCollider.left
      ) &&
      (
        thisCollider.top <= otherCollider.bottom &&
        thisCollider.bottom >= otherCollider.top
      )
    );
    return result;
  }
  
  isCompletelyOverlapping(other)
  {
    if(!(other instanceof Entity))
    return false;
    
    let thisCollider = this.getCollisionBox();
    let otherCollider = other.getCollisionBox();
    
    let result = (
      (
        thisCollider.left >= otherCollider.left &&
        thisCollider.right <= otherCollider.right
      ) &&
      (
        thisCollider.top >= otherCollider.top &&
        thisCollider.bottom <= otherCollider.bottom
      )
    );
    return result;
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

class Force extends Entity
{
  constructor(htmlElement, initX, initY, forceX, forceY)
  {
    super(htmlElement, null, initX, initY);
    this.forceX = forceX;
    this.forceY = forceY;
    // entityList.splice(entityList.indexOf(this));
    // this.linkedHTMLElement.style.zIndex = "-100";
  }
  
  pushOut(other, deltaTime)
  {
    if(this.isColliding(other))
    {
      other.translate(this.forceX*deltaTime, this.forceY*deltaTime);
    }
  }
  
  pushAsBoundary(other, deltaTime)
  {
    let timeout = 0;
    while(++timeout < 1000 && this.isColliding(other))
      other.translate(this.forceX*deltaTime, this.forceY*deltaTime);
  }
}
