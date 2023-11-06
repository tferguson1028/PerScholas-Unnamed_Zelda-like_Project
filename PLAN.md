# Day 1

### Step 1 - Game Layout Setup
- Create an entire section that the game will be in.
- Add a header which will serve as a section to display player information
- Add a section for the game to be displayed in

### Step 2 - Tilemap CSS
- Create a section where the map will display inside of 
  where the game displays.
- Set the position to absolute.
- Set the display to grid, with template of repeat(18,12)
- Add testing tiles for visibility

### Step 3 - Make entities
- Create div in #gameEntities that will act as the game's 
  entities. Entities are anything that can be interacted with. (Doors, walls, player, enemy, etc.)
- Have these entities originate on the top left of the map.
- Have these entities move with JS.
- Have these entities transform at the center.

<br>

# Day 2

### Step 4 - JS Entity classes
- Specifically make a player, enemy and block entity
- Attach sprites to them

### Step 5 - Game loop
- Use setInterval with a function to create a game loop.
Make this loop run at 60 FPS. Pass a delta var in the game loop.

### Step 6 - Make entities class that will  move with JS
- Implement/Finish input catcher
- Use JS to move entities. This can be done by using el.style.translate
- Use JS to create collision

### Step 7
- Add attacks for player and enemies.
- Use JS to create hitbox-hurtbox reactions.

<br>

# Day 3 - If everything works
### Step 8
- Acquire/create assets
- Apply sprites to all things.

<br>

# Day 4

### Step 9 - Animations :D
- Add animations to attacks

<br> 

# Day 5-7

This is allocated as bleed over time. Fix stuff that ain't working.
