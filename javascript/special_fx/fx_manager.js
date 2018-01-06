

/**
 * FX_Manger - handles all the special FX sequeneces
 * @type {Array}
 */
class FX_Manager {

  constructor() {

    //fx list
    this.fxlist = [];

  }

  /**
   * Check if there are active FX
   * @return {Boolean} True if there are active FX, false otherwise
   */
  hasFX() {
    return this.fxlist.length > 0;
  }

  /**
   * Clear the FX list
   * @return {[type]} [description]
   */
  clear() {
    this.fxlist = [];
  }


/**
 * Add an FX to the list
 * @param {[type]} fx [description]
 */
  add(fx) {

    this.fxlist.push(fx);

  }//end add




/**
 * Update the FX items
 * @return {undefines} No Return
 */
  update() {

    let i =0;
    let fxlen = this.fxlist.length;
    let alive_fx = [];

    for(i = 0; i < fxlen; i++) {

      let fx = this.fxlist[i];
      if ( fx.update() ) {
        alive_fx.push(fx);
      } else {
        //console.log("removing fx");
      }

    }//end for

    //swap lists
    this.fxlist = alive_fx;

  }//end update


/**
 * Draw the FX Items
 * @param  {object} g Canvas graphics context to paint to
 * @return {undefined}  No return
 */
  draw(g) {

    let i =0;
    let fxl = this.fxlist.length;

    for(i = 0; i < fxl; i++) {

      let fx = this.fxlist[i];
      fx.draw(g);

    }//end for



  }//end draw



}//end clas FX_Manager
