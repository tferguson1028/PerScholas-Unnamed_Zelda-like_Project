/**
 * Base class for all objects use in the game
 */
class Entity
{
  constructor(htmlElement, spriteSheet, initX, initY)
  {
    this.linkedHTMLElement = htmlElement;
    this.linkedHTMLElement.style.position = "absolute";
    gameEntities.appendChild(this.linkedHTMLElement);
    this.linkedHTMLElement.style.zIndex = "-1";
    
    this.spriteSheet = spriteSheet;
    this.xPos = Number(initX);
    this.yPos = Number(initY);
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    
    this.spriteIndex = 0;
    this.enabled = true;
        
    entityList.push(this);
  }
  
  /**
   * This functions sets all primitive vars to the datatype they're intended to be
   */
  resetDataTypes()
  {
    if(typeof this.xPos !== "number" || isNaN(this.xPos)) this.xPos = Number(this.xPos) || 0;
    if(typeof this.yPos !== "number" || isNaN(this.yPos)) this.yPos = Number(this.yPos) || 0;
  }
  
  /**
   * A "final" function that is used by the gameLoop.js script to process
   * It is used for enabling and disabling instances of Entity and allows
   * process() to be changed by inheriting classes without having to rewrite
   * this in other places.
   * @param {Number} deltaTime 
   * @returns 
   */
  processEntity(deltaTime) 
  {
    this.resetDataTypes();
    if(this.enabled)
      this.process(deltaTime);
  }
  
  /**
   * Holds logic for updating entities. Is empty in base entity class.
   * Expected to be overridden in derived classes.
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
      // this.linkedHTMLElement.style.top = `${this.yPos}px`;
      // this.linkedHTMLElement.style.left = `${this.xPos}px`;
      this.linkedHTMLElement.style.translate = `${this.xPos}px ${this.yPos}px`;
      this.linkedHTMLElement.style.scale = `${this.scaleX} ${this.scaleY}`;
      this.linkedHTMLElement.style.rotate = `${this.rotation}deg`;
    }
  }
  
  /**
   * Sets an object up for garbage collection.
   */
  dispose()
  {
    // https://stackoverflow.com/a/10314492
    console.log(`Disposing ${this.constructor.name}`);
    this.linkedHTMLElement.remove();
    entityList.splice(entityList.indexOf(this), 1);
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
   * Protates the element in degrees
   * @param {Number} degrees 
   */
  rotate(degrees)
  {
    this.rotation += degrees;
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
