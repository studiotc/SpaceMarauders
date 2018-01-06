
/**
  * Geometry Utility class
  *
  *
  */
class MathUtil {



  /**
   * Degrees to Radians conversion
   * @param {type} deg angle in degrees
   * @returns {Number} angle in radians
   */
  static deg_to_rad(deg) {
      return deg * Math.PI / 180.0;
  }

  /**
   * Radians to Degrees conversion
   * @param {type} rad angle in radians
   * @returns {Number} angle in degrees
   */
  static rad_to_deg(rad) {
      return rad *  180.0 / Math.PI;
  }


/**
 * Return a random integer within a range
 * @param  {number} min Minimum allowed value
 * @param  {number} max Maximum allowed value
 * @return {number} Returns a random number between min and max
 */
  static randomInt(min, max) {

  	let rng = max - min;
      let r = Math.random() * rng;
      //this is error:
      //  r -= r % 1;
      r = Math.round(r);
      return min + r;

  }

  /**
   * Return a random number within a range
   * @param  {number} min Minimum allowed value
   * @param  {number} max Maximum allowed value
   * @return {number} Returns a random number between min and max
   */
  static randomNumber(min, max) {
      return Math.random() * (max - min) + min;
  }



}//end class MathUtil
