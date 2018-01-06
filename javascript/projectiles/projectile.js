

/**
 * Projectile Class
 * This is the base class for all projectiles
 * @type {Projectile}
 */
class BaseProjectile {

  constructor(point, heading, velocity, hit_points ) {

    this.position = point;
    this.heading = heading;

    this.velocity = velocity;

    this.is_alive = true;
    this.hit_type = BaseProjectile.HitType().None;


    //the hit points that the projectile takes away
    //(amount of damage it does)
    this.hit_points = hit_points;



    this.initSprites();

  }

/**
 * Initalize the sprites - this must be overriden
 * @return {[type]} [description]
 */
  initSprites() {

    console.error("BaseProjectile - forgot to override initSprites()!");
    this.sprites = null;

  }

  /**
   * Set the location of the projectile
   * @param {Point2d} point Location of the projectile
   */
    setLocation(point) {
      this.position = point;
    }

  /**
   * Get the location of the projectile
   * @return {Point2d} Returns the location of the sprite
   */
    getLocation() {
      return this.position;
    }

    /**
     * Set the heading vector of the projectile
     * @param {Vector2d} vec The new heading vector
     */
    setHeading(vec) {
      this.heading = vec;
    }

    /**
     * Get the heading vector of the projectile
     * @return {Vector2d} The heading vector
     */
    getHeading() {
      return this.heading();
    }

  /**
   * Set the velocity of the projectile
   * @param {number} vel New velocity
   */
    setVelocity(vel) {
      this.velocity = vel;
    }

  /**
   * Get the velocity of the projectile
   * @return {Vector2d} The current velocity
   */
    getVelocity() {
      return this.velocity;
    }


    /**
     * Set the hit points of damage that the projectile does
     * when it hits a target (character - ignored for projectiles)
     * @param {number} hit_points Number of hit points of damage
     */
    setHitPoints(hit_points) {
      this.hit_points = hit_points;
    }

    /**
     * Get the damage the projectile does
     * in terms of hit points - these are subtracted
     * from the character whne hit
     * @return {number} Number of hit points of damage
     */
    getHitPoints() {
      return this.hit_points;
    }

    /**
     * Flag that projectile was destroyed
     * @return {undefined} No return
     */
    flagDone(hit_type) {
      this.hit_type = hit_type;
      this.is_alive = false;
    }

    getHitType() {
      return this.hit_type;
    }

    /**
     * See if projectile is alive
     * @return {Boolean} [description]
     */
    isAlive() {
      return this.is_alive;
    }

/**
 * The bounds of the sprites
 * based on the underlaying SpriteArray bounds
 * @return {Bounds} Bounds of this object
 */
    getBounds() {
      return this.sprites.getBounds();
    }

  /**
   * Update the projectile position
   * @return {undefined} no return
   */
  update() {

    let p = this.position;
    let v = this.heading;

    v.normalize();
    let x = p.getX() + (v.getX() * this.velocity);
    let y = p.getY() + (v.getY() * this.velocity);

    this.position.setLocation(x,y);

    if(this.sprites !== null) {
      this.sprites.setLocation(this.position);
    }


  }


/**
 * Draw the projectile
 * @param  {object} g Graphics context object to draw to
 * @return {undefined}  No return
 */
  draw(g) {

    if(this.sprites !== null) {
        this.sprites.draw(g);
    }

  }//end draw

  static HitType() {
    return {
      None : 1,
      PlayerOrCity: 111,
      Enemy: 333,
      PlayerProjectile: 37
    }
  }


}//end class projectile
