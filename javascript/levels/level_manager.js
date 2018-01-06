
/**
 * Class to emulate an enum
 * @type {Level}
 */
class Level {
  /**
   * These are the values for the different game states
   */
  static State() {
    return {
      Initializing : 7,
      WaveReady : 11,
      Playing : 42,
      WaveComplete : 99
    };
  }//end state

/**
 * Values for elvel update return
 */
  static Update() {
    return {
      Continue : 3,
      Completed : 1000,
      PlayerDied : 101
    };
  }
}//end class Level


/**
 * Manages the levels
 * @type {LevelManager}
 */
class LevelManager {

  /**
   * Construct the level manager with te game bounds
   * @param  {Bounds} gamebounds Extetns of teh game (complete canvas size)
   * @return {LevelManager}            The Level manager
   */
  constructor(game, defender, gamebounds) {

    this.game = game;
    this.game_bounds = gamebounds;


    let lrm = 60;
    //this.enemy_bounds = new Bounds(gamebounds.minX() + lrm, 0, gamebounds.maxX() - lrm, gamebounds.maxY()-240);

    this.enemy_bounds = this.game.getEnemyAreaBounds();

    //the player - "defender"
    //intialized at game level
    this.defender = defender;

    //testing
    //this.marauder = new MarauderA1(new Point2d(this.enemy_bounds.centerX(),this.enemy_bounds.minY() + 40) , this.enemy_bounds );

    //enemy projectiles collection
    this.proj_enemy = new ProjectileManager( this.game_bounds );

    //player projectiles
    this.proj_player = new ProjectileManager( this.game_bounds );

    //enemies collection
    this.enemies = new MarauderManager(this.enemy_bounds);



    //score keeper
    this.stats = new StatTracker();

    this.city = new City(this.game_bounds);

    //input handler
    this.input_handler = new PlayerInputHandler(this.defender);

    this.fx_manager = new FX_Manager();

    this.player_alive = true;

    let state = Level.State();
    this.state = state.Initializing;

    this.wave_screen = new WaveReadyScreen();
    this.wave_completed_screen = new WaveCompletedScreen();
    this.game_over_screen = new GameOverScreen();

    this.visor = new Visor(defender, this.stats);

    this.generator = new WaveGenerator(this.enemies);

    this.wave = 1;
    //number of waves until game is won
    this.wave_count = 3;



  }//end constructor

/**
 * Get the input handler for the level manager
 * @return {[type]} [description]
 */
  getInputHandler() {

    return this.input_handler;

  }

  /**
   * Update the level manager
   * @return {[type]} [description]
   */
  update() {

    let lm_alive = true;

    let state = Level.State();

    switch (this.state) {

      case state.Initializing:

        //reset the screens
        this.resetScreens();

        //clear marauders
        this.enemies.clear();
        //clear fx
        this.fx_manager.clear();
        //clear projectiles
        this.proj_player.clear();
        this.proj_enemy.clear();

        //reset player controls
        this.defender.clearAllInputFlags();



        //update generator
        this.generator.setWave(this.wave);
        //show wave Ready
        this.wave_screen.setWave(this.wave);

        //input handling
        this.input_handler = new BasicScreenInputHandler(this.wave_screen);
        this.game.setInputHandler(this.input_handler);

        //move to next state
        this.state = state.WaveReady;
        break;

      case state.WaveReady:

        //check the wavescreen
        if(this.wave_screen.isFinished()) {
          //setup player
          this.input_handler = new PlayerInputHandler(this.defender);
          this.game.setInputHandler(this.input_handler);
          this.state = state.Playing;
        }

        break;

      case state.Playing:
        //psuedo enums...
        let update_vals = Level.Update();
        let lupdate = this.updateLevel();

        if(lupdate !== update_vals.Continue) {

          //update bonuses after wave
          let cityHp = this.city.getHitPoints();
          let playerHp = this.defender.getHitPoints();
          let cityBonus = this.stats.updateCityBonus(this.wave, cityHp);
          let playerBonus = this.stats.updatePlayerBonus(playerHp);

          //repair city
          this.city.repair();
          console.log("city hp = " + cityHp + ", bonus = " + cityBonus) ;
          console.log("player hp = " + playerHp + ", bonus = " + playerBonus);

          //update wave completed screen
          this.wave_completed_screen.setDisplay(this.player_alive, this.wave, this.wave_count, playerBonus, cityBonus);

          this.input_handler = new BasicScreenInputHandler(this.wave_completed_screen);
          this.game.setInputHandler(this.input_handler);
          this.defender.clearAllInputFlags();
          //go to wave complete
          this.state = state.WaveComplete;
        } //end if

        break;

      case state.WaveComplete:

        if(this.wave_completed_screen.isFinished()) {

          if(this.player_alive) {
            //was this the last wave?
            if (this.wave === this.wave_count) {
              //you have won! Level manager can exit
              lm_alive = false;
            } else {
              //more waves - set the wave number
              this.wave += 1;
              //go to the top
              this.state = state.Initializing;
            }

          } else {
            //player died
            lm_alive = false;

          }//end if else player alive

        }//end if else wave screen

        break;

    }//end switch

    return lm_alive;

  }//end update


  /**
   * Reset all screens
   */
  resetScreens() {

    this.wave_screen.resetScreen();
    this.wave_completed_screen.resetScreen();
    this.game_over_screen.resetScreen();
  }

  /**
   * Update the current level
   * @return {undefined} [description]
   */
  updateLevel() {

    //update the projectiles
    this.proj_player.update(null);

    //perform hit test - check against enemy projectiles
    this.proj_player.projectileHitTest(this.proj_enemy, this.fx_manager);

    //perform hit test - check against enemies
    this.proj_player.enemyHitTest(this.enemies, this.fx_manager);

    //update enemy projectiles
    this.proj_enemy.update(this.stats);

    //perform hit test against barriers?...


    //don't check if player is already dead
    if (this.player_alive) {
      //perform hit test against player
      this.proj_enemy.characterHitTest(this.defender, this.fx_manager);
    }


    //perform hit test against city
    this.proj_enemy.characterHitTest(this.city, this.fx_manager);

    //don't update player if dead
    if (this.player_alive) {

      //update the defender
      var cu = this.defender.update();

      //still alive?
      if(cu.isAlive()) {

        //check for firing
        if(cu.isFiring()) {
          let dp = cu.getProjectile();
          this.proj_player.addNew(dp);
        }

      } else {
        //player died!  do something.....
        this.enemies.signalPlayerDied();
        //console.log("<<< Player Dead! >>>");
        let pkfx = new PlayerKilledFX(this.defender.getLocation());
        this.fx_manager.add(pkfx);
        this.player_alive = false;

      }

    }//end if player alive


    //update enemies with projectile list
    this.enemies.update(this.proj_enemy, this.fx_manager, this.stats);

    //update the fx manger
    this.fx_manager.update();

    //update the city
    var city_u = this.city.update();

    if (this.player_alive) {
        //update generator
        this.generator.update();
    }

    /*
         Check for level conditions
     */
     let level_result = Level.Update().Continue;
     //done generating marauders
     let g_done = this.generator.isFinished();
     //marauders are all dead
     let m_done = !this.enemies.hasMarauders();
     //no enemy projectiles are in the air
     let ep_done = !this.proj_enemy.hasProjectiles();
     //no player projectiles are flying
     let pp_done = !this.proj_player.hasProjectiles();
     //fx executing?
     let fx_done = !this.fx_manager.hasFX();

    if (this.player_alive) {
      if (g_done && m_done && ep_done && fx_done) {
         level_result = Level.Update().Completed;
      }

    } else {
      //player died
      //see if enemy and player projectiles are done
      if(ep_done && pp_done && fx_done) {
        level_result = Level.Update().PlayerDied;
      }

    }

    return level_result;

  }//end update

/**
 * Draw the level manager
 * @param  {object} g The canvas graphics context
 * @return {[type]}   [description]
 */
 draw(g) {

   //clear the screen
   var cw = g.canvas.width;
   var ch = g.canvas.height;

   g.clearRect(0,0,cw,ch);

   //get the states
   let state = Level.State();

   //check current state
   switch (this.state) {

     case state.Initializing:


       break;

     case state.WaveReady:

       this.drawLevel(g);
       this.drawWaveScreen(g);

       break;

     case state.Playing:
       this.drawLevel(g);
       break;

     case state.PlayerDead:
       //this.drawLevel(g);
       this.drawPartialLevel(g)
       this.game_over_screen.draw(g);
       break;

     case state.WaveComplete:
      //  this.drawLevel(g);
      this.drawPartialLevel(g)
       this.wave_completed_screen.draw(g);
       break;



   }//end switch


}//end draw

/**
 * Draw the level
 * @param  {object} g The canvas graphics context
 * @return {undefined}   No return
 */
drawLevel(g) {
  // var canvas = document.getElementById("gCanvas");
  // var g = canvas.getContext('2d');

  this.city.draw(g);

  //darw enemy test
  //this.marauder.draw(g);
  this.enemies.draw(g);

  if (this.player_alive) {
    //draw player
    this.defender.draw(g);
  }


  //draw projectiles
  this.proj_enemy.draw(g);

  this.proj_player.draw(g);

  //draw the FX
  this.fx_manager.draw(g);

  //update visor and draw
  this.visor.updateScoreText();
  this.visor.draw(g);

}//end draw level

/**
 * Partial Drawing of the background - city & player
 * DOn't display any enemies or projectiles
 * @param  {object} g The canvas graphics context
 * @return {undefined}   No return
 */
drawPartialLevel(g) {
  // var canvas = document.getElementById("gCanvas");
  // var g = canvas.getContext('2d');

  this.city.draw(g);

  //darw enemy test
  //this.marauder.draw(g);
  this.enemies.draw(g);

  if (this.player_alive) {
    //draw player
    this.defender.draw(g);
  }

  //darken screen behind
  var cw = g.canvas.width;
  var ch = g.canvas.height;
  g.fillStyle = "rgba(0,0,0,0.75)";
  g.fillRect(0,0,cw,ch);

  //update visor and draw
  this.visor.updateScoreText();
  this.visor.draw(g);

}//end draw level


/**
 * Draw the wave screen
 * @param  {[type]} g [description]
 * @return {[type]}   [description]
 */
drawWaveScreen(g) {
  this.wave_screen.draw(g);
}


}//end class LevelManager
