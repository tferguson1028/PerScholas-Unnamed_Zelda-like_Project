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

      // Dungeon Doors
      case mapKey.door_open:
        // Left Door
        if(xIndex === 0)
        {
          let id = "tileID-door_left";
          if(document.querySelectorAll(`.${id}`).length === 0) newTile.classList.add(id, "door_0", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 1) newTile.classList.add(id, "door_1", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 2) newTile.classList.add(id, "door_2", "door_closed");
        }
        
        // Right Door
        if(xIndex === mapSizeX-1) 
        {          
          let id = "tileID-door_right";
          if(document.querySelectorAll(`.${id}`).length === 0) newTile.classList.add(id, "door_0", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 1) newTile.classList.add(id, "door_1", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 2) newTile.classList.add(id, "door_2", "door_closed");
        }
        
        // Top Door
        if(yIndex === 0)
        {          
          let id = "tileID-door_top";
          if(document.querySelectorAll(`.${id}`).length === 0) newTile.classList.add(id, "door_0", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 1) newTile.classList.add(id, "door_1", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 2) newTile.classList.add(id, "door_2", "door_closed");
        }
        
        // Bottom Door
        if(yIndex === mapSizeY-1)
        {          
          let id = "tileID-door_bottom";
          if(document.querySelectorAll(`.${id}`).length === 0) newTile.classList.add(id, "door_0", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 1) newTile.classList.add(id, "door_1", "door_closed");
          else if(document.querySelectorAll(`.${id}`).length === 2) newTile.classList.add(id, "door_2", "door_closed");
        }
        break;
      
      case mapKey.door_closed:
        if(xIndex === 0) newTile.classList.add("tileID-door_open_left");
        if(xIndex === mapSizeX-1) newTile.classList.add("tileID-door_open_right");
        if(yIndex === 0) newTile.classList.add("tileID-door_open_top");
        if(yIndex === mapSizeY-1) newTile.classList.add("tileID-door_open_bottom");
        break;
        
      case mapKey.block:
        newTile.classList.add("tileID-block");
        new StaticEntity(newTile.cloneNode(), null, xIndex*pixelSize, yIndex*pixelSize);
        break;
        
      default:
        newTile.classList.add("tileID-floor");
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
  
  for(let i = 0; i < entityList.length; i++)
  {
    if(entityList[i].linkedHTMLElement.classList.contains("object"))
    {
      entityList[i].dispose();
      i--;
    }
  }
}

