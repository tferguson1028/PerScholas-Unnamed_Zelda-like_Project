function generateMap(mapCode, specialCode = "")
{
  // Removing new lines from string: https://stackoverflow.com/a/10805198
  mapCode = String(mapCode).trim().replace(/(\r\n|\n|\r)/gm, "");

  let tile = document.createElement("div");
  tile.className = `tile ${specialCode}`;

  for(let i = 0; i < mapSizeX*mapSizeY; i++)
  {
    let newTile = tile.cloneNode();
    let xIndex = Math.floor(i%mapSizeX);
    let yIndex = Math.floor(i/mapSizeX);
    switch(mapCode.charAt(i))
    {
      // Dungeon Walls
      case mapKey.wall:
        if(yIndex === 0)
        {
          if(xIndex === 0) newTile.classList.add("tileID-wall_top_left");
          else if (xIndex === mapSizeX-1) newTile.classList.add("tileID-wall_top_right");
          else newTile.classList.add("tileID-wall_top");
        }else if(yIndex === mapSizeY-1)
        {
          if(xIndex === 0) newTile.classList.add("tileID-wall_bottom_left");
          else if (xIndex === mapSizeX-1) newTile.classList.add("tileID-wall_bottom_right");
          else newTile.classList.add("tileID-wall_bottom");
        }else
        {
          if(xIndex === 0) newTile.classList.add("tileID-wall_left");
          else if (xIndex === mapSizeX-1) newTile.classList.add("tileID-wall_right");
          else newTile.classList.add("tileID-wall_center");
        }
        break;

      //TODO: Setup tile code classes in CSS and use this function to attach them to tiles. 
      // Dungeon Doors
      case mapKey.door_open:
        newTile.classList.add("tileID0");
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
    
    gameMap.appendChild(newTile);
  }
}
