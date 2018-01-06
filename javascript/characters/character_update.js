


/**
 * Character Update class - object to be returned from player and enemy objects
 * after update to signal game engine
 * @type {CharacterUpdate}
 */
class CharacterUpdate {

/**
 * Update return object for character
 * @param  {boolean} dead Is character dead?
 * @param  {boolean} firing Spawn a new projectile?
 * @param  {boolean} projectile projectile to be spwaned
 * @param  {number} fx   Integer id of fx sequence to enqueue, 0 for none
 * @return {CharacterUpdate}  The CharacterUpdate object
 */
  constructor(alive, firing, projectile, fx) {

    this.alive = alive;
    this.firing = firing;
    this.projectile = projectile;
    this.fx = fx;

  }


/**
 * See if the Character is dead
 * @return {Boolean} True if character is dead
 */
  isAlive() {
    return this.alive;
  }

/**
 * Check to see if we spawn a projectile
 * @return {Boolean} True if projectile needs to spawned
 */
  isFiring() {
    return this.firing;
  }

/**
 * Get the projectile to add to porjectiles
 * @return {Projectile} Projectile to add to game
 */
  getProjectile() {
    return this.projectile;
  }

/**
 * [fxId description]
 * @return {number} Number id of fx sequence to enqueue, 0 for none
 */
  fxId() {
    return this.fx;
  }


}//end class
