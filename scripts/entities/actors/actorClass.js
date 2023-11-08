/**
 * These are entities that are controllable. 
 */
class Actor extends Entity
{
  constructor(htmlElement, spriteSheet, initX, initY, name, health)
  {
    super(htmlElement, spriteSheet, initX, initY);
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.direction = direction["N"];
    
    this.children = [];
  }
  
  process(deltaTime) { this.children.forEach(child => child.process(deltaTime)); }
  
  attachChild(entity)
  {
    if(!(entity instanceof Entity))
      return;
    
    this.linkedHTMLElement.appendChild(entity.linkedHTMLElement);
    this.children.push(entity);
  }
  
  // Not needed, children are appended as children of this node, so their positions are relative to this
  // translate(deltaX = 0, deltaY = 0)
  // {
  //   super.translate(deltaX, deltaY);
  //   this.children.forEach(child => child.translate(deltaX, deltaY));
  // }
}
