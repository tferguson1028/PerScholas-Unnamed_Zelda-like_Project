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
   * This method updates the CSS based on the Entity's internal variables.
   */
  update() 
  {
    this.linkedHTMLElement.style.translate = `${this.xPos}px ${this.yPos}px`;
  }
}
