


/**
 * Vector2d class - lightweight vector class
 *
 */

class Vector2d {


  /**
   * Constructor
   */
  constructor(x, y) {

    this.x = x;
    this.y = y;


  }


/**
 * Clone this Vector2d
 * @return {Vector2d} Refernce safe copy of the vector2d
 */
  clone() {
    return new Vector2d(this.x,this.y);
  }

/**
 * Get the X componenet of the Vector2d
 * @return {Number} X componenet of the Vector2d
 */
  getX() {
    return this.x;
  }

/**
 * Set the X component of the vector2d
 * @param {undefined} x No return
 */
  setX(x) {
    this.x =x;
  }

  /**
   * Get the Y componenet of the Vector2d
   * @return {Number} Y component of the Vector2d
   */
  getY() {
    return this.y;
  }

  setY(y) {
    this.y = y;
  }


/**
 * Get the Magnitude of the Vector
 * @return {Number}The magnitude of the Vector2d
 */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Normailze the Vecto2d in place
   * @return {undefined} No return
   */
  normalize() {

    var mag = this.magnitude();

    if (mag === 0) {
      console.error("Zero length Vector2d!");
      //crap, zero length....
      //TODO better handling here...
      return;
    }

    this.x = this.x / mag;
    this.y = this.y / mag;


  }

  invert() {
    this.x *= -1;
    this.y *= -1;
  }

/**
 * Get the angle of the vector2d
 * @return {Number} The angle of the vector2d
 */
  angle() {

    return Math.atan2(y,x);

  }

  /**
   * create a string from the vector
   * @return {string} Description of the vector
   */
  toString() {
    return "Vector2d{" + this.x + ", " + this.y + "}";
  }

/**
 * Copy a Vector2d
 * @param  {[type]} other Vector2d to copy
 * @return {Vector2d}  The copied vector2d
 */
  static copy(other) {

    return new Vector2d(other.getX(), other.getY());


  }



}//end class Vector2d
