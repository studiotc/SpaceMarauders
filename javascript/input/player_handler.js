



class PlayerInputHandler extends InputHandler{

  constructor(player) {
    super();

    this.player = player;

  }



  /**
   * Key Down Event
   * @param {object} e Event arguments
   * @return {undefined} No return
   */
   onKeyDown(e) {

      var keyCode = e.keyCode;

        switch(keyCode) {

          //left arrow or 'a'
          case 37:
          case 65:

            this.player.movingLeft(true);
            break;

          //right arrow or 'd'
          case 39:
          case 68:

            this.player.movingRight(true);
            break;

            //space or enter
          case 13:
          case 32:
            this.player.isFiring(true);
            break;

        }//end switch

  }//onKeyDown


  /**
   * Key Up Event
   * @param {object} e Event arguments
   * @return {undefined} No return
   */
   onKeyUp(e) {

      var keyCode = e.keyCode;

       //console.log("key up: " + keyCode);


        switch(keyCode) {

          //left arrow or 'a'
          case 37:
          case 65:

            this.player.movingLeft(false);
            break;

          //right arrow or 'd'
          case 39:
          case 68:

            this.player.movingRight(false);
            break;

          //space or enter
          case 32:
          case 13:
            this.player.isFiring(false);
            break;


        }//end switch

  }//end onKeyUp



}//end class PlayerInputHandler
