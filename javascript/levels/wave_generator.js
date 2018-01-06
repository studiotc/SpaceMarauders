



/**
 * Class to spawn enemies
 */
class WaveGenerator {

  /**
   * Intialize WaveGenerator
   * @param  {MarauderManager} marauders MarauderManger to spwn enemies into
   * @return {WaveGenerator}           WaveGenerator object
   */
  constructor(marauders) {

    this.wave = 0;

    this.marauders = marauders;

    this.frame_rate = Game.Settings().FrameRate;

    this.spawn_timer = 0;
    this.spawn_delay = this.frame_rate * 2;

    //number of marauders spawned
    this.spawn_count = 0;
    //number of marauders to be spwaned
    //spawning is complete when spawn_count reaches this number
    this.spawn_for_wave = 5;

    this.is_finished = false;

    //testing
    this.player_dead = false;

  }

/**
 * Get teh current Wave
 * @return {[type]} [description]
 */
  getWave() {
    return this.wave;
  }


/**
 * Initialize a new wave
 * @param {[type]} wave [description]
 */
  setWave(wave) {
    this.wave = wave;

    //reset finished
    this.is_finished = false;


    //reset spawn count
    this.spawn_count = 0;
    //how many to spawn for wave - 2 for testing
    this.spawn_for_wave = 5; //10 + (wave * 2);

    //baseline of 2 seconds, then factor down for wave
    //little faster each wave
    this.spawn_delay = this.frame_rate * 2 - wave * 2;


    //testing
    this.player_dead = false;

  }//end set wave

  /**
   * Signal that the Player has died
   * @return {[type]} [description]
   */
  signalPlayerDead() {
    this.player_dead = false;
  }

/**
 * Check if the generator is done spawnig for the level
 * @return {boolean} True if done spawning, False if more to spaw
 */
  isFinished() {
    return this.is_finished;
  }

  /**
   * Update the WaveGenerator
   * @return {undefined} No Return
   */
  update() {


    //are there more to spawn?
    if (this.spawn_count >= this.spawn_for_wave) {
      this.is_finished = true;
    } else {

      //check for spawn
      this.spawn_timer += 1;
      if (this.spawn_timer > this.spawn_delay ) {

        //this.spawn_count = 0;
        //this.spawn_delay = MathUtil.randomInt(60 * 1, 60 * 5);

        this.spawn_timer = 0;
        //increment counter
        this.spawn_count += 1;
        this.marauders.spawn();
      }

    }//end if/else spwn count


  }//end update


}//end class  WaveGenerator
