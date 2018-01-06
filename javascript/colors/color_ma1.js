

/**
 * Class for Marauder A1 color
 * @type {Number}
 */
class ColorMA1 extends ColorEngine {


  constructor() {
    super(60,255,60,1.0);

    this.shift_delay = 4;
    this.shift_timer = 0;

  }

  update() {


    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {

      let g = MathUtil.randomInt(120, 255);
      this.setG(g);

      this.shift_delay = MathUtil.randomInt(1, 4);
      this.shift_timer = 0;
    }


  }//end update




}//end class COlorMA1
