
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
    this.owner = null;
    // entityList.splice(entityList.indexOf(this));
    // this.linkedHTMLElement.style.zIndex = "-100";
  }
  
  process(deltaTime)
  {
    super.process(deltaTime);
    entityList.forEach((entity) =>
    {
      if(entity instanceof Actor && entity !== this.owner)
        this.pushOut(entity, deltaTime);
    });
  }
  
  pushOut(other, deltaTime)
  {
    if(!(other instanceof Actor))
      return;
    if(this.isColliding(other))
    {
      other.translate(this.forceX*pixelSize*deltaTime, this.forceY*pixelSize*deltaTime);
    }
  }
  
  pushAsBoundary(other, deltaTime)
  {
    if(!(other instanceof Actor))
      return;
    let timeout = 0;
    while(++timeout < 1000 && this.isColliding(other))
      other.translate(this.forceX*deltaTime, this.forceY*deltaTime);
  }
}

class Boundary extends Force
{
  process(deltaTime)
  {
    entityList.forEach((entity) =>
    {
      if(entity instanceof Actor && entity !== this.owner)
        this.pushAsBoundary(entity, deltaTime);
    });
    super.process(deltaTime);
  }
}
