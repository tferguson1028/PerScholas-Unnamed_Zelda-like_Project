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
    
    this.spriteIndex = 0;
    this.enabled = true;
        
    entityList.unshift(this); // unshift() works better in gameplay than push().
  }
  
  /**
   * A "final" function that is used by the gameLoop.js script to process
   * It is used for enabling and disabling instances of Entity and allows
   * process() to be changed by inheriting classes without having to rewrite
   * this in other places.
   * @param {*} deltaTime 
   * @returns 
   */
  processEntity(deltaTime) 
  { 
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
