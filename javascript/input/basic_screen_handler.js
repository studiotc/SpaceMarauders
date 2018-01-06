
/**
 * Basic Screen Input Hander
 * @type {BasicScreenInputHandler}
 */
class BasicScreenInputHandler extends InputHandler {

  constructor(screen) {
    super();
    this.screen = screen;

  }


  /**
   * Overrride onKeyUp
   * Basic functionality is that when enter is pressed, screen is dismissed
   * @param  {object} e Event arguments
   * @return {undefined}   No Return
   */
  onKeyUp(e) {

     var keyCode = e.keyCode;

     if (keyCode === 13) {
       this.screen.flagFinished();

     }


 }//end onKeyPressed



}//end class
