


class MarauderA1 extends BaseMarauder {


/**
 * Constructor
 * @param  {Point2d} point      Position to spawn from
 * @param  {[type]} gamebounds Bounds of Enemy area (not full game area)
 * @return {MarauderA1}        Enemy object
 */
  constructor( point, gamebounds ) {
    super(gamebounds);

    this.setHitPoints(1);

    this.position = point;

    //sprites intialized in constructor
    ////update with position here
    this.sprites.setLocation(point);

    this.move_inc = Game.CalcVelocity(0.375); //was 3 @ us 8;

    this.heading = new Vector2d(0,1);

    this.move_timer = 0;
    this.move_delay = 30;

    this.firing_delay = 90;
    this.firing_timer = 0;

    //this.hits_total = 0;


  }

  initSprites() {

    let x = true;
    let o = false;

    let parray = [
                  [o,x,o,x,x,o,x,o],
                  [x,o,x,o,o,x,o,x],
                  [o,o,o,x,x,o,o,o],
                ];


    this.sprites = new SpriteArray( this.position, parray, "marauderA1");


  }

  /**
   * Gets the Character Hit Fx
   * @param  {Projectile} projectile The projectile we are hit with
   * @return {EnemyHitFX}   Marauder hit FX
   */
  getHitFX(projectile) {
    let p = projectile.getLocation();
    p = p.clone();

    return new EnemyHitFX(p);
  }


/**
 * Update the Marauder
 * @return {CharacterUpdate} Return CharacterUpdate Class
 */
  update() {


    let inc = this.move_inc;
    let hv = this.heading;
    let t = this.move_timer;
    let d = this.move_delay;
    t += 1;

    //if time is up - new heading and time delay
    if(t >= d) {

      let hx = MathUtil.randomNumber(1.0,2.0);
      let hy = MathUtil.randomNumber(1.0,2.0);

      if (Math.random() > 0.5) hx *= -1;
      if (Math.random() > 0.5) hy *= -1;

      hv = new Vector2d(hx, hy);
      hv.normalize();
      let rvel = MathUtil.randomInt(0.1,0.25); //(0.125,0.5); //2,4 @ us 8
      this.move_inc = Game.CalcVelocity(rvel);
      //reset timer and delay
      this.move_timer = 0;
      this.move_delay = MathUtil.randomInt(60, 240);
    //  console.log("new: delay=" + d + ", t= " + t + ", v = " + hv + ", inc = " + inc);
  } else {
    this.move_timer = t;
  }


    let x = hv.getX() * inc;
    let y = hv.getY() * inc;
    let p = this.position.clone();

    //translate position
    p.add(new Point2d(x,y));

    //check new point for bounds
    if(this.area_bounds.contains(p.getX(), p.getY())) {

      //reset timer and delay
      this.move_timer = 0;
      this.move_delay = MathUtil.randomInt(60, 240);

      //use new position adn heading
      this.position = p;
      this.heading = hv;

      //update sprites
      this.sprites.setLocation(p);

    } else {
      //pick new position next cycle since position failed
      this.move_timer = this.move_delay;
    }




    let fd = this.firing_delay;
    let ft = this.firing_timer;
    let is_firing = false;
    let projectile = null;

    ft += 1;

    //hold fire on player dead
    if (ft >= fd && !this.player_dead) {
      this.firing_delay = MathUtil.randomInt(120, 360);
      this.firing_timer = 0;
      is_firing = true;
      let pp = p.clone();
      let pvel = Game.CalcVelocity(0.25);
      projectile = new ProjectileM2(pp, new Vector2d(0,1), pvel, 1); //velocity was 3 @ us = 8

    } else {
      this.firing_timer = ft;
    }

    //refresh hit count
    this.updateQueuedHits();
    let alive = this.hit_points > 0;

    //send the retun data
    return new CharacterUpdate(alive, is_firing, projectile, 0);


  }//end update


  draw(g) {

    this.sprites.draw(g);


  }


}//end class MarauderA1
