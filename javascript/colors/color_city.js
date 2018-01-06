

/**
 * Color controller for the city
 * @type {ColorCity}
 */
class ColorCity extends ColorEngine {

  constructor() {
    super(255,255,255,255);

    this.shift_delay = 12;
    this.shift_timer = 0;

    //set intial values
    let rg = MathUtil.randomInt(70, 120);
    this.setRGB(rg,rg,rg);

  }

  update() {


    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {


      if(Math.random() > 0.9) {
        //normal grey variant
        let rg = MathUtil.randomInt(120, 180);
        this.setRGB(rg,rg,rg);
        this.shift_delay = MathUtil.randomInt(24, 34);
        this.shift_timer = 0;

      } else {
        //faint sparkle...
        let rg = MathUtil.randomInt(70, 120);
        this.setRGB(rg,rg,rg);
        this.shift_delay = MathUtil.randomInt(12, 24);
        this.shift_timer = 0;

      }


    }


  }//end update

}//end class ColorCity
