


class EnemyHitFX extends BaseFX {

  constructor(position) {
    super(position);


    this.life_span = 30;

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


    let pc = MathUtil.randomInt(7,11);
    this.particle_count = pc;


    let p = 0;
    for(p=0;p<pc;p++) {

      let hpi = 3.14159;
      let ra = MathUtil.randomNumber(-hpi, hpi);
      let vx = Math.cos(ra);
      let vy = Math.sin(ra);
      let vec = new Vector2d(vx,vy);
      vec.normalize();
      let rvel = MathUtil.randomNumber(0.25,0.5); //2,4 @ us 8
      let vel = Game.CalcVelocity(rvel); 

      let sprite = new Sprite(this.position.clone(), "player_bullet");


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
