const aiActions =
{
  0: "none",
  1: "idle",
  2: "moveTo",
  3: "attack",
  4: "moveAway",
  5: "random" 
}

class EnemyAIBase
{
  constructor(owner, target)
  {
    this.owner = owner instanceof Entity ? owner : null;
    this.target = target instanceof Entity ? target : null;
  }
  
  /**
   * Processes mapData to form a heuristic and return a code.
   * This is used to tell Entity instances what to do on each process.
   * @param {String} mapData 
   * @returns String
   */
  getAction(mapData)
  {
    let retAction = aiActions[0];
    return retAction;
  }
  
  distanceToTarget()
  {
    let deltaX = this.owner.xPos - this.target.xPos;
    let daltaY = this.owner.yPos - this.target.yPos;
  }
}


