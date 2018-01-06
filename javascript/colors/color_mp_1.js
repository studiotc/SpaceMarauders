



/**
 * Color for marauders projectiles
 * @type {Number}
 */
class ColorMP1 extends ColorEngine {


  constructor() {
    super(80,255,80,255);

    this.shift_delay = 4;
    this.shift_timer = 0;

  }

  update() {


    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {

      let g = MathUtil.randomInt(120, 255);
      //this.setG(g);

      let a = Math.random();
      this.setA(a);


      this.shift_delay = MathUtil.randomInt(1, 4);
      this.shift_timer = 0;
    }


  }//end update




}
