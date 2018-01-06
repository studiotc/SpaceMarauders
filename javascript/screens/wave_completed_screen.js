

/**
 * Screen for Wave Completed
 * @type {WaveCompletedScreen} THe wave completed screen
 */
class WaveCompletedScreen extends BaseGameScreen {


  constructor() {
    super();


    //location points for wave number text
    this.wave_x_location = 0;
    this.wave_y_location = 0;



    //unit size of text character
    let char_unit_size = TextArray.TextCharUnitSize();

    let settings = Game.Settings();

    let cen_x = settings.UnitWidth / 2 * settings.UnitSize;
    let cen_y = settings.UnitHeight / 2 * settings.UnitSize;

    let line_space = settings.UnitSize * ( char_unit_size + 2);
    let line_cen = line_space / 2;



    //wave text
    //first line 1.5 space above center
    this.text_line1_y = cen_y - line_space * 3;
    //second line 0.5 spaces above center
    this.text_line2_y = cen_y  - line_space * 2;
    //third line 0.5 space below center
    this.text_line3_y = cen_y  - line_space;

    this.screen_center_x = cen_x;

    let l3y = cen_y + line_space * 1;
    let l4y = cen_y + line_space * 2;
    let l5y = cen_y + line_space * 3;

    this.text_line1 = null;
    this.text_line2 = null;
    this.text_line3 = null;

    this.text_player_y = l3y;
    this.text_city_y = l4y;


    this.text_player_bonus = new TextArray("PLAYER BONUS", new Point2d(0,0), "player");
    this.text_player_bonus.centerOnPoint(new Point2d(cen_x, l3y ));

    this.text_city_bonus = new TextArray("CITY BONUS", new Point2d(0,0), "player");
    this.text_city_bonus.centerOnPoint(new Point2d(cen_x, l4y ));

    this.text_enter = new TextArray("[CONTINUE]", new Point2d(0,0), "player");
    this.text_enter.centerOnPoint(new Point2d(cen_x, l5y ));


    //show game over or game won
    this.show_final_message = false;

    //timer setup
    this.timer_hold_for = settings.FrameRate * 3;
    this.timer = 0;



  }


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
        //console.log("flagged as done");
      }
    }

  /**
   * Set the Wave Number For Display
   * @param {[type]} wave [description]
   * @param {[type]} wave [description]
   */
  setDisplay(alive, wave, wave_count, playerBonus, cityBonus) {

    //pull pre-calc'ed position
    let cx = this.screen_center_x;

    let wave_text = "WAVE " + wave.toString();
    this.text_line1 = new TextArray(wave_text, new Point2d(100, 240), "player");

    if(alive) {
      this.text_line2 = new TextArray("COMPLETED", new Point2d(0,0), "player");
    } else {
      this.text_line2 = new TextArray("FAILED", new Point2d(0,0), "firey");
    }

    //center the text
    this.text_line1.centerOnPoint(new Point2d(cx, this.text_line1_y ));
    this.text_line2.centerOnPoint(new Point2d(cx, this.text_line2_y ));


    if(!alive) {
      this.show_final_message = true;
      this.text_line3 = new TextArray("GAME OVER", new Point2d(0,0), "firey");
      this.text_line3.centerOnPoint(new Point2d(cx, this.text_line3_y ));

    } else if (wave === wave_count) {

      this.show_final_message = true;
      this.text_line3 = new TextArray("YOU HAVE WON!", new Point2d(0,0), "rainbow");
      this.text_line3.centerOnPoint(new Point2d(cx, this.text_line3_y ));

    } else {
      this.show_final_message = false;
    }


    this.text_player_bonus = new TextArray("PLAYER+ " + playerBonus , new Point2d(0,0), "player");
    this.text_player_bonus.centerOnPoint(new Point2d(cx,this.text_player_y ));

    this.text_city_bonus = new TextArray("CITY+ " + cityBonus, new Point2d(0,0), "player");
    this.text_city_bonus.centerOnPoint(new Point2d(cx,this.text_city_y ));







  }//end set display




/**
 * Draw the Wave Message
 * @param  {object} g Canvas graphics context
 * @return {undefined}   No return
 */
  draw(g) {

    this.timer += 1;



    this.text_line1.draw(g);
    this.text_line2.draw(g);

    if (this.show_final_message) {
      this.text_line3.draw(g);
    }


    this.text_player_bonus.draw(g);
    this.text_city_bonus.draw(g);

    //show reset key after timer expires
    if(this.timer > this.timer_hold_for) {

      //this.text_reset.draw(g);
      this.text_enter.draw(g);
    }


  }//end draw




}//end class WaveReadyScreen
