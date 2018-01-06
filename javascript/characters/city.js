

/**
 * THis is what is being protected
 */
class City extends BaseCharacter {


 constructor(gamebounds) {
   super(gamebounds);

   //city will always be 0 or negative
   this.setHitPoints(0);
   let settings = Game.Settings();
   let x = gamebounds.centerX();
   let y = gamebounds.maxY() - settings.UnitSize * 3;

   this.position = new Point2d(x,y);

   this.display_sprites.setLocation(this.position);

   let b = this.display_sprites.getBounds();
   let ch = settings.UnitSize;

   let new_y = b.maxY() - (ch / 2);
   let point = this.position;
   point=point.clone();
   point.setY(new_y);

   this.sprites.setLocation(point);


 }//end constructor


 initSprites() {

   this.cols = 86;


   let cl = this.cols;
   let rc = 8; //8 units high


   //array for hit test
   var hit_array = [];
   hit_array[0] = [];


   //create and fill blank (false) array
   for(var y = 0; y < cl; y++){
     hit_array[0][y] = true;
   }


    let o = false;
    let X = true;
    //image loaded: 86 x 6 pixels {516}

    let array_x = [
    [o,o,o,o,o,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,o,o,o,o,o,o,o,o,o,X,X,o,o,o,o,o,o],
    [X,X,o,o,o,X,X,o,o,o,o,o,o,o,o,X,X,o,o,o,o,o,o,X,X,o,o,X,o,o,X,X,o,o,o,o,o,X,X,X,o,o,o,o,X,X,o,X,X,o,o,o,X,o,o,o,X,X,X,o,o,o,o,o,o,X,X,o,X,X,o,o,X,X,o,o,o,o,X,X,o,X,o,o,o,o],
    [X,X,o,X,o,X,X,o,X,X,o,o,o,X,o,X,X,o,o,X,X,X,o,X,X,o,X,X,o,o,X,X,o,o,X,X,o,X,X,X,o,X,o,o,X,X,o,X,X,o,X,X,X,X,o,o,X,X,X,o,X,o,o,o,o,X,X,o,X,X,X,o,X,X,o,X,X,o,X,X,o,X,o,X,X,X],
    [X,X,o,X,X,X,X,o,X,X,o,o,X,X,o,X,X,X,o,X,X,X,o,X,X,o,X,X,X,o,X,X,o,X,X,X,o,X,X,X,o,X,X,X,X,X,o,X,X,o,X,X,X,X,X,o,X,X,X,o,X,o,X,X,X,X,X,o,X,X,X,o,X,X,X,X,X,o,X,X,X,X,o,X,X,X],
    [X,X,o,X,X,X,X,o,X,X,o,X,X,X,X,X,X,X,o,X,X,X,o,X,X,o,X,X,X,o,X,X,o,X,X,X,X,X,X,X,o,X,X,X,X,X,X,X,X,o,X,X,X,X,X,X,X,X,X,o,X,X,X,X,X,X,X,o,X,X,X,o,X,X,X,X,X,o,X,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X]
    ];


   this.sprites = new SpriteArray( this.position, hit_array, "static");
   this.display_sprites = new SpriteArray( this.position, array_x, "city");



 }//end init sprites




 /**
  * Gets the Character Hit Fx
  * Also get teh it area for further FX - dame to the city
  * @param  {Projectile} projectile The projectile we are hit with
  * @return {PlayerHitFX}   Player hit FX
  */
 getHitFX(projectile) {
   let p = projectile.getLocation();
   p = p.clone();

   //update the city damage
   this.updateCityDamage(projectile);


   return new CityHitFX(p);
 }

/**
 * Update the city damage special FX
 */
updateCityDamage(projectile) {

  let settings = Game.Settings();
  let us = settings.UnitSize;

  let p_bounds = projectile.getBounds();
  let px_min =p_bounds.minX();
  let px_max = p_bounds.maxX();

  //number of projectile colsumns
  let p_cols = p_bounds.width() / us;

  let rc = this.display_sprites.getRows();
  let cc = this.display_sprites.getCols();

  let sl = this.display_sprites.getLocation();
  let sb = this.display_sprites.getBounds();
  let sx_min = sb.minX();

  let scol = Math.floor((  px_min - sx_min) / us);
  let ecol = Math.ceil((  px_max - sx_min) / us);

  if (scol < 0) scol = 0;
  if (ecol > this.cols) ecol = this.cols;

  // console.log("mins = " + sx_min + ", " + px_min);
  // console.log("city bounds = " );
  // sb.print();
  // console.log("projectile bounds = " );
  // p_bounds.print();
  //console.log("city hit range = " + scol + " -> " + ecol);

  let i=0;
  let j= 0;

  for (i=0;i<rc;i++) {
    for(j=scol;j<=ecol;j++) {

      let sprite = this.display_sprites.getSprite(i,j);
      //console.log("city sprite = " + sprite);
      if(sprite !== null) {
      //  console.log("city sprite = " + sprite);
        sprite.setColor(new ColorCityDamage());

      }

    }
  }


}

/**
 * Repair the city
 * @return {[type]} [description]
 */
repair() {

  this.display_sprites.pushColor("city");
  this.setHitPoints(0);

  
}

/**
 * Update the city
 * @return {CharacterUpdate} Returns CHaracter update
 */
  update() {
    //refresh hit count
    this.updateQueuedHits();
    //inverted - will be 0 for good,
    //negative number means city needs repair
    let alive = this.hit_points <= 0;

    return new CharacterUpdate(alive, false, null, 0);

  }

/**
 * Draw the city using the diplay sprites
 * @param  {[type]} g [description]
 * @return {[type]}   [description]
 */
 draw(g) {

   this.display_sprites.draw(g);
  //this.sprites.draw(g);

 }


}//end class city
