

/**
 *
 *This should should display basic controls
 *and a game start option
 *
 */

class GameIntroScreen extends BaseGameScreen {

  constructor() {
    super();

    this.text_lines = [];

    //unit size of text character
    let char_unit_size = TextArray.TextCharUnitSize();

    let settings = Game.Settings();

    let cen_x = settings.UnitWidth / 2 * settings.UnitSize;
    let cen_y = settings.UnitHeight / 2 * settings.UnitSize;
    let bot_y = settings.UnitHeight * settings.UnitSize;

    let line_space = settings.UnitSize * ( char_unit_size + 2);

    let ty = line_space / 2;


    let tarr1 = new TextArray("- CONTROLS -", new Point2d(0,0), "player");
    tarr1.centerOnPoint(new Point2d(cen_x, ty));
    this.text_lines.push ( tarr1 );

    ty += line_space;
    let tarr2 = new TextArray("RIGHT:[D][->]", new Point2d(0,0), "player");
    tarr2.centerOnPoint( new Point2d(cen_x, ty));
    this.text_lines.push ( tarr2 );

    ty += line_space;
    let tarr3 = new TextArray("LEFT :[A][<-]", new Point2d(0,0), "player");
    tarr3.centerOnPoint( new Point2d(cen_x, ty));
    this.text_lines.push ( tarr3 );

    ty += line_space;
    let tarr4 =  new TextArray("FIRE :[SPACE]", new Point2d(0,0), "player");
    tarr4.centerOnPoint( new Point2d(cen_x, ty));
    this.text_lines.push ( tarr4 );

    ty += line_space;
    let tarr5 =  new TextArray("      [ENTER]", new Point2d(0,0), "player");
    tarr5.centerOnPoint( new Point2d(cen_x, ty));
    this.text_lines.push ( tarr5 );

    ty += line_space;
    let tarr6 =  new TextArray("PAUSE:<CLICK>", new Point2d(0,0), "player");
    tarr6.centerOnPoint( new Point2d(cen_x, ty));
    this.text_lines.push ( tarr6 );


    ty = bot_y - (line_space / 2);
    let tarr7 = new TextArray("START [ENTER]", new Point2d(80,540), "player");
    tarr7.centerOnPoint( new Point2d(cen_x, ty));
    this.text_lines.push ( tarr7 );


  }



  /**
   * Draw the Game intro Screen
   * @param  {object} g Canvas graphics context object
   * @return {undefined}  No return
   */
  draw(g) {


    let tll = this.text_lines.length;
    let l = 0;
    for(l = 0; l < tll; l++) {
      let sa = this.text_lines[l];
      sa.draw(g);

    }


  }//end draw

}//GameIntroScreen
