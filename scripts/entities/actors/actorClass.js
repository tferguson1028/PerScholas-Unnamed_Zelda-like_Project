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
  
  process(deltaTime) { this.children.forEach(child => child.process())};
  
  attachChild(entity)
  {
    if(!(entity instanceof Entity))
      return;
      
    this.linkedHTMLElement.appendChild(entity.linkedHTMLElement);
    this.children.push(entity);
  }
}
