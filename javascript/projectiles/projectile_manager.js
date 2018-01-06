"use strict";



/**
 * Projectile collection
 * @type {ProjectileManager}
 */
class ProjectileManager {

/**
 * Intialize the PorjectilesList
 * @param  {Bounds} game_bounds Bounds of the game screen
 * @constructor
 * @return {ProjectileList} The projectile list
 */
  constructor(game_bounds) {

    this.projectiles = [];

    this.game_bounds = game_bounds;


  }

/**
 * Clear the list
 * @return {[type]} [description]
 */
  clear() {
    this.projectiles = [];
  }

/**
 * Check if projectile manager has active projectiles
 * @return {Boolean} [description]
 */
  hasProjectiles() {
    return this.projectiles.length > 0;
  }

/**
 * Get the list of projectiles
 * @return {Projectile[]} Array of projectiles
 */
  getProjectiles() {
    return this.projectiles;
  }

/**
 * Add a new projectile to the list
 * @param {Projectile} projectile Projectile to add
 */
  addNew(projectile) {

      this.projectiles.push(projectile);

  }


  /**
   * Update all the projectiles
   * @return {undefined} No return
   */
  update(stats) {

      let new_projectiles = [];
      let len = this.projectiles.length;
      let i =0;
      for(i = 0; i < len; i++) {

        let p = this.projectiles[i];

        //update if alive
        if(p.isAlive()) {

          p.update();

          var loc = p.getLocation();

          //make sure it is in bounds
          if(this.game_bounds.contains(loc.getX(), loc.getY())) {
            new_projectiles.push(p);
          }

        } else {
          //record in stats?
          if(stats !== null) {
            if(p.getHitType() === BaseProjectile.HitType().Enemy) {

              //add to score
              stats.flagShot(p);

            }

          }
          //console.log("dead projectile...");
        }//end if is alive



      }//end for

      //swap lists
      this.projectiles = new_projectiles;

  }//end update


/**
 * Do a hit test against another projectile manager
 * used to see if player hit enemy projectile
 * @param  {Projectile Manager} projectiles [description]
 * @return {[type]}             [description]
 */
  projectileHitTest(projectiles, fx_manager) {

      let op = projectiles.getProjectiles();

      let len = this.projectiles.length;
      let i =0;
      let j =0;
      for(i = 0; i < len; i++) {

        let p = this.projectiles[i];
        let pb = p.getBounds();

        for(j = 0; j < op.length; j ++) {

          let ep = op[j];
          let epb = ep.getBounds();

          //check for overlap
          let hit = pb.overlapArea(epb);

          //console.log("hit = " + hit);
          if(hit > 0){
            p.flagDone( BaseProjectile.HitType().PlayerProjectile );
            ep.flagDone(BaseProjectile.HitType().Enemy);

            let psfx = new ProjectileShotFX (ep.getLocation());
            fx_manager.add(psfx);


          }//end if hit

        }//end for other projectiles


      }//end for this.projectiles


  }//end enemy projectile hit test

/**
 * Hit test against MarauderManager
 * @param  {MarauderManager} enemies  MarauderMangager containing enemies to perform hit test against
 * @param  {[type]} fx_manager [description]
 * @return {[type]}            [description]
 */
  enemyHitTest(enemies, fx_manager) {

    let ml = enemies.getMarauders();
    let ml_len = ml.length;

    let len = this.projectiles.length;
    let i =0;
    let j =0;
    for(i = 0; i < len; i++) {

      let p = this.projectiles[i];
      let pb = p.getBounds();

      for(j = 0; j < ml_len; j ++) {

        let enemy = ml[j];
        let eb = enemy.getBounds();

        //check for overlap
        let hit = pb.overlapArea(eb);

        //console.log("hit = " + hit);
        if(hit > 0){
          p.flagDone( BaseProjectile.HitType().Enemy );
          let psfx = enemy.flagHit(p);

          //let psfx = new EnemyHitFX (enemy.getLocation());
          //let psfx = new EnemyHitFX (p.getLocation());
          fx_manager.add(psfx);


        }//end if hit

      }//end for other enemies


    }//end for this.projectiles

  }//end enemies hit test

/**
 * Do hit test against charcter - Player or City
 * @param  {[type]} character  [description]
 * @param  {[type]} fx_manager [description]
 * @return {[type]}            [description]
 */
  characterHitTest(character, fx_manager) {

    let c_bnds = character.getBounds();

    let len = this.projectiles.length;
    let i =0;
    for(i = 0; i < len; i++) {

      let p = this.projectiles[i];
      let pb = p.getBounds();

      //check for overlap
      let hit = pb.overlapArea(c_bnds);

      if(hit > 0){
        p.flagDone( BaseProjectile.HitType().PlayerOrCity);
        let psfx = character.flagHit(p);

        //let psfx = new PlayerHitFX (p.getLocation());
        fx_manager.add(psfx);

      }//end if hit


    }//end for this.projectiles


  }


  draw(g) {

    let len = this.projectiles.length;
    let i =0;
    for(i = 0; i < len; i++) {

      let p = this.projectiles[i];
      p.draw(g);

    }//end for


  }



}//end class
