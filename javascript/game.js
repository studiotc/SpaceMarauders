"use strict";

var game = null;
var game_timeout_handle = null;

function runGame(us) {

  //change the global here and only here!
  SPACE_MARAUDERS_GLBL_UNIT_SIZE = us;

  let settings = Game.Settings();
  let size = settings.UnitSize;
  let uw = settings.UnitWidth;
  let uh = settings.UnitHeight;

  let w = uw * size;
  let h = uh * size;

  establishCanvas(w,h);

  game = new SpaceMaraudersGame();

  //init window handlers
  window.addEventListener("keypress", onKeyPressed, false);
  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);


  window.addEventListener("mousedown", onMouseDown, false);
  window.addEventListener("mouseup", onMouseUp, false);

  //first intitalization
  runGameLoop();

}

/**
 * Generate the Canvas Object Dynamically
 * @return {undefined} [description]
 */
function establishCanvas(w,h) {

  let div_area = document.getElementById('SpaceMaraudersDiv');

  if(div_area === null) {
    console.error("Failed to get <Div> object id='SpaceMaraudersDiv'");
    alert("A non-recoverable error has occured, <div> is missing, please check the console log");
    return;
  }

  let canvas_text = "<canvas id='gCanvas' width='" + w + "' height='" + h + "'></canvas>";
  div_area.innerHTML = canvas_text;

}


function onKeyPressed(e) {
  if (game === null) return;
  game.onKeyPressed(e);
}

function onKeyDown(e) {
  if (game === null) return;
  game.onKeyDown(e);
}

function onKeyUp(e) {
  if (game === null) return;
  game.onKeyUp(e);
}

function onMouseUp() {

   if(game_timeout_handle === null) {
       game_timeout_handle =  window.setTimeout(runGameLoop, 0);
   } else  {

     clearTimeout(game_timeout_handle);
     game_timeout_handle = null;

   }

}


function onMouseDown() {
  if(game === null) return;
  game.onMouseDown();

}

function runGameLoop() {

  //shouldn't happen....
  if(game === null) return;

  //returns the defference in ms between framte rate and actuall excution time
  var wait_for = game.gameLoop();

  game_timeout_handle =  window.setTimeout(runGameLoop, wait_for);

}

//do not mess with this variable name
var SPACE_MARAUDERS_GLBL_UNIT_SIZE = 8;
/**
 * Class to emulate an enum
 * @type {Game}
 */
class Game {
  /**
   * These are the values for the different game states
   */
  static State() {
    return {
      Initializing : 11,
      Introduction : 117,
      Loading : 23,
      LevelMenu : 35,
      LevelPlaying : 43,
      PlayerDied : 99,
      PlayerWon : 101
    };
  }//end state


  /**
   * Global Settings for the Game
   *
   * Use singleton for basic settings
   */
  static Settings() {
    return {
        FrameRate: 60,
        UnitSize: SPACE_MARAUDERS_GLBL_UNIT_SIZE,
        UnitWidth: 100,
        UnitHeight: 75
    }
  }


  /**
   * Helper function to calculate scaled velocity uniformly across the game
   * Use this to generate a velocity that will scale with different UnitSizes
   * @param {number} velocity A velocity that will be scaled acroding to UnitSize
   */
  static CalcVelocity(velocity) {
    let us = Game.Settings().UnitSize;
    return velocity * us;
  }

}//end class game




/**
 * Game class - handles all the logic and drawing
 * @type {Bounds}
 */
class SpaceMaraudersGame {

  constructor() {

    let settings = Game.Settings();



    //the extends of the game screen
    this.game_bounds = this.getGameBounds(); //new Bounds(0,0,w,h);

    //framerate in frames per second
    this.frame_rate = 60;

    //inital game state
    let gs = Game.State();
    this.state = gs.Initializing;

    //the player - "defender"
    ////this is intialized here
    this.defender = new Defender( this.game_bounds);



    //this is the handle to the timeout which controls the game loop timing
    //this.game_timeout_handle = null;


    //splash screen / intro
    this.splash = new SplashScreen();

    this.game_intro = new GameIntroScreen();

    //default input handler for now
    //this.input_handler = new SplashInputHandler(this.splash);
    this.input_handler = new BasicScreenInputHandler(this.splash);


    //level manager
    this.level_mngr = new LevelManager(this, this.defender, this.game_bounds);

    console.log("Game Started.");

  }//end constructor

/**
 * Calc a new GameBounds
 * @return {[type]} [description]
 */
  getGameBounds() {

    let settings = Game.Settings();
    let w = settings.UnitWidth * settings.UnitSize;
    let h = settings.UnitHeight * settings.UnitSize;
    return new Bounds(0,0,w,h);

  }

  getEnemyAreaBounds() {

    let settings = Game.Settings();

    let gutter = 7 * settings.UnitSize;

    let w = settings.UnitWidth * settings.UnitSize;
    let h = settings.UnitHeight * settings.UnitSize / 2;//half the overall height
    return new Bounds(gutter,0,w - gutter,h);


  }

  /**
   * Set the Input Handler
   * @param {[type]} inputHandler [description]
   */
  setInputHandler(inputHandler) {
    this.input_handler = inputHandler;
  }

  /**
   * Key Pressed Event
   * @param  {object} e Event arguments
   * @return {undefined} No return
   */
   onKeyPressed(e) {
      //console.log("key pressed :" + e.keyCode);
        this.input_handler.onKeyPressed(e);
  }

  /**
   * Key Down Event
   * @param {object} e Event arguments
   * @return {undefined} No return
   */
   onKeyDown(e) {
      this.input_handler.onKeyDown(e);
  }

  /**
   * Key Up Event
   * @param {object} e Event arguments
   * @return {undefined} No return
   */
   onKeyUp(e) {
     this.input_handler.onKeyUp(e);
  }

  /**
   * Mouse Down Event
   * @return {undefined} No return
   */
   onMouseDown(e) {
     this.input_handler.onMouseDown(e);
  }

  /**
   * Mouse Up Event
   * @return {[type]} [description]
   */
   onMouseUp() {
     this.input_handler.onMouseUp(e);
  }


  /**
   * Main Game Loop
   * @return {undefined} No return
   */
   gameLoop() {

    //current milliseconds
    var loop_ms_start = Date.now();

    //sort of enums...
    let gs = Game.State();

    //get the graphics object
    var canvas = document.getElementById("gCanvas");
    var g = canvas.getContext('2d');

    //let state = this.state;
    switch(this.state) {

      case gs.Initializing:

        if (this.splash.isFinished()) {
          //move to next state
          this.state = gs.Introduction;
          this.input_handler = new BasicScreenInputHandler(this.game_intro);
        } else {
          this.drawSplashScreen(g);
        }


        break;

      case gs.Introduction:

        //Introduction
        if(this.game_intro.isFinished()) {
          //start new defender & level manager
          this.defender = new Defender( this.game_bounds);
          this.level_mngr = new LevelManager(this, this.defender, this.game_bounds);
          //move to next state
          this.state = gs.LevelPlaying;
          //set input handler for player
          //this.input_handler = new PlayerInputHandler(this.defender);
          this.input_handler = this.level_mngr.getInputHandler();

        } else {
          //draw
          this.drawIntroScreen(g)
        }

        break;

      case gs.LevelPlaying:

        if(this.level_mngr.update()) {
          this.level_mngr.draw(g);
        } else {

          this.splash.resetScreen();
          this.game_intro.resetScreen();

          this.input_handler = new BasicScreenInputHandler(this.splash);
          this.state = gs.Initializing;
          //console.log("level manager done");

        }


        break;

    }//end switch state

    //draw the outline
    //this.drawOutline(g);

    //frame duration in milliseconds
    var ms_frame = 1000 / this.frame_rate;
    //current milliseconds after update and draw
    var loop_ms_end = Date.now();
    var loop_time = loop_ms_end - loop_ms_start;
    //allow for slowdown if longer than a frame
    var loop_wait = Math.max(ms_frame - loop_time, 0);

    //testing - so far so good
    // if(loop_time >=  ms_frame) {
    //   console.log("Frame rate exceeded");
    //
    //   let ms_min = 1000 / 30;
    //   if (loop_time > ms_min) {
    //     console.log("Minimum 30 FPS rate exceeded");
    //   }
    //
    // }

    return loop_wait;


  }//end game loop




/**
 * Draw the Splash Screen
 * @type {undefined} No return
 */
  drawSplashScreen(g) {

    var cw = g.canvas.width;
    var ch = g.canvas.height;

    g.clearRect(0,0,cw,ch);
    this.splash.draw(g);


  }//end drw splash screen

  drawIntroScreen(g) {

    var cw = g.canvas.width;
    var ch = g.canvas.height;

    g.clearRect(0,0,cw,ch);
    this.game_intro.draw(g);


  }//end drw splash screen


/**
 * Draw the outline of the canvas
 * @param  {[type]} g [description]
 * @return {[type]}   [description]
 */
  drawOutline(g) {
    var cw = g.canvas.width;
    var ch = g.canvas.height;
    //draw outline
    g.strokeStyle = 'white';
    g.lineWidth = 1;

    g.beginPath();
    g.rect(0, 0, cw, ch);
    g.stroke();
  }

}//end class  SpaceMaraudersGame
