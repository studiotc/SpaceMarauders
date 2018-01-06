

/**
 * Base Game Screen
 * Base Class to handle some basic dismissal functionality
 * Allows for implemntation of a generic handler
 * @type {Boolean}
 */
class BaseGameScreen {

  constructor() {

    this.finished = false;

  }


  /**
   * Check to see if finished is signaled
   * @return {Boolean} True if screen is ifnished, false to keep displaying
   */
  isFinished() {
    return this.finished;
  }


  /**
   * Flag that the screen is finished
   * @return {[type]} [description]
   */
  flagFinished() {
    this.finished = true;
  }

  /**
   * Reset the finished flag for the screen
   */
  resetScreen() {
    this.finished = false;
  }

}//end class
