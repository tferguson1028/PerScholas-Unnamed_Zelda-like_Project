function generateMap(mapCode, specialCode = "")
{
  // Removing new lines from string: https://stackoverflow.com/a/10805198
  mapCode = String(mapCode).trim().replace(/(\r\n|\n|\r)/gm, "");
  
  let debugMessage = "";
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
        if(xIndex === 0) newTile.classList.add("tileID-door_closed_left");
        if(xIndex === mapSizeX-1) newTile.classList.add("tileID-door_closed_right");
        if(yIndex === 0) newTile.classList.add("tileID-door_closed_top");
        if(yIndex === mapSizeY-1) newTile.classList.add("tileID-door_closed_bottom");
        break;
      
      case mapKey.door_closed:
        if(xIndex === 0) newTile.classList.add("tileID-door_open_left");
        if(xIndex === mapSizeX-1) newTile.classList.add("tileID-door_open_right");
        if(yIndex === 0) newTile.classList.add("tileID-door_open_top");
        if(yIndex === mapSizeY-1) newTile.classList.add("tileID-door_open_bottom");
        break;
        
      case mapKey.block:
        newTile.classList.add();
        break;
    }
    
    // Was for debugging
    // setTimeout(() => gameMap.appendChild(newTile), 10*i);
    gameMap.appendChild(newTile);
    debugMessage += `\n\t${newTile.classList[newTile.classList.length-1]} @(x = ${xIndex*pixelSize}px, y = ${yIndex*pixelSize}px)`;
  }
  
  console.log("Generated tiles: " + debugMessage);
  tile.remove();
}

function generateEntities(mapCode)
{  
  // Removing new lines from string: https://stackoverflow.com/a/10805198
  mapCode = String(mapCode).trim().replace(/(\r\n|\n|\r)/gm, "");
  for(let i = 0; i < mapSizeX*mapSizeY; i++)
  {
    let xIndex = Math.floor(i%mapSizeX);
    let yIndex = Math.floor(i/mapSizeX);
    switch(mapCode.charAt(i))
    {
      case mapKey.player: // No longer needed
        // playerActor.xPos = xIndex*pixelSize;
        // playerActor.yPos = yIndex*pixelSize;
        break;
        
      case mapKey.rock:
        break;
    
      /* FIXME: 
       ! Enemies spawned in the center are being pushed to
       ! the left boundary
      */ 
      
      // No need to make variable. Entities attach themselves to the entity list when instanced.
      case mapKey.enemy_type0:
        console.log(`New enemy${mapKey.enemy_type0} @(x = ${xIndex*pixelSize}px, y = ${yIndex*pixelSize}px)`);
        new Slime((xIndex)*pixelSize, (yIndex)*pixelSize, `slime${i}`, 6);
        break;
      
      case mapKey.enemy_type1:
        break;
        
      case mapKey.enemy_random:
        break;
    }
  }
}


function clearRoom()
{
  //No need to increment i as length gets smaller with each deletion.
  let debugMessage = "";
  for(let i = 0; i < gameMap.children.length; )
  {
    debugMessage += `\n\t${gameMap.children[i].classList[gameMap.children[i].classList.length-1]}`;
    gameMap.children[i].remove();
  }
  console.log("Removing Tiles: " + debugMessage);
}

