/**
 * These are entities that are controllable. 
 */
class Actor extends Entity
{
  constructor(htmlElement, spriteSheet, initX, initY, name, health, team, iFrames = 0.5)
  {
    super(htmlElement, spriteSheet, initX, initY);
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.team = team;
    this.direction = direction["N"];
    
    this.iFrames = iFrames;
    this.iFramesMax = iFrames;
    
    this.children = [];
  
    let borderBase = document.createElement("div");
    console.log(this.linkedHTMLElement.style.height);

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
  
  processEntity(deltaTime) 
  {
    this.resetDataTypes();
    if(this.iFrames < this.iFramesMax)
    {
      this.iFrames += deltaTime;
      return;
    }
    
    if(this.enabled)
      this.process(deltaTime);
  }
  
  process(deltaTime) 
  { 
    if(this.health <= 0)
    {
      this.dispose();
      return;
    }
    
    this.iFrames = Math.min(this.iFrames + deltaTime, this.iFramesMax);
    this.children.forEach(child => child.processEntity(deltaTime));  
  }
  
  attachChild(entity)
  {
    if(!(entity instanceof Entity))
      return;
    
    this.linkedHTMLElement.appendChild(entity.linkedHTMLElement);
    this.children.push(entity);
  }
  
  takeDamage(damage, deltaTime)
  {
    if(this.iFrames < this.iFramesMax)
      return;
      
    this.iFrames = 0;
    this.linkedHTMLElement.classList.add("damaged");
    this.health = Math.max(0, this.health - damage);
    setTimeout(() => {
        this.linkedHTMLElement.classList.remove("damaged")
      }, 
    this.iFramesMax*1000);
  }
  
  // Not needed, children are appended as children of this node, so their positions are relative to this
  // translate(deltaX = 0, deltaY = 0)
  // {
  //   super.translate(deltaX, deltaY);
  //   this.children.forEach(child => child.translate(deltaX, deltaY));
  // }
}
