



/**
 * This is the basic projectile for the defender
 * @type {ProjectileD1}
 */
class ProjectileD1 extends BaseProjectile {

  constructor(point, heading, velocity, damage) {
        super(point, heading, velocity, damage);

  }//end constrcutor


  /**
   * Initalize the sprites - this must be overriden
   * @return {[type]} [description]
   */
    initSprites() {

      let sarray = [[true],
                    [true]];

      this.sprites = new SpriteArray( this.position , sarray, "player_bullet");

    }



}//end class ProjectileD1
