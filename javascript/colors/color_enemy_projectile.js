


/**
 * Class for Enemy projectile color
 * @type {ColorEnemyProjectile}
 */
class ColorEnemyProjectile extends ColorEngine {


  constructor() {
    super(255,60,60,1.0);

    this.shift_delay = 4;
    this.shift_timer = 0;

  }

  update() {


    this.shift_timer += 1;

    if(this.shift_timer >= this.shift_delay) {

      let gb = MathUtil.randomInt(10, 255);
      this.setRGB(255,gb,gb);

      this.shift_delay = MathUtil.randomInt(1, 2);
      this.shift_timer = 0;
    }


  }//end update




}//end class ColorEnemyProjectile
