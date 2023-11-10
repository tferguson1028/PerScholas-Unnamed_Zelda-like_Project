class AreaActivate extends Hitbox
{
  constructor(initX, initY, owner, sizeX, sizeY, callOnCollision)
  {
    super(initX, initY, owner, 1.2, 1.2, 0, null);
    this.functionCall = callOnCollision;
    this.linkedHTMLElement.classList.add("interactive");
    this.linkedHTMLElement.style.width = `${sizeX}px`;
    this.linkedHTMLElement.style.height = `${sizeY}px`;
  }
  
  process(deltaTime)
  {
    // super.process(deltaTime);
    if(this.isColliding(playerActor))
    {
      this.functionCall();
    }
  }
}

class AreaInteract extends AreaActivate
{
  constructor(initX, initY, owner, scaleX, scaleY, callOnCollision, interactButton)
  {
    super(initX, initY, owner, scaleX, scaleY, callOnCollision); 
    this.interactButton = interactButton;
  }
  
  process(deltaTime)
  {
    if(InputCatcher.isInputJustPressed(this.interactButton))
      super.process(deltaTime);
  }
}
