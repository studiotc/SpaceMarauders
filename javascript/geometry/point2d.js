
/**
 * Point2d class - simple 2d point
 * @type {Point2d}
 */
class Point2d {

    /**
     * Construct basic point at origin(0,0)
     * @returns {Point2d} the created point2d object
     */
    constructor(x, y) {

        this.x = x;
        this.y = y;

    }


    /**
     * Get the x component of the point
     * @type float
     */
    getX() {
        return this.x;
    }


    /**
     * Set the x component of the point
     * @param {float} x new x component
     * @returns {undefined} No Return
     */
    setX(x) {
        this.x = x;
    }


    /**
     * Get the y component of the point
     * @type float The y component of the point2d
     */
    getY() {
        return this.y;
    }


    /**
     * Set the y component of the point
     * @param {float} y the new y component
     * @returns {undefined} No return
     */
    setY(y) {
        this.y = y;
    }

    /**
     * Set the location or x & y valus of the point
     * @param {type} x new x position
     * @param {type} y new y position
     * @returns {undefined} No return
     */
    setLocation(x,y) {
        this.x = x;
        this.y = y;

    }


/**
 * Clone this Point 2d
 * @return {Point2d} The cloned Point2d
 */
    clone() {
      return new Point2d(this.x, this.y);
    }

    /**
     * Copy a Point
     * @param {type} p Point2d to copy
     * @returns {Point2d} The copied Point2d
     */
    static copy(p) {
        return new Point2d( p.getX(), p.getY() );
    }


    /**
     * Translate Point by polar coords (distance and angle)
     * @param {type} dist  distance to move by
     * @param {type} theta angle (in radians) to move by
     * @returns {undefined} no return
     */
    movePolar(dist, theta) {

        this.x += dist * Math.cos(theta);
        this.y += dist * Math.sin(theta);


    }

    /**
     * Project the point by vector and distance
     * @param  {[type]} vector [description]
     * @param  {[type]} length [description]
     * @return {[type]}        [description]
     */
    project(vector, length) {

      let v = vector.clone();
      v.normalize();
      this.x += v.getX() * length;
      this.y += v.getY() * length;


    }


    /**
     * Translate the point
     * @param  {Number} x X Translation
     * @param  {Number} y Y Translation
     * @return {undefined}  No return
     */
    translate(x,y) {
      this.x += x;
      this.y += y;
    }


/**
 * Add a point to this one
 * @param {Point2d} other Point to add to this one
 */
    add(other) {
      this.x += other.getX();
      this.y += other.getY();
    }




/**
 * Utility to print the point to the console (debugging function)
 * @return {Undefined} No return
 */
    print() {

      console.log("point2d { " + this.x + ", " + this.y + "}");

    }

}//end Point2d class
