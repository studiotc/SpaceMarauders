"use strict";



/**
 * Defender object - this is the player character
 * @type {Defender}
 */
class Defender extends BaseCharacter {

  /**
   * Defender Constructoor - intialize player object
   * @param  {Bounds} gamebounds Spatial limits of the game - keeps player within bounds
   * @return {Defender} The intialized Defender Object
   */
  constructor( gamebounds) {
    super(gamebounds);

    //set intial hit points lower for testing
    this.setHitPoints(10);


    let x = gamebounds.centerX();
    let y = gamebounds.maxY()  - Game.Settings().UnitSize * 9;

    //console.log("starting defender at:" + x);

    this.position = new Point2d(x,y);
    this.sprites.setLocation(this.position);

    //movement flags
    this.moving_right = false;
    this.moving_left = false;

    this.move_increment = Game.CalcVelocity(0.75); //orignally 6 @ us = 8

    //firing flag
    this.firing = false;

    //delay in frames before firing is possible again
    this.firing_delay = 20; //15;
    //countdown timer for tracking firing
    this.firing_timer = 0;

    //displaying hit
    this.display_hit = false;
    let dfr = Game.Settings().FrameRate * 0.3;
    this.display_hit_ls = Math.round(dfr);
    this.display_hit_timer = 0;


  }

/**
 * Intialize the sprites
 * This is an override and must exist!
 * IT will be called in the super constructor
 * @return {undefined} No Return
 */
initSprites() {

  let x = true;
  let o = false;

  let parray = [
                [o,o,o,x,o,o,o],
                [o,o,o,x,o,o,o],
                [o,x,x,x,x,x,o],
                [x,x,x,x,x,x,x],
              ];


  this.sprites = new SpriteArray( this.position, parray, "player");


}

/**
 * Gets the Character Hit Fx
 * @param  {Projectile} projectile The projectile we are hit with
 * @return {PlayerHitFX}   Player hit FX
 */
getHitFX(projectile) {
  let p = projectile.getLocation();
  p = p.clone();

  return new PlayerHitFX(p);
}

flagHit(projectile) {
  let p = super.flagHit(projectile);

  //show hit
  this.display_hit = true;
  this.display_hit_timer = 0;
  this.sprites.pushColor("firey");

  //important to pass this along
  return p;

}

/**
 * Clears all input flags
 * Used for clearnig in put states when input manager is removed
 * @return {[type]} [description]
 */
  clearAllInputFlags() {

    this.moving_right = false;
    this.moving_left = false;
    this.firing = false;

  }

  /**
   * Set the moving right flag
   * @param  {[type]} flag boolean - ture for moving right (key is down)
   * @return {undefined} No return
   */
  movingRight(flag) {
    this.moving_right = flag;
  }



  /**
   * Set the moving left flag
   * @param  {[type]} flag boolean - ture for moving right (key is down)
   * @return {undefined} No return
   */
  movingLeft(flag) {
    this.moving_left = flag;
  }

/**
 *   Set the flag for shooting (firing weapon)
 * @param  {[type]}  flag boolean - ture for firing weapon (key is down)
 * @return {undefined}  No return
 */
  isFiring(flag) {
    this.firing = flag;
  }



  /**
   * Main update routine
   * Updates teh psoition and action of the player (moving, firing)
   * @return {undefined}  No return
   */
  update() {

    let cx = this.position.getX();
    let ix = this.move_increment;


      if (this.moving_right) {
        cx += ix;
      }

      if(this.moving_left) {
        cx -= ix;
      }


      //check limits
      cx = Math.min(cx, this.area_bounds.maxX());
      cx = Math.max( cx, this.area_bounds.minX());

      //update the position
      this.position.setX(cx);

      this.sprites.setLocation(this.position);

      //test color shifting...
      if (this.display_hit) {

        this.display_hit_timer += 1;
        if(this.display_hit_timer > this.display_hit_ls ) {
          //change back to normal color
          this.sprites.pushColor("player");
          this.display_hit = false;
        }

      }

      var projectile = null;
      var is_firing = false;
      if(this.firing && this.firing_timer === 0) {

        //set delay +1 for this cycle since it's updated at the end
        this.firing_timer = this.firing_delay + 1;

        let p = Point2d.copy(this.position);

        let pvel = Game.CalcVelocity(1);
        //projectile = new Projectile(p, new Vector2d(0,-1));
        projectile = new ProjectileD1(p, new Vector2d(0,-1), pvel, 1);  //velocity was 12 @ us =8

        is_firing = true;
      }

      //refresh hit count
      this.updateQueuedHits();
      let alive = this.hit_points > 0;

      //update firing timer (countdown to zero)
      this.firing_timer = Math.max(this.firing_timer -1, 0);

      return new CharacterUpdate(alive, is_firing, projectile, 0);

  }


  /**
   * Draw the defender
   * @param  {[type]} g Canvas Grpahics object to draw to
   * @return {undefined}  No return
   */
  draw(g) {



    this.sprites.draw(g);


  }


}//end class
