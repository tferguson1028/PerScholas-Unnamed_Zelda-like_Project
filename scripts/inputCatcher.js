/**
 * Functions as a static class which holds all current key/mouse
 * inputs made by the user.
 * I'm doing this because JS event listeners catch hold inputs
 * as if you're typing, making them unusable as hold keys in games.
 */
 
// I making this myself. I've done it before, just not in JS
class InputCatcher
{
  static inputList = [];
  static inputHold = [];

  /**
   * Increases input hold every cycle
   * @param {Number} deltaTime 
   */
  static update(deltaTime) 
  {
    for(let i = 0; i < this.inputHold.length; i++)
    {
      this.inputHold[i] = this.inputHold[i] >= 1 ? this.inputHold[i] + deltaTime : -1;
    } 
    // console.log(this.inputList);
    // console.log(this.inputHold);
  }

  /**
   * Adds input to inputList and 1 to inputHold. 
   * If already inputList, sets inputHold on same index to 1.
   * @param {String} inputCode 
   */
  static catchInput(input) 
  {
    let index = this.inputList.indexOf(input);
    if(index === -1)
    {
      this.inputList.push(input);
      this.inputHold.push(1);
    }else if(this.inputHold[index] < 1)
    {
      this.inputHold[index] = 1;
    }
  }
  
  /**
   * Sets inputHold at inputList index to 0.
   * @param {String} inputCode 
   */
  static removeInput(input) 
  {
    // Since we know an input has to be pressed to be in the catcher, we don't need to check beforehand.
    /* WONTFIX
      Turns out there's a bug where isJustReleased() can return true before a press is done.
      This happens because the eventListeners and update functions don't run synchronously.
      This requires computer like reflexes and is impractical for any person to reproduce consistently,
      and I like the bug so I'm keeping it this way :P 
    */
    this.inputHold[this.inputList.indexOf(input)] = 0;
  }
  
  /**
   * Returns if an input is being pressed or not.
   * @param {String} input 
   * @returns Boolean
   */
  static isInputPressed(input) 
  { 
    let index = this.getInputIndex(input);
    if(index !== -1)
      return this.inputHold[index] > 0;
    return false;
  }
  
  /**
   * Returns the time an input has been held down.
   * @param {String} input 
   * @returns Number | Boolean
   */
  static isInputHeld(input) 
  {
    let index = this.getInputIndex(input);
    if(index !== -1)
      return this.inputHold[index];
    return false;
  }
  
  /**
   * Returns if an input is pressed this frame or not.
   * @param {String} input 
   * @returns Boolean
   */
  static isInputJustPressed(input)
  { 
    let index = this.getInputIndex(input);
    if(index !== -1)
      return this.inputHold[index] === 1;
    return false;  
  }
  
  /**
   * Returns is an input is released this frame or not.
   * @param {String} input 
   * @returns Boolean
   */
  static isInputJustReleased(input)
  { 
    let index = this.getInputIndex(input);
    if(index !== -1)
      return this.inputHold[index] === 0;
    return false;  
  }
  
  /**
   * Returns the index of an input. If no index is found, returns -1
   * @param {String} input 
   * @returns Number
   */
  static getInputIndex(input)
  {
    let index = this.inputList.indexOf("Key_"+input);
    index = index === -1 ? this.inputList.indexOf("Mouse_"+input) : index;
    return index;
  }
}

//# Input listening

document.addEventListener("keydown", (event) => InputCatcher.catchInput("Key_"+event.key.toLowerCase()));
document.addEventListener("keyup", (event) => InputCatcher.removeInput("Key_"+event.key.toLowerCase()));

document.addEventListener("mousedown", (event) => InputCatcher.catchInput("Mouse_"+event.button));
document.addEventListener("mouseup", (event) => InputCatcher.removeInput("Mouse_"+event.button));

/* The way it works
  
  1. We attach EventListeners for possible inputs to the document, each calling a catch/remove input function.
  2. Add the input to the inputList array and place a 1 in it's identical position within the inputHold array.
  3. When an input is released, set the inputHold of the input's identical position in inputList to 0;
  4. On update(), 
    - add deltaTime to each inputHold that is greater than or equal to 1, to determine how long the button haas been held.
    - set any 0 inputHold values to -1, which gives functionality to just released. 

  This gives us 3 states
    - Just pressed
    - Held
    - Just released
    
  Anytime we call a static method isInput...() in the game loop, we can check if the input is in one of those states.
*/
