/**
 * Functions as a static class which holds all current key/mouse
 * inputs made by the user.
 */
 
// I making this myself. I've done it before, just not in JS
class InputCatcher
{
  static inputList = [];
  static inputHold = [];

  static update(deltaTime) {}

  static catchInput(inputCode) {}
  static removeInput(inputCode) {}
  
  /**
   * Returns if an input is being pressed or not
   * @param {*} input 
   * @returns boolean
   */
  static isInputPressed(input) { return bool; }
  
  /**
   * Returns the time an input has been held down
   * @param {*} input 
   * @returns number | boolean
   */
  static isInputHeld(input) { return number; }
  
  /**
   * Returns if an input is pressed this frame or not
   * @param {*} input 
   * @returns boolean
   */
  static isInputJustPressed(input) { return bool; }
  
  /**
   * Returns is an input is released this frame or not
   * @param {*} input 
   * @returns boolean
   */
  static isInputJustReleased(input) { return bool; }  
}

//# Input listening

document.addEventListener("keydown", (event) => InputCatcher.catchInput(event.key));
document.addEventListener("keyup", (event) => InputCatcher.removeInput(event.key));

document.addEventListener("mousedown", (event) => InputCatcher.catchInput(event.key));
document.addEventListener("mouseup", (event) => InputCatcher.removeInput(event.key));

/* The way it works
  
  1. We attach EventListeners for possible inputs to the document, each calling a catch/remove input function.
  2. Add the input to the inputList array and place a 1 in it's identical position within the inputHold array.
  3. On update(), add deltaTime to each inputHold that is greater than or equal to 1, to determine how long the button haas been held.
  4. When an input is released, set the inputHold of the input's identical position in inputList to 0;

  This gives us 3 states
    - Just pressed
    - Held
    - Just released
    
  Anytime we call a static method isInput...() in the game loop, we can check if the input is in one of those states.
*/
