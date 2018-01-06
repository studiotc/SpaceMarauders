


/**
 * Base Class for all objects
 * Displays sprites in any or all array cells - used to do pseudo pixel art
 * @type {SpriteArray}
 */
class SpriteArray {



/**
 * Constructor
 * @constructor
 * @param  {Point2d} point Position of the array
 * @param  {boolean[][]} parray two dimensional array of booleans that layout the sprites
 * @param  {ColorEngine} color_engine ColorEngine to use to control display color
 * @return {SpriteArray} intialized SpriteArray
 */
  constructor( point, parray, color_engine) {

    let rows = parray.length;

    //check rows
    if(rows <= 0) {
      console.error("Malformed sprite array: 0 rows");
      return;
    }

    //get first column count
    let cols = parray[0].length;

    //check first column
    if(cols < 1) {
      console.error("Malformed sprite array: 0 columns in row 1");
      return;
    }

    //check columns
    let r= 1;
    for(r=1; r<rows; r++) {
      let cl = parray[r].length;
      if ( cl < 1) {
        console.error("Malformed sprite array: 0 columns in row " + r);
        return;
      } else if (cl !== cols) {
        console.error("Malformed sprite array: invalid number of columns in row " + r + " (columns must match)");
        return
      }
    }

    //everything checks out
    this.rows =  rows;
    this.cols =  cols;
    //set the location
    this.location = point;

    //generate the bounds
    this.updateBounds();

    let sprites = new Array(rows);

    let sds= Game.Settings().UnitSize; //Sprite.defaultSize();
    let hds = sds / 2;

    let i = 0;
    let j = 0;

    let bx = this.bounds.minX();
    let by = this.bounds.minY();

    for(i = 0; i < rows; i++) {

      let row = new Array(cols);

      for(j =0; j < cols; j ++) {

        let do_sprite = parray[i][j];
        if (do_sprite) {
          //center the sprite in the "cell"
          row[j] = new Sprite( new Point2d(bx + hds + j * sds, by + hds + i * sds), color_engine);
        } else {
          row[j] = null;
        }

      }//end for column

      sprites[i] = row;

    }//end for row

    //set the sprites
    this.sprites = sprites;


  }//end constructor


  /**
   * Get the Rows in the array
   * @return {number} The number of rows
   */
  getRows() {
    return this.rows;
  }

  /**
   * Get the Cols
   * @return {number} THe number of cols
   */
  getCols() {
    return this.cols;
  }


  /**
   * Get the location of the Sprite Array
   * Sprite Arrays are centered on their location
   * @return {Point2d} THe Location of the SpriteArray
   */
  getLocation() {
    return this.location;
  }

/**
 * Set the location of the sprite array
 * The sprite array will be centered on this location
 * @param {[type]} point [description]
 */
setLocation(point) {

  this.location = point;

  //update the bounds
  this.updateBounds();

  let sds= Game.Settings().UnitSize;
  let hds = sds / 2;

  let i = 0;
  let j = 0;

  let bx = this.bounds.minX();
  let by = this.bounds.minY();


  for(i = 0; i < this.rows; i++) {
    for(j =0; j < this.cols; j ++) {

      let s = this.sprites[i][j];
      if(s !== null) s.setLocation(new Point2d(bx + j * sds + hds, by +  i * sds + hds));

    }
  }

}//end set location

/**
 * Get the Sprite at the specified location
 * Returns the Sprite or null if not found or out of index range
 * @param  {number} row Row index of sprite
 * @param  {[type]} col COl index of sprite
 * @return {Sprite} THe sprite at the index
 */
getSprite(row,col) {

  let s = null;
  if (row < this.rows && col < this.cols) {
    s = this.sprites[row][col];
  }
  return s;

}

/**
 * Set the bounds of the sprite array
 * centered on the location (base point)
 * Need to know the rows, cols, and location to set the bounds
 */
updateBounds() {

  //sprite size
  let sds= Game.Settings().UnitSize;

  //overall width and height
  let oaw = this.cols * sds;
  let oah = this.rows * sds;

  //base point values
  let bx = this.location.getX() - (oaw / 2);
  let by = this.location.getY() - (oah / 2);

  //set the bounds object
  this.bounds = new Bounds(bx, by, bx + oaw, by + oah);

}

/**
 * Get the bounds of the sprite array
 * @return {Bounds} BOunds of the sprite array
 */
getBounds() {
  return this.bounds;
}

/**
 * Testing to push a new color
 * @param  {String} color_name Color name for the color factory
 * @return {[type]}            [description]
 */
pushColor(color_engine) {

  let i = 0;
  let j = 0;

  for(i = 0; i < this.rows; i++) {
    for(j =0; j < this.cols; j ++) {

      let s = this.sprites[i][j];
      if(s !== null) {
        let color = ColorFactory.create(color_engine);
        s.setColor(color);
      }

    }
  }



}


/**
 * Draw the sprite array
 * @param  {object} g Canvas Graphics context
 * @return {undefined}   no return
 */
  draw(g) {

    let i = 0;
    let j = 0;

    for(i = 0; i < this.rows; i++) {
      for(j =0; j < this.cols; j ++) {
        let s = this.sprites[i][j];
        if(s !== null) s.draw(g);

      }//end for

    }//end for

    //visual verification
    // this.drawCenterMark(g);
    // this.bounds.draw(g);

  }//end draw

/**
 * Draw a specific sprite in the array
 * @param  {object} g graphics context
 * @param  {number} r row index
 * @param  {number} c col index
 * @return {undefined}   No return
 */
  drawAt(g, r, c) {

    if (r < this.rows && c < this.cols) {
      let s = this.sprites[r][c];
      if (s !== null) {
        s.draw(g);
      }//end if
    }
  }//end draw at


  /**
   * Draw the center mark for vusualization
   * @param  {object} g graphics context
   * @return {undefined}  No return
   */
  drawCenterMark(g) {

    let p = this.location;
    let x = p.getX();
    let y = p.getY();
    let l = 10;
    g.strokeStyle = 'red';
    g.lineWidth = 0;

    //x+
    g.beginPath();
    g.moveTo(x,y);
    g.lineTo(x + l, y);
    g.stroke();

    //x-
    g.beginPath();
    g.moveTo(x,y);
    g.lineTo(x - l, y);
    g.stroke();

    //y+
    g.beginPath();
    g.moveTo(x,y);
    g.lineTo(x , y + l);
    g.stroke();

    //y-
    g.beginPath();
    g.moveTo(x,y);
    g.lineTo(x , y - l);
    g.stroke();

  }//end drawCenterMark

}//end class
