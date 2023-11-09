## Project is behind schedule, moving things around

## What I have

### ☑ Day 1-4

- ☑ HTML Setup
- ☑ CSS setup
- ☑ Frame-based input catching
- ☑ Game loop
- ☑ Tilemap Testing
- ☑ General classes
- ☑ Collision
- ☑ Damage detection via collision
- ☑ Player class
- ☑ General Enemy class
- ☑ General Enemy AI
- ☑ Passable folder structure


## What I still need

### Day 5-6

The project needs to be decreased in scale to fit assignment requirements.
The new goal on this day is to implement these features:
- The win state will be highest room reached.
- The lose state is when the player dies. I must:
  - Tell the user game over
  - Show the room number they got with the best they've gotten before
  - Show a restart button with it
- Round system. How it will work; when player enters a door:
  - The map will be regenerated from one of the map strings
  - The player will be placed on the opposite side of the room
  - Enemies will be generated 
  - Enemy health and density will increase

For these to be implemented, I need to make:
- Map generation w/ presets
- A door entity that uses collision to call functions. 
The processes it will do are:
  - Generate a new map
  - Move player to where entrance would be
  - Populate room with randomly generated enemies
  - Increase difficulty and room count
- A start button which will:
  - Begin the game loop
  - Generate the empty room with 3 doors open (top, left, right)
- A reset button which will:
  - Reload the page because that's easier that resetting vars.


## What I would also like

### Day 7
- Semi-uniform looking / custom assets
- Readable GUI
- Animation
- Project page under the game
- Music

