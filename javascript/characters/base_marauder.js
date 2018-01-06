

class BaseMarauder extends BaseCharacter {

  constructor(bounds) {
    super(bounds);


    this.player_dead = false;

  }



  /**
   * Signal PLayer is dead
   * FOr now this should lead to no firing
   * @return {[type]} [description]
   */
  signalPlayerDied() {

    this.player_dead = true;

  }



}//end class
