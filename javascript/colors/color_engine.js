

/**
 * Color Engine class
 * THis is for controlling sprite colors
 * @type {ColorEngine}
 */
class ColorEngine {

  constructor(r, g, b, a) {

    this.r = this.clampChannel(r);
    this.g = this.clampChannel(g);
    this.b = this.clampChannel(b);
    this.a = this.clampChannelFloat(a);

  }

  /**
   * Set the Red channel of the color
   * @param {number} r The new Red channel value
   */
  setR(r) {
    this.r =  this.clampChannel(r);
  }

/**
 * Get the Red channel of the color
 * @return {number} Returns the Red channel as integer 0-255
 */
  getR() {
    return this.r;
  }

  /**
   * Set the Green channel of the color
   * @param {number} g The new Green channel value
   */
  setG(g) {
    this.g =  this.clampChannel(g);
  }

/**
 * Get the Green channel of the color
 * @return {number} Returns the Green channel as integer 0-255
 */
  getG() {
    return this.g;
  }

  /**
   * Set the Blue channel of the color
   * @param {number} b The new Blue channel value
   */
  setB(b) {
    this.b =  this.clampChannel(b);
  }

/**
 * Get the Blue channel of the color
 * @return {number} Returns the Blue channel as Integer 0-255
 */
  getB() {
    return this.b;
  }

  /**
   * Set the Alpha channel of the color
   * THis is a float between 0.0 -> 1.0
   * @param {number} a The new Alpha channel value
   */
  setA(a) {
    this.a = this.clampChannelFloat(a);
  }

/**
 * Get the Alpha channel of the color
 * @return {number} Returns the Alpha channel as integer 0-255
 */
  getA() {
    return this.a;
  }
/**
 * Set the RGB values of the color
 * @param {number} r The new Red channel value
 * @param {number} g The new Green channel value
 * @param {number} b The new Blue channel value
 */
  setRGB(r,g,b) {
    this.r = this.clampChannel(r);
    this.g = this.clampChannel(g);
    this.b = this.clampChannel(b);
  }

  /**
   * Set the RGBA values of the color
   * @param {number} r The new Red channel value
   * @param {number} g The new Green channel value
   * @param {number} b The new Blue channel value
   * @param {number} a The new ALpha channel value
   */
  setRGBA(r,g,b, a) {
    this.r = this.clampChannel(r);
    this.g = this.clampChannel(g);
    this.b = this.clampChannel(b);
    this.a = this.clampChannelFloat(a);
  }

  /**
   * Set the colors from another color engine
   * @param {[type]} other [description]
   */
  setFrom(other) {

    this.r = other.getR();
    this.g = other.getG();
    this.b = other.getB();

  }


  /**
   * Update method  - template method for overloading
   * @return {undefined} No return
   */
  update() {
    return;
  }



/**
 * Clamp the color channel to 0-255 and ensure it's an Integer
 * @param  {number} c Channel to clamp (r,g,or b)
 * @return {number} Returns the channel clamped
 */
  clampChannel(c) {

    let clamped = c - (c % 1);//trim any decimals, rounding instead?
    clamped = Math.min(255,clamped);
    clamped = Math.max(0, clamped);
    return clamped;


  }

  clampChannelFloat(c) {

    let clamped = c;
    clamped = Math.min(1,clamped);
    clamped = Math.max(0, clamped);
    return clamped;


  }

  /**
   * Print a string for setting canvas colors
   * No alpha values are returned
   * @return {string} Returns a string formated as 'rgb(255, 255, 255)'
   */
  rgbFunctString() {
    return "rgb(" + this.r + "," + this.g + ", " + this.b + ")";
  }

  /**
   * Print a string for setting canvas colors
   * The alpha is returned from this
   * @return {string} Returns a string formated as 'rgb(255, 255, 255)'
   */
  rgbaFunctString() {
    return "rgba(" + this.r + "," + this.g + ", " + this.b + ", " + this.a + ")";
  }

/**
 * Print a hex formated string
 * No alphavalues are returnedd
 * @return {string} Returns a string formated as '#ffffff'
 */
  rgbHexString() {

    let sr = this.intToHex(this.r);
    let sg = this.intToHex(this.g);
    let sb = this.intToHex(this.b);
    let sa = this.intToHex(this.a);

    return "#" + sr + sg + sb;
  }


  /**
   * Convert a color channel integer to hex format
   * Rember to pad the string if needed
   * @param  {number} n Integer value (color channel) to convert
   * @return {string}   Returns the hex formatted string
   */
  intToHex(n) {
    let ns = n.toString(16);
    if (ns.length === 1) {
      ns = "0" + ns;//pad 0
    }
    return ns;
  }

  /**
   * Copy utility for cloining the class
   * @param  {ColorEngine} other The ColorEngine to copy
   * @return {ColorEngine}  Returns a new reference safe copy of the ColorEngine
   */
  static copy(other) {

    let r = other.getR();
    let g = other.getG();
    let b = other.getB();

    return new ColorEngine(r,g,b);
  }


}//end class
