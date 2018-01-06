

/**
 * Class for Marauder A1 color
 * @type {ColorMA2}
 */
class ColorMA2 extends ColorEngine {


  constructor() {
    super(60,60,255,1.0);

    this.shift_delay = 4;
    this.shift_timer = 0;

    this.base_value = 60;

  }

  update() {


    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {

      if(Math.random() < 0.8) {
        let b = MathUtil.randomInt(120, 255);
        this.setRGB(60,60, b);
      } else {
        this.setRGB(210,210,255);
      }


      this.shift_delay = MathUtil.randomInt(1, 4);
      this.shift_timer = 0;
    }


  }//end update




}//end class ColorMA2
