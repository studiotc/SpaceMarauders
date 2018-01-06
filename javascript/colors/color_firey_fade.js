



class ColorFireyFade extends ColorEngine {

  constructor() {
    super(255,120,0,0);

    this.shift_delay = 3;
    this.shift_timer = 0;


    this.alpha_float = 0.0;

  }

  update() {


  this.shift_timer += 1;

  if(this.shift_timer >= this.shift_delay) {

    let g = MathUtil.randomInt(0, 255);
    this.setG(g);

    this.shift_delay = MathUtil.randomInt(2, 6);
    this.shift_timer = 0;
  }


  this.alpha_float += 0.003;
  let a = Math.min(this.alpha_float, 1.0);
  if (a < 1.0) {
    a = Math.sin(this.alpha_float);
  }


  this.setA(a);

  //console.log("updated firey fade : a = " + a);
//  console.log("updated firey fade: " + this.rgbHexString() + ", " + this.rgbaFunctString());

}//end update


}//end class ColorFirey
