function generateMap(mapCode)
{
  // https://stackoverflow.com/a/15040335
  for(let child of gameMap.children)
    child.className = "tile";
    
  for(let i = 0; i < gameMap.children.length; i++)
  {
    let xIndex = Math.floor(i%pixelSize);
    let yIndex = Math.floor(i/pixelSize);
    switch(mapCode[i])
    {
      // Dungeon Walls
      case mapKey.wall:
        if(xIndex === 0)
        {
          if(yIndex === 0) gameMap.children[i].classList.add("tileID-wall_top_left");
          else if (yIndex === mapSizeY-1) gameMap.children[i].classList.add("tileID-wall_top_right");
          else gameMap.children[i].classList.add("tileID-wall_top");
        }else if(xIndex === mapSizeX-1)
        {
          if(yIndex === 0) gameMap.children[i].classList.add("tileID-wall_bottom_left");
          else if (yIndex === mapSizeY-1) gameMap.children[i].classList.add("tileID-wall_bottom_right");
          else gameMap.children[i].classList.add("tileID-wall_bottom");
        }else
        {
          if(yIndex === 0) gameMap.children[i].classList.add("tileID-wall_left");
          else if (yIndex === mapSizeY-1) gameMap.children[i].classList.add("tileID-wall_right");
          else gameMap.children[i].classList.add("tileID-wall_center");
        }
        break;

      //TODO      
      // Dungeon Doors
      case mapKey.door_open:
        gameMap.children[i].classList.add("tileID0");
        break;
      
      case mapKey.door_closed:
        break;
        
      case mapKey.block:
        break;
        
      case mapKey.player:
        break;
        
      case mapKey.enemy_random:
        break;
    }
  }
}
