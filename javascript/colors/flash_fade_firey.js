class ColorFlashFadeFirey extends ColorEngine {

  constructor() {
    super(255,120,0,1.0);//from firey


    this.shift_delay = 8;
    this.shift_timer = 0;

    this.fade_delay = 0;
    this.fade_delay_timer = 0;



  }

  setFadeDelay(frames) {
    this.fade_delay = frames;
  }


  update() {

    this.fade_delay_timer += 1;

    if(this.fade_delay_timer > this.fade_delay) {

      this.shift_timer += 1;

      if(this.shift_timer >= this.shift_delay) {

        let a = this.getA();
        a -= 0.13;
        this.setA(a);



        let g = MathUtil.randomInt(0, 255);
        this.setG(g);

        this.shift_timer = 0;
      }//end if shift

    }//end if fade
  }//end update



}//end class
