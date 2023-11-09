/**
 * These are used to create attacks and damage. 
 * All hitboxes should be projectile class.
 * They will persist until their lifetime is over, then it will
 * delete itself.
 */
class Projectile extends Entity
{
  constructor(spriteSheet, initX, initY, owner, scaleX, scaleY, damage = 0)
  {
    super(document.createElement("div"), spriteSheet, initX, initY);
    this.linkedHTMLElement.classList.add("projectile");

    this.owner = owner;
    
    this.scaleX = scaleX || this.linkedHTMLElement.getBoundingClientRect().width;
    this.scaleY = scaleY || this.linkedHTMLElement.getBoundingClientRect().height;
    this.damage = damage;
    this.lifeTime = 0;
    this.speedX = 0;
    this.speedY = 0;
  }
  
  process(deltaTime)
  {
    if(this.lifeTime <= 0 && this.lifeTime !== null) 
    {
      this.dispose(); 
      return; 
    }
    
    for(let entity of entityList) 
    {
      this.doDamage(entity, deltaTime);
    }
    
    // If lifeTime is null, do nothing, else subtract it by deltaTime
    this.lifeTime = this.lifeTime === null ? null : this.lifeTime - deltaTime;
    this.translate(this.speedX*deltaTime, this.speedY*deltaTime);
  }
  
  doDamage(other, deltaTime)
  {
    if(other === this.owner || this.owner.team === other.team)
      return;
      
    if(this.isColliding(other) && other instanceof Actor)
      other.takeDamage(this.damage, deltaTime);
  }
  
  startTraverse(speedX, speedY, lifeTime)
  {
    this.lifeTime = lifeTime;
    this.speedX = speedX;
    this.speedY = speedY;
  }
}

class Interactable extends Projectile
{
}

/**
 * Realizing that this class is kinda useless since Projectile has all the same functionality
 * and I'm just removing functionality to make this different
 */
class Hitbox extends Projectile
{
  constructor(initX, initY, owner, scaleX, scaleY, damage = 0, lifeTime = null)
  {
    super(null, initX, initY, owner, scaleX, scaleY, damage);
    this.lifeTime = lifeTime;
  }
}
