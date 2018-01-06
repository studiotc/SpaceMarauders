

/**
 * ProjectileM2 Class - use sprite array
 * Marauder projectile
 * @type {ProjectileM2}
 */
class ProjectileM2 extends BaseProjectile {

  constructor(point, heading, velocity, damage) {
    super(point, heading, velocity, damage);

    //cross timer
    this.shift_delay = 6;
    this.shift_timer = 0;
    this.draw_cross = false;

  }

  /**
   * Initalize the sprites
   * @return {[type]} [description]
   */
    initSprites() {

      let sarray = [[true,true,true],
                    [true,true,true],
                    [true,true,true]];

      //this.sprites = new SpriteArray( this.position , sarray, "enemy_projectile");
      this.sprites = new SpriteArray( this.position , sarray, "firey");

    }



  /**
   * Update the projectile position
   * @return {undefined} no return
   */
  update() {

    let p = this.position;
    let v =  this.heading;

    p.project(v,this.velocity);


    this.sprites.setLocation(p);

    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {
      this.draw_cross = !this.draw_cross;
      this.shift_timer = 0;
    }


  }


/**
 * Draw the projectile
 * @param  {object} g Graphics context object to draw to
 * @return {undefined}  No return
 */
  draw(g) {



    //always draw centere
    this.sprites.drawAt(g,1,1);

    if(this.draw_cross ) {

      this.sprites.drawAt(g,0,0);
      this.sprites.drawAt(g,0,2);
      this.sprites.drawAt(g,2,2);
      this.sprites.drawAt(g,2,0);

    } else {

      this.sprites.drawAt(g,1,0);
      this.sprites.drawAt(g,2,1);
      this.sprites.drawAt(g,1,2);
      this.sprites.drawAt(g,0,1);

    }


  }//end draw




}//end class projectile
