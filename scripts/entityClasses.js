class Entity
{
  constructor(htmlElement, spriteSheet, initX, initY)
  {
    this.linkedHTMLElement = htmlElement;
    this.spriteSheet = spriteSheet;
    this.xPos = initX;
    this.yPos = initY;
  }
  
  translate(deltaX = 0, deltaY = 0)
  {
    this.xPos += Number(deltaX);
    this.yPos += Number(deltaY);
  }

  /**
   * This method updates the CSS based on the Entity's internal variables.
   */
  update() {}

}
