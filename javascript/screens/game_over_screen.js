
/**
 * Screen for Wave Ready
 */
class GameOverScreen extends BaseGameScreen {


  constructor() {
    super();

    //unit size of text character
    let char_unit_size = TextArray.TextCharUnitSize();

    let settings = Game.Settings();

    let cen_x = settings.UnitWidth / 2 * settings.UnitSize;
    let cen_y = settings.UnitHeight / 2 * settings.UnitSize;

    let ls = settings.UnitSize * ( char_unit_size + 2);


    this.text_game = new TextArray("GAME OVER", new Point2d(0,0), "firey");
    this.text_game.centerOnPoint(new Point2d(cen_x, cen_y ));

    this.text_reset = new TextArray("RESET", new Point2d(0,0), "player");
    this.text_reset.centerOnPoint(new Point2d(cen_x, cen_y + (ls * 2) ));

    this.text_enter = new TextArray("[ENTER]", new Point2d(0,0), "player");
    this.text_enter.centerOnPoint(new Point2d(cen_x, cen_y + (ls * 3)) );

    this.timer = 0;
    this.timer_hold_for = Game.Settings().FrameRate * 3;


  }//end constructor

/**
 * Override this as well to reset timer
 */
  resetScreen() {
    this.timer = 0;
    this.finished = false;
  }

  /**
   * Check to see if finished is signaled
   * Override this method to hold the screen since enter is the same as fire
   * this will flash by if raopid firing
   * @return {Boolean} True if screen is ifnished, false to keep displaying
   */
  isFinished() {

    if(this.timer > this.timer_hold_for) {
      return this.finished;
    } else {
      return false;
    }


  }

  /**
   * Override this to intercept keyboard triggered flag
   * Don't allow until timer is expired
   * @return {undefined} No Return
   */
  flagFinished() {
    if(this.timer > this.timer_hold_for) {
      this.finished = true;
    }

  }


/**
 * Draw the Wave Message
 * @param  {object} g Canvas graphics context
 * @return {undefined}   No return
 */
  draw(g) {

    //increment the timer here
    this.timer +=1;

    this.text_game.draw(g);

    //show reset key after timer expires
    if(this.timer > this.timer_hold_for) {

      this.text_reset.draw(g);
      this.text_enter.draw(g);
    }


  }//end draw




}//end class WaveReadyScreen
