/**
 * These are used to create attacks and damage. 
 * All hitboxes should be projectile class.
 * They will persist until their lifetime is over, then it will
 * delete itself.
 */
class Projectile extends Entity
{
  constructor(spriteSheet, initX, initY, owner, sizeX, sizeY, damage = 0)
  {
    super(document.createElement("div"), spriteSheet, initX, initY);
    this.linkedHTMLElement.classList.add("projectile");

    this.owner = owner;
    
    this.sizeX = sizeX || this.linkedHTMLElement.getBoundingClientRect().width;
    this.sizeY = sizeY || this.linkedHTMLElement.getBoundingClientRect().height;
    this.damage = damage;
    this.lifeTime = 0;
    this.speedX = 0;
    this.speedY = 0;
  }
  
  process(deltaTime)
  {
    if(this.lifeTime <= 0) { this.dispose(); return; }
    
    this.lifeTime -= deltaTime;
    this.translate(this.speedX*deltaTime, this.speedY*deltaTime);
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

class Hitbox extends Projectile
{
  constructor(initX, initY, owner, sizeX, sizeY, damage = 0, lifeTime = -1)
  {
    super(null, initX, initY, owner, sizeX, sizeY, damage);
    this.lifeTime = lifeTime;
  }
}
