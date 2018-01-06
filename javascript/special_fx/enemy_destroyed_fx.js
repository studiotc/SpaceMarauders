


/**
 * Class for FX when an enemy is destroyed
 */
class EnemyDestroyedFX extends BaseFX {

  constructor(position) {
    super(position);

    let life = Game.Settings().FrameRate * 1.5;
    this.life_span = Math.round(life);
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


    let pc = MathUtil.randomInt(35,50);
    this.particle_count = pc;



    let p = 0;
    for(p=0;p<pc;p++) {

      let hpi = 3.14159;
      let ra = MathUtil.randomNumber(-hpi, hpi);
      let vx = Math.cos(ra);
      let vy = Math.sin(ra);
      let vec = new Vector2d(vx,vy);
      vec.normalize();

      let rvel = MathUtil.randomNumber(0.125,0.625); //1,5 @ us 8
      let vel = Game.CalcVelocity(rvel);


      let sprite = new Sprite(this.position.clone(), "flash_fade_firey");

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

    let pc = this.particle_count;
    let p = 0;
    for(p=0;p<pc;p++) {


      let vec = this.movingVectors[p];
      let vel = this.movingVelocity[p];
      let sprite =this.movingSprites[p];
      let pnt = sprite.getLocation();

      pnt.project(vec,vel);

    }//end for


    this.timer += 1;


    //is it finished?
    return this.timer < this.life_span;

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
