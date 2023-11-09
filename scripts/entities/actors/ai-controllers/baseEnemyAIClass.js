const aiActions =
{
  none: 0,
  idle: 1,
  moveTo: 2,
  attack: 3,
  moveAway: 4,
  random: 5
}

class EnemyAIBase
{
  setOwner(owner)
  {
    this.owner = owner instanceof Entity ? owner : null;
  }
  
  /**
   * Processes mapData to form a heuristic and return a code.
   * This is used to tell Entity instances what to do on each process.
   * This function is meant to be overridden by extending classes.
   * @param {String} mapData 
   * @returns String
   */
  getAction(mapData)
  {
    let retAction = aiActions[0];
    return retAction;
  }
  
  distanceToTarget(target)
  {
    let deltaX = this.owner.xPos - target.xPos;
    let deltaY = this.owner.yPos - target.yPos;
    
    return {X: deltaX, Y: deltaY};
  }
}

class AIStraightPath
{
  getAction(mapData)
  {
    return aiActions[2];
  }
}


