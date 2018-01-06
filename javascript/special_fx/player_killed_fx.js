


class PlayerKilledFX extends BaseFX {

  constructor(position) {
    super(position);


    this.life_span = 45;

    this.delay = 8;
    this.timer = 0;

    this.particle_count = 0;
    this.movingSprites = [];
    this.movingVectors = [];
    this.movingVelocity = [];


    this.initSprites();

  }

  /**
  * INit the Sprite Array
  * @return {undefined} No Return
  */
  initSprites() {


    let puff_cnt = MathUtil.randomInt(31,53);

    let ring_cnt = MathUtil.randomInt(31,53);

    let t_cnt = puff_cnt + ring_cnt;

    this.particle_count = t_cnt;


     let a_inc = -3.14159   /  t_cnt;
    //
    // let min_a = a_inc * 2;
    // let max_a = a_inc * 4;

    let p = 0;
    for(p=0;p<t_cnt;p++) {
      let vec = null;

      let pos = null;
      let rvel =1;
      let vel = 1;
      let sprite = null;

      let dir = a_inc * p + MathUtil.randomNumber(-0.05, 0.05); //MathUtil.randomNumber(0, 3.14159);
      let vx = Math.cos(dir);
      let vy = Math.sin(dir);
      vec = new Vector2d(vx,vy);
      vec.normalize();

      if (Math.random() >= 0.5) {

        rvel = MathUtil.randomNumber(0.375,0.875); //3,7 @ us 8
        vel = Game.CalcVelocity(rvel);
        pos = this.position.clone();

        sprite = new Sprite(pos, "firey");

      } else {

        //slower city debris
        rvel = MathUtil.randomNumber(0.25,0.5); //2,4 @ us 8
        vel = Game.CalcVelocity(rvel);
        pos = this.position.clone();
        sprite = new Sprite(pos, "player");

      }

      //create sprite
      //let sprite = new Sprite(pos, "firey");


      this.movingSprites[p] = sprite;
      this.movingVectors[p] = vec;
      this.movingVelocity[p] = vel;


    }//end for



  }//end init sprites


  /**
  * Update the FX
  * @return {[type]} [description]
  */
  update() {

    this.timer += 1;

    let a_inc = 1.0 / this.life_span;
    //generate new alpha - fadeout
    let alpha = 1.0 - (a_inc *  this.timer);
    //console.log("alpha = " + alpha);
    let pc = this.particle_count;
    let p = 0;
    for(p=0;p<pc;p++) {


      let vec = this.movingVectors[p];
      let vel = this.movingVelocity[p];
      let sprite =this.movingSprites[p];
      let pnt = sprite.getLocation();

      pnt.project(vec,vel);

      let color = sprite.getColor();


      color.setA(alpha);

    }//end for


    if (this.timer < this.life_span) {
      return true;
    } else {
      return false;
    }

  }

  draw(g) {

    let pc = this.particle_count;
    let p = 0;
    for(p=0;p<pc;p++) {

      let sprite = this.movingSprites[p];
      sprite.draw(g);

    }//end for
  }//end draw



}//end class
