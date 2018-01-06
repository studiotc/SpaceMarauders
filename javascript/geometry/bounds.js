

/**
 * Bouns object - defines a bounding box or rectangle
 * @type {Bounds}
 */
class Bounds {



  //constructor
   constructor( min_x,  min_y,  max_x,  max_y) {

    this.min_x = min_x;
    this.min_y = min_y;
    this.max_x = max_x;
    this.max_y = max_y;

  }//end constructor


  /**
   * Prints the BOunds to the COnsole - debugging feature
   * @return {undefined} No Return
   */
  print() {
    console.log("bounds {" + this.min_x + ", " + this.min_y + ", " + this.max_x + ", " + this.max_y + "}");
  }


  setFromOther( other) {

    this.min_x = other.minX();
    this.min_y = other.minY();
    this.max_x = other.maxX();
    this.max_y = other.maxY();

  }//end setFromOther






/**
 * Do a union with another Bounds
 * Expands this bounds to fit the other bounds object
 * @param  {Bounds} other The other bounds to expand to fit
 * @return {undefined} No return
 */
  union( other ) {

    //if this bounds contains the other
    // it's as big as it's going to get so exit
    if(this.containsOther(other) ) {
      return;
    }

    //if the other boounds contains this one
    //use the other size and exit
    if ( other.containsOther(this)) {
      this.setFromOther(other);
      return;
    }

    let o_min_x = other.minX();
    let o_min_y = other.minY();
    let o_max_x = other.maxX();
    let o_max_y = other.maxY();

    let min_x = this.minX();
    let min_y = this.minY();
    let max_x = this.maxX();
    let max_y = this.maxY();

    //minimum x
    if(o_min_x < min_x) {
      min_x = o_min_x;
    }

    //minimum y
    if(o_min_y < min_y) {
      min_y = o_min_y;
    }

    //maximum x
    if(o_max_x > max_x) {
      max_x = o_max_x;
    }

    //maximum y
    if(o_max_y > max_y) {
      max_y = o_max_y;
    }

    //push values
    this.min_x = min_x;
    this.min_y = min_y;
    this.max_x = max_x;
    this.max_y = max_y;


  }//end union

  //
  //  Test to see if bounds contains other bounds
  //
   containsOther( other) {

    if (this.min_x <= other.minX() && this.min_y <= other.minY() && this.max_x >= other.maxX() && this.max_y >= other.maxY() ) {
      return true;
    }
    else {
      return false;
    }
  }//end contains bounds




  //
  //  test to see if bounds contains point
  // excpecting ints px & py
  //


  /**
   * Test to see if bounds contains point
   * @param  {number} px Point X value
   * @param  {number} py Point Y value
   * @return {boolean}   True if bounds contains point
   */
  contains( px, py) {

    if (px >= this.min_x && py >= this.min_y && px <= this.max_x && py <= this.max_y) {
      return true;
    }
    else {
      return false;
    }
  }//end contains point

  /*

  Expand the bounds by amount ex

  */
  expandBy( ex) {

    this.min_x -= ex;
    this.min_y -= ex;
    this.max_x += ex;
    this.max_y += ex;

  }


  /**
   * Get the area of overlap in units squared
   * @param  {Bounds} other BOunds to test for overlap
   * @return {Number}  The area of the overlap or 0 if there is no overlap
   */
  overlapArea( other) {

    var ib = this.intersect(other);

    if (ib == null) {
      return 0;
    }

    return ib.area();

  }//end overlap area




  /**
   * Perform intersection with another bounds
   * @param  {Bounds} other Bounds to intersect with
   * @return {Bounds}  Returns the bounds intersection or null if no intersection
   */
  intersect( other) {


    if(this.containsOther(other) ) {
      return Bounds.copy(other);
    }
    if ( other.containsOther(this)) {
      return Bounds.copy(this);
    }


    var o_min_x = other.minX();
    var o_min_y = other.minY();
    var o_max_x = other.maxX();
    var o_max_y = other.maxY();

    var t_min_x = this.minX();
    var t_min_y = this.minY();
    var t_max_x = this.maxX();
    var t_max_y = this.maxY();

    var int_x1 = 0;
    var int_y1 = 0;
    var int_x2 = 0;
    var int_y2 = 0;



    //determine vertical edge condition
    //full x overlap
    if ( t_min_x <= o_min_x && t_max_x >= o_max_x ) {
       int_x1 = o_min_x;
       int_x2 = o_max_x;
    //max_x overlap
  } else if (t_min_x <= o_min_x && t_max_x <= o_max_x && t_max_x > o_min_x) {
      int_x1 = o_min_x;
      int_x2 = t_max_x;

     //x contained
   } else if (t_min_x >= o_min_x && t_max_x <= o_max_x ) {
      int_x1 = t_min_x;
      int_x2 = t_max_x;
     //min_x contained
   } else if (t_min_x >= o_min_x && t_max_x >= o_max_x && t_min_x < o_max_x ) {
      int_x1 = t_min_x;
      int_x2 = o_max_x;
    } else {
      //no x relationship - no intersection
      return null;
    }

   //full y overlap
    if ( t_min_y <= o_min_y && t_max_y >= o_max_y ) {
       int_y1 = o_min_y;
       int_y2 = o_max_y;
    //max_y overlap
  } else if (t_min_y <= o_min_y && t_max_y <= o_max_y && t_max_y > o_min_y) {
      int_y1 = o_min_y;
      int_y2 = t_max_y;

     //y contained
   } else if (t_min_y >= o_min_y && t_max_y <= o_max_y ) {
      int_y1 = t_min_y;
      int_y2 = t_max_y;
     //min_y contained
   } else if (t_min_y >= o_min_y && t_max_y >= o_max_y && t_min_y < o_max_y) {
      int_y1 = t_min_y;
      int_y2 = o_max_y;
    } else {
      //no y relationship - no intersection
      return null;
    }

    return new Bounds(int_x1, int_y1, int_x2, int_y2);

  }//end intersect


  width() {
    return Math.abs(this.max_x - this.min_x);
  }

  height() {
    return Math.abs(this.max_y - this.min_y);
  }

  area() {
    return this.width() * this.height();
  }

  centerX() {
    return this.minX() + this.width() / 2;
  }

  centerY() {
    return this.minY() + this.height() / 2;
  }




  //
  //  Basic properties
  //

   minX() {
    return this.min_x;
  }


   minY() {
    return this.min_y;
  }

   maxX() {
    return this.max_x;
  }

   maxY() {
    return this.max_y;
  }


  /**
   * Clone this Bounds object (make a copy)
   * Makes a reference safe copy
   * @return {Bounds} The cloned Bounds
   */
    clone() {
      return new Bounds(this.min_x, this.min_y, this.max_x, this.max_y);
    }

/**
 * Copy a bounds object
 * @param  {Bounds} other Bounds to make a copy of
 * @return {Bounds}   The copied Bounds
 */
  static copy(other) {

    return new Bounds(other.minX(), other.minY(), other.maxX(), other.maxY());

  }


  /**
   * Draw the bounds outline
   * @param  {object} g Canvas graphics context to draw to
   * @return {undefined}   No return
   */
  draw(g) {

    g.strokeStyle = 'white';
    g.lineWidth = 0;

    //min y
     g.beginPath();
     g.moveTo(this.min_x, this.min_y);
     g.lineTo(this.max_x, this.min_y);
     g.stroke();
     //max y
     g.beginPath();
     g.moveTo(this.min_x, this.max_y);
     g.lineTo(this.max_x, this.max_y);
     g.stroke();
     //min y
      g.beginPath();
      g.moveTo(this.min_x, this.min_y);
      g.lineTo(this.min_x, this.max_y);
      g.stroke();
      //max y
      g.beginPath();
      g.moveTo(this.max_x, this.min_y);
      g.lineTo(this.max_x, this.max_y);
      g.stroke();

  }//end draw




}//end class Bounds
