

class ColorRainbow extends ColorEngine {

  constructor() {
    super(255,255,255,1.0);

    this.shift_delay = 6;
    this.shift_timer = 0;
    this.shift_slot = 0;



    //let c_white = new ColorEngine(255,255, 255);
    // let c_red = new ColorEngine(255,0,0);
    // let c_orange = new ColorEngine(255,128,0);
    // let c_yellow = new ColorEngine(255,255,0);
    // let c_green = new ColorEngine(0,255,0);
    // let c_blue = new ColorEngine(0,0,255);
    // let c_indigo = new ColorEngine(75,0,130);
    // let c_violet = new ColorEngine(127,0,255);

    let c_red = new ColorEngine(255,80,80,255);
    let c_orange = new ColorEngine(255,159,63,255);
    let c_yellow = new ColorEngine(255,255,80,255);
    let c_green = new ColorEngine(80,255,80,255);
    let c_blue = new ColorEngine(80,80,255,255);
    let c_indigo = new ColorEngine(89,32,130,255);
    let c_violet = new ColorEngine(159,64,255,255);

    this.slots = [ c_red, c_orange, c_yellow, c_green, c_blue, c_indigo, c_violet ];
    this.slot_count = 7;

  }

  update() {


    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {

      let rslot = MathUtil.randomInt(0, 6);
      let c = this.slots[rslot];

      this.setFrom(c);

      this.shift_delay = MathUtil.randomInt(2, 10);
      this.shift_timer = 0;
    }


  }//end update

}//end class ColorPlayer
