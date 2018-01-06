"use strict";

/**
 * Sprite Class
 * @type {Sprite}
 */
class Sprite {

/**
 * Constructor
 * @param  {Point2d} point location of sprite
 * @return {Sprite}  returns created sprite object
 */
  constructor(point, color_engine) {

    this.position = point;

    this.color = ColorFactory.create(color_engine);


    this.setBounds();

  }

  /**
   * Set the bounds for the individual sprite
   */
  setBounds() {
    let x = this.position.getX();
    let y = this.position.getY();
    let s = Game.Settings().UnitSize;
    let hs = s / 2;

    //generate Individual Bounds
    this.bounds = new Bounds(x - hs, y - hs, x + hs, y + hs);
  }

/**
 * Set the location of the sprite
 * @param {Point2d} point Location of the sprite
 */
  setLocation(point) {
    this.position = point;
    this.setBounds();
  }

/**
 * Get the location of the sprite
 * @return {Point2d} Returns the location of the sprite
 */
  getLocation() {
    return this.position;
  }

  /**
   * Get the color of the sprite
   * @return {ColorEngine}  Returns the ColorEngine object (color)
   */
  getColor() {
    return this.color;
  }

  /**
   * Set the color of the sprite
   * @param {COlorManager} color The new color fo the sprite
   */
  setColor(color) {
    this.color = color;
  }

  /**
   * Draw the sprite
   * @param  {object} g Canvas Graphics context to draw to
   * @return {undefined}  No return
   */
  draw(g) {

    let cx = this.position.getX();
    let cy = this.position.getY();
    let bnds = this.bounds;
    let s = bnds.width();

    let hs = s / 2;

    //update the ColorEngine
    this.color.update();
    //get the color
    g.fillStyle = this.color.rgbaFunctString();
    g.fillRect(cx - hs , cy - hs, s, s);

  }//end draw




}//end class
