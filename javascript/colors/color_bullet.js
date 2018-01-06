



class ColorBullet extends ColorEngine {

  constructor() {
    super(220,0,220,1.0);

    this.shift_delay = 2;
    this.shift_timer = 0;

  }

  update() {


  this.shift_timer += 1;

  if(this.shift_timer >= this.shift_delay) {

    let g = MathUtil.randomInt(0, 255);
    this.setG(g);

    this.shift_delay = MathUtil.randomInt(1, 3);
    this.shift_timer = 0;
  }

    //console.log("updated firey: " + this.rgbHexString() + ", " + this.rgbFunctString());

}//end update


}//end class ColorFirey
