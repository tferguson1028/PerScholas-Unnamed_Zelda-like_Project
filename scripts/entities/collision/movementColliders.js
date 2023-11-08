
/**
 * Applies movement to any entity currently colliding with it.
 */
class Force extends Entity
{
  constructor(htmlElement, initX, initY, forceX, forceY)
  {
    super(htmlElement, null, initX, initY);
    this.forceX = forceX;
    this.forceY = forceY;
    this.enabled = false;
    // entityList.splice(entityList.indexOf(this));
    // this.linkedHTMLElement.style.zIndex = "-100";
  }
  
  process(deltaTime)
  {
    entityList.forEach((entity) =>
    {
      if(entity instanceof Actor)
        this.pushOut(entity, deltaTime);
    });
  }
  
  pushOut(other, deltaTime)
  {
    if(this.isColliding(other))
    {
      other.translate(this.forceX*pixelSize*deltaTime, this.forceY*pixelSize*deltaTime);
    }
  }
  
  pushAsBoundary(other, deltaTime)
  {
    let timeout = 0;
    while(++timeout < 1000 && this.isColliding(other))
      other.translate(this.forceX*deltaTime, this.forceY*deltaTime);
  }
}
