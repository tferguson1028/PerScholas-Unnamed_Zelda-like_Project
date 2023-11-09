/**
 * These are entities that are controllable. 
 */
class Actor extends Entity
{
  constructor(htmlElement, spriteSheet, initX, initY, name, health, iFrames = 0.5)
  {
    super(htmlElement, spriteSheet, initX, initY);
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.direction = direction["N"];
    
    this.iFrames = iFrames;
    this.iFramesMax = iFrames;
    
    this.children = [];
  }
  
  process(deltaTime) 
  { 
    if(this.health <= 0)
    {
      this.dispose();
      return;
    }
    
    this.iFrames = Math.min(this.iFrames + deltaTime, this.iFramesMax);
    this.children.forEach(child => child.process(deltaTime));  
  }
  
  attachChild(entity)
  {
    if(!(entity instanceof Entity))
      return;
    
    this.linkedHTMLElement.appendChild(entity.linkedHTMLElement);
    this.children.push(entity);
  }
  
  takeDamage(damage)
  {
    if(this.iFrames < this.iFramesMax)
      return;
      
    this.iFrames = 0;
    this.health = Math.max(0, this.health - damage);
  }
  
  // Not needed, children are appended as children of this node, so their positions are relative to this
  // translate(deltaX = 0, deltaY = 0)
  // {
  //   super.translate(deltaX, deltaY);
  //   this.children.forEach(child => child.translate(deltaX, deltaY));
  // }
}
