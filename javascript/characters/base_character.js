

/**
 * Basee Character Class
 * @type {BaseCharacter}
 */
class BaseCharacter {

  constructor(bounds) {

    this.area_bounds = bounds;

    this.position = new Point2d(0,0);

    this.sprites = null;

    this.queued_hits = 0;


    this.hit_points = 1;

    this.initSprites();

  }

/**
 * Init sprites - this needs to be overridden to
 * set the sprite array based on the sub-class
 * @return {undefined} No Return
 */
  initSprites() {

    console.error("BaseCharacter - forgot to override initSprites()!");
    this.sprites = null;

  }//end initSprites


/**
 * Flag a hit against the character
 * @param  {Projectile} projectile the projectile that it hitting
 * @return {BaseFX}    Reeturns the FX to display when hit
 */
  flagHit(projectile) {

    this.queued_hits += projectile.getHitPoints();

    //return the hit fx
    return this.getHitFX(projectile);

  }

  /**
   * Helper function to update hit count (total_hits)
   * @return {[type]} [description]
   */
  updateQueuedHits() {

    this.hit_points -= this.queued_hits;
    this.queued_hits = 0;

  }

  /**
   * Get the Characters hit points
   * @return {number}  THe number of hit points (can be negative)
   */
  getHitPoints() {
    return this.hit_points;
  }

  setHitPoints(hp) {
    this.hit_points = hp;
  }

  /**
   * Gets the Character Hit Fx
   * This is to be overridden in the individual charachters for their specific hits
   * @param  {Projectile} projectile The projectile we are hit with
   * @return {BaseFX}   the FX to display when hit
   */
  getHitFX(projectile) {
    let point = projectile.getLocation();
    point = p.clone();

    return new EnemyHitFX(point);
  }


/**
 * Get the location of the projectile
 */
  getLocation() {
    return this.position;
  }


/**
 * Get the bounds of the Sprite Array
 * @return {[type]} [description]
 */
  getBounds() {
    if(this.sprites !== null) {
      return this.sprites.getBounds();
    } else {
      console.error("BaseCharacter - Sprites not set - no bounds ");
    }
  }

  /**
   * Main update routine
   * This needs to be overriden
   * @return {CharacterUpdate}  CharacterUpdate object with update info
   */
  update() {
      console.error("BaseCharacter - forgot to override update()!");
      return new CharacterUpdate(false, false, null, -1);
  }//end update

  /**
   * Draw the Character
   * This can be used if sprites are set
   * @param  {[type]} g Canvas Grpahics object to draw to
   * @return {undefined}  No return
   */
  draw(g) {

    if(this.sprites !== null) {
      this.sprites.draw(g);
    }
  }//end draw


}//end class
