
/**
 * Screen for Wave Ready
 */
class WaveReadyScreen extends BaseGameScreen {


  constructor() {
    super();

    this.wave = 0;
    this.wave_text = "";

    //location points for wave number text
    this.wave_x_location = 0;
    this.wave_y_location = 0;

    //unit size of text character
    let char_unit_size = TextArray.TextCharUnitSize();

    let settings = Game.Settings();

    let cen_x = settings.UnitWidth / 2 * settings.UnitSize;
    let cen_y = settings.UnitHeight / 2 * settings.UnitSize;

    let line_space = settings.UnitSize * ( char_unit_size + 2);

    this.wave_x_location = cen_x;
    this.wave_y_location = cen_y - (line_space * 3);

    //wave text

    //tear jerking inspirational & motivational call to arms
    this.text_defend = new TextArray("DEFEND", new Point2d(0,0), "firey");
    this.text_defend.centerOnPoint(new Point2d(cen_x, cen_y  - line_space ));

    this.text_wave = new TextArray("THE CITY", new Point2d(0,0), "firey");
    this.text_wave.centerOnPoint(new Point2d(cen_x, cen_y  ));




    //wave number text - null here intialized when setWave is called
    this.text_count = null;
    this.setWave(0);

    //timer setup
    this.show_for = settings.FrameRate * 3;
    this.timer = 0;



  }

  /**
   * Set the Wave Number For Display
   * @param {[type]} wave [description]
   */
  setWave(wave) {

    this.wave = wave;
    this.wave_text = "WAVE " + this.wave.toString();
    this.text_count = new TextArray(this.wave_text, new Point2d(100, 240), "player");

    //pull pre-calc'ed position
    let cx = this.wave_x_location;
    let cy = this.wave_y_location;
    //center the text
    this.text_count.centerOnPoint(new Point2d(cx,cy));

    //reset the timer
    this.timer = 0;

  }




/**
 * Draw the Wave Message
 * @param  {object} g Canvas graphics context
 * @return {undefined}   No return
 */
  draw(g) {

    //update timer if not finished already
    if(!this.isFinished() ) {
      this.timer += 1;

      if(this.timer > this.show_for) {
        this.flagFinished();
      }

    }//end if timer

    this.text_defend.draw(g);
    this.text_wave.draw(g);
    this.text_count.draw(g);

  }//end draw




}//end class WaveReadyScreen
