

/**
 * Class for when an enemy porjectile is shot by player and destroyed
 */
class ProjectileShotFX  extends BaseFX {

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


    let hc = MathUtil.randomInt(19,35);
    let pc = hc * 2;
    this.particle_count = pc;


    let p = 0;
    for(p=0;p<pc;p++) {

      let ca = 0.0;
      if (p >= hc) {
        ca = MathUtil.randomNumber(-0.1,0.1);
      } else {
        ca = 3.14159 + MathUtil.randomNumber(-0.1,0.1);
      }


      let abs_a = 3.14159;
      let vx = Math.cos(ca);
      let vy = Math.sin(ca);
      let vec = new Vector2d(vx,vy);
      vec.normalize();

      let rvel = MathUtil.randomNumber(0.125,0.625); //1,5 @ us 8
      let vel =  Game.CalcVelocity(rvel); //was 3 @ us 8;

      let e_name = "player_bullet";

      if(Math.random() > 0.5) {
        e_name = "firey";
        ca = p * ( 3.14159 * 2.0 / pc);
        vx = Math.cos(ca);
        vy = Math.sin(ca);
        vec = new Vector2d(vx,vy);

        rvel = MathUtil.randomNumber(0.03,0.18);
        vel =  Game.CalcVelocity(rvel);

      }

      let pos = this.position.clone();
      let sprite = new Sprite(pos, e_name);


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

}//end class ProjectileShotFX
