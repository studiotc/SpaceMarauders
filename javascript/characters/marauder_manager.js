
/**
 * Class to manage alla the active marauders
 */
class MarauderManager {

  constructor(gamebounds) {

    this.bounds = gamebounds;
      this.marauders = [];

      this.spawn_timer = 0;
      this.spawn_delay = 60;

  }

/**
 * Clear the list of marauders
 * @return {undefined} No return
 */
  clear() {
    this.marauders = [];
  }

/**
 * Are there any marauders left to fight?
 * @return {Boolean} True if there are marauders, false otherwise
 */
  hasMarauders() {
    return this.marauders.length > 0;
  }

/**
 * Get the List of Marauders (enemy characters)
 * @return {[type]} [description]
 */
  getMarauders() {
    return this.marauders;
  }

/**
 * Signal that the player died
 * All marauders should stop firing 
 */
  signalPlayerDied() {

    let ml = this.marauders.length;
    let m =0;
    for(m =0; m < ml; m++) {
      let mar = this.marauders[m];
      mar.signalPlayerDied();
    }


  }//end signalPlayerDied

  /**
   * Spawn a marauder
   * @return {undefined} No return
   */
  spawn() {

    let minx = this.bounds.minX();
    let maxx = this.bounds.maxX();
    let hp = 40; //horizontal padding
    let startx = MathUtil.randomInt(minx + hp, maxx - hp);

    //let x = this.bounds.centerX();
    let y = this.bounds.minY() + Game.CalcVelocity(3);

    let dice = Math.random();

    let m = null;

    if (dice >= 0.5) {
      m = new MarauderA1(new Point2d(startx,y) , this.bounds );
    } else {
      m = new MarauderA2(new Point2d(startx,y) , this.bounds );
    }


      this.marauders.push(m);

  }


/**
 * Update the marauders
 * @param  {ProjectileManager} projectiles Projecttile manager to update if firing
 * @return {[type]}             [description]
 */
  update(projectiles, fx_manager, stats) {


    //check for spwn first thing
    this.spawn_timer += 1;
    if (this.spawn_timer > this.spawn_delay ) {

      this.spawn_delay = MathUtil.randomInt(60 * 1, 60 * 5);
      //testing
      //this.spawn_delay = 10;
      this.spawn_timer = 0;
      //this.spawn();

    }

    let alive = [];
    let ml = this.marauders.length;

    let m =0;
    for(m =0; m < ml; m++) {
      let mar = this.marauders[m];
      let mar_u = mar.update();

      //check return object
      if(mar_u.isFiring()) {
        let mp = mar_u.getProjectile();
        projectiles.addNew(mp);

      }
      //still alive
      if(mar_u.isAlive()) {
        alive.push(mar);
      } else {
        //console.log("dead marauder");
        //let mpoint = mar.getLocation();
        let edfx = new EnemyDestroyedFX(mar.getLocation());
        fx_manager.add(edfx);
        stats.flagKill(mar);
      }

    }//end for

    //swap lists
    this.marauders = alive;

    //console.log("alive count = " + alive.length);
    //console.log("marauders count = " + this.marauders.length);

  }//end update


/**
 * Draw the Marauders
 * @param  {object} g Canvas Graphics context
 * @return {undefined} No return
 */
  draw(g) {

    let ml = this.marauders.length;
    let m =0;
    for(m =0; m < ml; m++) {
      let mar = this.marauders[m];
      mar.draw(g);
    }

    //this.bounds.draw(g);

  }//end draw


}//end class
