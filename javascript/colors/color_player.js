


class ColorPlayer extends ColorEngine {

  constructor() {
    super(255,255,255,1.0);

    this.shift_delay = 4;
    this.shift_timer = 0;

  }

  update() {


    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {

      let rg = MathUtil.randomInt(120, 255);
      this.setRGB(rg,rg,255);

      this.shift_delay = MathUtil.randomInt(4, 12);
      this.shift_timer = 0;
    }


  }//end update

}//end class ColorPlayer
