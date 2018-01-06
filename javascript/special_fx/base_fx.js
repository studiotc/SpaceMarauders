


/**
 * Base class for FX
 * @type {BaseFX]}
 */
class BaseFX {

  constructor(position) {

    this.position = position;

  }



/**
 * Update the FX
 * @return {boolean} Returns true if still alive, false if done
 */
  update() {

    return true;
  }

  draw(g) {

    return;

  }

}//end class BaseFX
