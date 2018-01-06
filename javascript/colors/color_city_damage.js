



class ColorCityDamage extends ColorEngine {

  constructor() {
    super(60,60,60,1.0);

    this.shift_delay = 8;
    this.shift_timer = 0;

  }

  update() {


  this.shift_timer += 1;

  if(this.shift_timer >= this.shift_delay) {

    if(Math.random() > 0.25) {
      //dark grey variant
      let grey = MathUtil.randomInt(10, 30);
      this.setRGB(grey,grey,grey);

      this.shift_delay = MathUtil.randomInt(10,20);

    } else {
      //embers...
      let r = MathUtil.randomInt(20, 40);
      let g = MathUtil.randomInt(0,180);
      this.setRGB(220,g,0);
      this.shift_delay = MathUtil.randomInt(7, 12);

    }

    this.shift_timer = 0;
  }

    //console.log("updated firey: " + this.rgbHexString() + ", " + this.rgbFunctString());

}//end update


}//end class ColorFirey
