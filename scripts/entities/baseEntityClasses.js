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
    this.children = [];
    
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
  update(deltaTime) 
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
    for(let child of this.children)
    {
      child.dispose();
    }
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
    this.update(0);

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
  
  attachChild(entity)
  {
    if(!(entity instanceof Entity))
      return;
    
    this.linkedHTMLElement.appendChild(entity.linkedHTMLElement);
    this.children.push(entity);
  }
}

class StaticEntity extends Entity
{
  constructor(htmlElement, spriteSheet, initX, initY)
  {
    super(htmlElement, spriteSheet, initX, initY);
    this.initX = initX;
    this.initY = initY;
    this.linkedHTMLElement.classList.add("object");
    
    let borderBase = document.createElement("div");
    borderBase.style.width = "24px";
    borderBase.style.height = "24px";
    borderBase.classList.add("forceEntity");
    this.borderLeft = new Boundary(borderBase.cloneNode(), 0, 4, -32, 0);
    this.borderRight = new Boundary(borderBase.cloneNode(), 32-8, 4, 32, 0);
    this.borderTop = new Boundary(borderBase.cloneNode(), 4, 0, 0, -32);
    this.borderBottom = new Boundary(borderBase.cloneNode(), 4, 32-8, 0, 32);

    this.borderLeft.enabled = true;
    this.borderLeft.linkedHTMLElement.style.width = "8px";
    this.borderLeft.owner = this;

    this.borderRight.enabled = true;
    this.borderRight.linkedHTMLElement.style.width = "8px";
    this.borderRight.owner = this;

    this.borderTop.enabled = true;
    this.borderTop.linkedHTMLElement.style.height = "8px";
    this.borderTop.owner = this;

    this.borderBottom.enabled = true;
    this.borderBottom.linkedHTMLElement.style.height = "8px";
    this.borderBottom.owner = this; 

    this.attachChild(this.borderLeft);
    this.attachChild(this.borderRight);
    this.attachChild(this.borderTop);
    this.attachChild(this.borderBottom);
  }

  process(deltaTime) 
  { 
    super.process();
    this.xPos = this.initX;
    this.yPos = this.initY;
  }
  
  translate(deltaX, deltaY)
  {
    // Do not allow entity to move
    return;
  }
}

