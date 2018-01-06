

/**
 * Splash Screen - display title logo/image
 * @type {Boolean}
 */
class SplashScreen extends BaseGameScreen {


  constructor() {
    super();


    //unit size of text character
    let char_unit_size = TextArray.TextCharUnitSize();

    let settings = Game.Settings();

    let cen_x = settings.UnitWidth / 2 * settings.UnitSize;
    let cen_y = settings.UnitHeight / 2 * settings.UnitSize;

    let line_space = settings.UnitSize * ( char_unit_size + 2);

    this.text_space = new TextArray("SPACE", new Point2d(0,0), "player");

    //go down 2 text lines from top
    let text_y = 2 * char_unit_size * settings.UnitSize;
    this.text_space.centerOnPoint(new Point2d(cen_x, text_y));

    this.text_marauders = new TextArray("MARAUDERS", new Point2d(0,0), "player");

    //move down a text line + 1/2
    text_y += 1.5 * char_unit_size * settings.UnitSize;
    this.text_marauders.centerOnPoint(new Point2d(cen_x, text_y));

    this.text_enter = new TextArray("[ENTER]", new Point2d(0,0), "player");
    //place enter just above bottom
    let enter_y = (settings.UnitHeight - char_unit_size) * settings.UnitSize;
    this.text_enter.centerOnPoint(new Point2d(cen_x, enter_y));

    // this.test_text1 = new TextArray("ABCDEFGHIJKLM", new Point2d(0,0), "player");
    // this.test_text2 = new TextArray("NOPQRSTUVWXYZ", new Point2d(0,50), "player");
    // this.test_text3 = new TextArray("0123456789", new Point2d(0,100), "player");
  //  this.test_text = new TextArray("this is a test", new Point2d(0,0), "player");

    let point = new Point2d(100,100);


    let sprites = [];

    let X = true;
    let o = false;



    let face_arr_prev = [
    	[o,o,o,o,o,o,o,o,o,X,o,o,o,o,o,o,o,o,o,X,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,X,X,X,o,o,o,o,o,o,o,X,X,X,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,X,X,o,X,X,o,o,o,o,o,X,X,o,X,X,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,X,o,o,o,X,X,o,o,o,X,X,o,o,o,X,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,o,o,X,X,X,X,X,X,X,o,o,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,o,o,X,X,X,o,X,X,X,o,o,o,o,o,o,o,o,o,o,o],
    	[o,X,X,o,o,o,o,o,o,o,X,X,X,o,o,o,X,X,X,o,o,o,o,o,o,o,X,X,o],
    	[X,X,X,o,o,o,o,o,o,X,X,o,X,X,o,X,X,o,X,X,o,o,o,o,o,o,X,X,X],
    	[X,X,X,X,X,o,o,o,o,X,o,o,o,X,X,X,o,o,o,X,o,o,o,o,X,X,X,X,X],
    	[o,o,o,X,X,X,X,o,o,X,X,o,X,X,X,X,X,o,X,X,o,o,X,X,X,X,o,o,o],
    	[o,o,o,o,o,X,X,X,o,o,X,X,X,o,X,o,X,X,X,o,o,X,X,X,o,o,o,o,o],
    	[o,o,o,o,o,o,o,X,X,o,o,X,X,o,X,o,X,X,o,o,X,X,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,o,o,o,X,X,X,X,X,o,o,o,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,o,X,X,X,X,X,X,X,X,X,o,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,X,X,o,o,X,o,X,o,o,X,X,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,X,o,o,X,o,o,o,X,o,o,X,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,X,o,o,o,X,o,X,o,o,o,X,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,X,o,o,X,o,o,o,o,o,o,o,X,o,o,X,o,o,o,o,o,o,o],
    	[o,o,o,o,o,X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X,o,o,o,o,o],
    	[o,o,o,X,X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X,X,o,o,o],
    	[X,X,X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X,X,X],
    	[X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X],
    	[o,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,o]
    ];



  ///  image loaded: 29 x 25 pixels {725}

    let face_arr = [
    	[o,o,o,o,o,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,o,o,o,o,o],
    	[o,o,o,o,X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X,o,o,o,o],
    	[o,o,o,X,X,o,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,o,X,X,o,o,o],
    	[o,o,X,X,o,o,o,X,X,o,o,o,X,X,X,X,X,o,o,o,X,X,o,o,o,X,X,o,o],
    	[o,X,X,o,o,o,o,o,X,X,X,X,X,X,X,X,X,X,X,X,X,o,o,o,o,o,X,X,o],
    	[o,X,X,o,o,o,o,o,X,X,X,X,X,X,X,X,X,X,X,X,X,o,o,o,o,o,X,X,o],
    	[o,o,o,o,o,o,o,X,X,X,X,X,X,X,o,X,X,X,X,X,X,X,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,X,X,X,X,X,X,X,o,X,X,X,X,X,X,X,o,o,o,o,o,o,o],
    	[o,X,X,o,o,o,o,o,X,X,X,o,X,X,o,X,X,o,X,X,X,o,o,o,o,o,X,X,o],
    	[X,X,X,o,o,o,o,o,o,X,X,o,o,X,X,X,o,o,X,X,o,o,o,o,o,o,X,X,X],
    	[X,X,X,X,X,o,o,o,o,X,X,X,o,X,X,X,o,X,X,X,o,o,o,o,X,X,X,X,X],
    	[o,o,o,X,X,X,X,o,o,o,X,X,X,X,X,X,X,X,X,o,o,o,X,X,X,X,o,o,o],
    	[o,o,o,o,o,X,X,X,X,o,o,X,X,o,X,o,X,X,o,o,X,X,X,X,o,o,o,o,o],
    	[o,o,o,o,o,o,o,X,X,o,o,o,X,X,X,X,X,o,o,o,X,X,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,o,X,X,X,X,X,X,X,X,X,o,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,X,X,o,o,X,o,X,o,o,X,X,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,X,o,o,X,o,o,o,X,o,o,X,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,X,o,o,o,X,o,X,o,o,o,X,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,o,o,o,X,o,o,o,o,o,o,o,X,o,o,o,o,o,o,o,o,o,o],
    	[o,o,o,o,o,o,o,X,X,o,o,o,o,o,o,o,o,o,o,o,X,X,o,o,o,o,o,o,o],
    	[o,o,o,o,o,X,X,X,X,o,o,o,o,o,o,o,o,o,o,o,X,X,X,X,o,o,o,o,o],
    	[o,o,o,X,X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X,X,o,o,o],
    	[X,X,X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X,X,X],
    	[X,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,X],
    	[o,X,X,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,X,X,o]
    ];


    //face
    this.sprites_face = new SpriteArray( new Point2d(cen_x,cen_y), face_arr, "firey");



  }//end constructor


  draw(g) {

      this.text_space.draw(g);
      this.text_marauders.draw(g);

      this.sprites_face.draw(g);

      this.text_enter.draw(g);



  }

}//end class splash screen
