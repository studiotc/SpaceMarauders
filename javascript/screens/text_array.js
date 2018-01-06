


/**
 * CLass to display a single line of text
 */

class TextArray {

  constructor(text, position, color_engine) {

    this.text = text;
    this.position = position;


    this.color_engine = color_engine;

    this.sprite_arrays = [];

    //this will be determined whena ray is intialized
    this.bounds = new Bounds(0,0,1,1);

    this.initTextArray();

  }//end constructor


  draw(g) {

    let sl = this.sprite_arrays.length;
    let i =0;
    for(i=0;i<sl;i++) {
      let sa = this.sprite_arrays[i];
      sa.draw(g);
    }


  }//end draw


/**
 * Init the Text Array (array of sprite arrays)
 * @return {undefined} No Return
 */
 initTextArray() {



  let point = this.position;
  let text = this.text;
  let al = this.text.length;

  //clear array
  //this.sprite_arrays = new Array(al);
  this.sprite_arrays = [];

  let settings = Game.Settings();

  //all arrays for text are 5x5
  //uniform array size  and gap between
  let u_size = 5 * settings.UnitSize;
  let u_gap = settings.UnitSize;



  let x = point.getX();
  let y = point.getY();

  //centering offset for array
  //sprite arrays are centered
  x += u_size / 2;
  y += u_size / 2;

  //new bounds for this object
  let t_bounds = null;

  let i = 0;

  for(i=0; i < al; i++) {

    //get single string - not char
    let c = text.substr(i,1);
    //force uppcase
    let uc = c.toUpperCase();
    let n_uc = uc.charCodeAt(0);
    //console.log("processing: " + c + " : " + uc + "{" +  n_uc + "}");

    //skip on space, let x advance
  //  if(n_uc !== 32) {

      let t_array = TextArray.GetTextFromCode(n_uc);
      //init the array
      let s_array = new SpriteArray( new Point2d(x,y), t_array, this.color_engine);

      if(t_bounds === null) {
        //make a safe copy
        t_bounds = Bounds.copy(s_array.getBounds());
      } else {
        t_bounds.union(s_array.getBounds());
      }

      //this.sprite_arrays[i] = s_array;
      this.sprite_arrays.push(s_array);

    //}


    //advance x
    x += u_size + u_gap;

  }//end for

  //set the bounds object
  this.bounds = t_bounds;

}// end GetTextArray

/**
 * Center the Text Array on a point
 * @param  {[type]} point [description]
 * @return {undefined}    No Return
 */
centerOnPoint(point) {


  let cur_cx = this.bounds.centerX();
  let cur_cy = this.bounds.centerY();

  let tx = point.getX() - cur_cx;
  let ty = point.getY() - cur_cy;

  let sl = this.sprite_arrays.length;
  let s = 0;
  for(s=0;s<sl;s++) {

    let sarr = this.sprite_arrays[s];
    let spnt = Point2d.copy(sarr.getLocation());
    //update the spriteArray
    spnt.translate(tx,ty);
    //push it back to update all child sprites
    sarr.setLocation(spnt);

  }//end

}//end centerOnPoint

/**
 * This is the Size of each text character
 * Each character is a 5x5 array
 * @return {number}  Size of Text Char array (uniform array)
 */
static TextCharUnitSize() {
    return 5;
}
/**
 * Get the Template Array for the specified char code
 * @param {number} code CHar code for the character to generate
 * @return {boolean[][]}  An array to be used for creating a TextArray
 */
static GetTextFromCode(code) {

  let s_arr = [];

  let X = true;
  let O = false;

  switch(code) {

    // letter: <space>
    case 32:
       s_arr = [
               [O,O,O,O,O],
               [O,O,O,O,O],
               [O,O,O,O,O],
               [O,O,O,O,O],
               [O,O,O,O,O]
               ];
       break;

   // letter: !
   case 33:
      s_arr = [
              [O,O,X,O,O],
              [O,O,X,O,O],
              [O,O,X,O,O],
              [O,O,O,O,O],
              [O,O,X,O,O]
              ];
      break;
    // letter:A
    case 65:
       s_arr = [
               [O,O,X,O,O],
               [O,X,O,X,O],
               [O,X,O,X,O],
               [X,O,X,O,X],
               [X,O,O,O,X]
               ];
       break;


    // letter: B
    case 66:
       s_arr = [
               [X,X,X,X,O],
               [X,O,O,O,X],
               [X,X,X,X,O],
               [X,O,O,O,X],
               [X,X,X,X,O]
               ];
       break;


    // letter: C
    case 67:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,X],
               [X,O,O,O,O],
               [X,O,O,O,X],
               [O,X,X,X,O]
               ];
       break;


    // letter: D
    case 68:
       s_arr = [
               [X,X,X,X,O],
               [X,O,O,O,X],
               [X,O,O,O,X],
               [X,O,O,O,X],
               [X,X,X,X,O]
               ];
       break;


    // letter: E
    case 69:
       s_arr = [
               [X,X,X,X,X],
               [X,O,O,O,O],
               [X,X,X,X,X],
               [X,O,O,O,O],
               [X,X,X,X,X],
               ];
       break;


    // letter: F
    case 70:
       s_arr = [
               [X,X,X,X,X],
               [X,O,O,O,O],
               [X,X,X,X,X],
               [X,O,O,O,O],
               [X,O,O,O,O]
               ];
       break;


    // letter: G
    case 71:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,X],
               [X,O,O,O,O],
               [X,O,O,X,X],
               [O,X,X,X,O]
               ];
       break;


    // letter: H
    case 72:
       s_arr = [
               [X,O,O,O,X],
               [X,O,O,O,X],
               [X,X,X,X,X],
               [X,O,O,O,X],
               [X,O,O,O,X],
               ];
       break;


    // letter: I
    case 73:
       s_arr = [
               [X,X,X,X,X],
               [O,O,X,O,O],
               [O,O,X,O,O],
               [O,O,X,O,O],
               [X,X,X,X,X]
               ];
       break;


    // letter: J
    case 74:
       s_arr = [
               [X,X,X,X,X],
               [O,O,O,X,O],
               [O,O,O,X,O],
               [X,O,O,X,O],
               [O,X,X,O,O]
               ];
       break;


    // letter: K
    case 75:
       s_arr = [
               [X,O,O,O,X],
               [X,O,O,X,O],
               [X,X,X,X,O],
               [X,O,O,O,X],
               [X,O,O,O,X]
               ];
       break;


    // letter: L
    case 76:
       s_arr = [
               [X,O,O,O,O],
               [X,O,O,O,O],
               [X,O,O,O,O],
               [X,O,O,O,O],
               [X,X,X,X,X]
               ];
       break;


    // letter: M
    case 77:
       s_arr = [
               [X,O,O,O,X],
               [X,X,O,X,X],
               [X,O,X,O,X],
               [X,O,O,O,X],
               [X,O,O,O,X]
               ];
       break;


    // letter: N
    case 78:
       s_arr = [
               [X,O,O,O,X],
               [X,X,O,O,X],
               [X,O,X,O,X],
               [X,O,O,X,X],
               [X,O,O,O,X]
               ];
       break;


    // letter: O
    case 79:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,X],
               [X,O,O,O,X],
               [X,O,O,O,X],
               [O,X,X,X,O]
               ];
       break;


    // letter: P
    case 80:
       s_arr = [
               [X,X,X,X,O],
               [X,O,O,O,X],
               [X,X,X,X,O],
               [X,O,O,O,O],
               [X,O,O,O,O]
               ];
       break;


    // letter: Q
    case 81:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,X],
               [X,O,X,O,X],
               [X,O,O,X,O],
               [O,X,X,O,X]
               ];
       break;


    // letter: R
    case 82:
       s_arr = [
               [X,X,X,X,O],
               [X,O,O,O,X],
               [X,X,X,X,O],
               [X,O,O,O,X],
               [X,O,O,O,X]
               ];
       break;


    // letter: S
    case 83:
       s_arr = [
               [O,X,X,X,X],
               [X,O,O,O,O],
               [X,X,X,X,X],
               [O,O,O,O,X],
               [X,X,X,X,O]
               ];
       break;


    // letter: T
    case 84:
       s_arr = [
               [X,X,X,X,X],
               [O,O,X,O,O],
               [O,O,X,O,O],
               [O,O,X,O,O],
               [O,O,X,O,O]
               ];
       break;


    // letter: U
    case 85:
       s_arr = [
               [X,O,O,O,X],
               [X,O,O,O,X],
               [X,O,O,O,X],
               [X,O,O,O,X],
               [O,X,X,X,O]
               ];
       break;


    // letter: V
    case 86:
       s_arr = [
               [X,O,O,O,X],
               [X,O,O,O,X],
               [O,X,O,X,O],
               [O,X,O,X,O],
               [O,O,X,O,O]
               ];
       break;


    // letter: W
    case 87:
       s_arr = [
               [X,O,O,O,X],
               [X,O,O,O,X],
               [X,O,X,O,X],
               [X,X,O,X,X],
               [X,O,O,O,X]
               ];
       break;


    // letter: X
    case 88:
       s_arr = [
               [X,O,O,O,X],
               [O,X,O,X,O],
               [O,O,X,O,O],
               [O,X,O,X,O],
               [X,O,O,O,X]
               ];
       break;


    // letter: Y
    case 89:
       s_arr = [
               [X,O,O,O,X],
               [O,X,O,X,O],
               [O,O,X,O,O],
               [O,O,X,O,O],
               [O,O,X,O,O]
               ];
       break;


    // letter: Z
    case 90:
       s_arr = [
               [X,X,X,X,X],
               [O,O,O,X,O],
               [O,O,X,O,O],
               [O,X,O,O,O],
               [X,X,X,X,X]
               ];
       break;


    // letter: 0
    case 48:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,X],
               [X,O,O,X,X],
               [X,O,O,X,X],
               [O,X,X,X,O]
               ];
       break;


    // letter: 1
    case 49:
       s_arr = [
               [X,X,X,O,O],
               [O,O,X,O,O],
               [O,O,X,O,O],
               [O,O,X,O,O],
               [X,X,X,X,X]
               ];
       break;


    // letter: 2
    case 50:
       s_arr = [
               [X,X,X,X,O],
               [O,O,O,O,X],
               [O,O,X,X,O],
               [O,X,O,O,O],
               [X,X,X,X,X]
               ];
       break;


    // letter: 3
    case 51:
       s_arr = [
               [X,X,X,X,O],
               [O,O,O,O,X],
               [O,X,X,X,O],
               [O,O,O,O,X],
               [X,X,X,X,O]
               ];
       break;


    // letter: 4
    case 52:
       s_arr = [
               [X,O,O,X,O],
               [X,O,O,X,O],
               [X,X,X,X,X],
               [O,O,O,X,O],
               [O,O,O,X,O]
               ];
       break;


    // letter: 5
    case 53:
       s_arr = [
               [X,X,X,X,X],
               [X,O,O,O,O],
               [X,X,X,X,O],
               [O,O,O,O,X],
               [X,X,X,X,O]
               ];
       break;


    // letter: 6
    case 54:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,O],
               [X,X,X,X,O],
               [X,O,O,O,X],
               [O,X,X,X,O]
               ];
       break;


    // letter: 7
    case 55:
       s_arr = [
               [X,X,X,X,X],
               [O,O,O,O,X],
               [O,O,O,X,O],
               [O,O,X,O,O],
               [O,X,O,O,O]
               ];
       break;


    // letter: 8
    case 56:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,X],
               [O,X,X,X,O],
               [X,O,O,O,X],
               [O,X,X,X,O]
               ];
       break;


    // letter: 9
    case 57:
       s_arr = [
               [O,X,X,X,O],
               [X,O,O,O,X],
               [O,X,X,X,X],
               [O,O,O,O,X],
               [O,X,X,X,O]
               ];
       break;

   // letter: -
   case 45:
      s_arr = [
              [O,O,O,O,O],
              [O,O,O,O,O],
              [X,X,X,X,X],
              [O,O,O,O,O],
              [O,O,O,O,O]
              ];
      break;

      // letter: :
      case 58:
         s_arr = [
                 [O,O,O,O,O],
                 [O,O,X,O,O],
                 [O,O,O,O,O],
                 [O,O,X,O,O],
                 [O,O,O,O,O]
                 ];
         break;

       // letter: <
       case 60:
          s_arr = [
                  [O,O,O,X,O],
                  [O,O,X,O,O],
                  [O,X,O,O,O],
                  [O,O,X,O,O],
                  [O,O,O,X,O]
                  ];
          break;

    // letter: >
    case 62:
       s_arr = [
               [O,X,O,O,O],
               [O,O,X,O,O],
               [O,O,O,X,O],
               [O,O,X,O,O],
               [O,X,O,O,O]
               ];
       break;

     // letter: [
     case 91:
        s_arr = [
                [O,X,X,X,O],
                [O,X,O,O,O],
                [O,X,O,O,O],
                [O,X,O,O,O],
                [O,X,X,X,O]
                ];
        break;

      // letter: ]
      case 93:
         s_arr = [
                 [O,X,X,X,O],
                 [O,O,O,X,O],
                 [O,O,O,X,O],
                 [O,O,O,X,O],
                 [O,X,X,X,O]
                 ];
         break;


       // letter: +
       case 43:
          s_arr = [
                  [O,O,X,O,O],
                  [O,O,X,O,O],
                  [X,X,X,X,X],
                  [O,O,X,O,O],
                  [O,O,X,O,O]
                  ];
          break;


       // letter: |
       case 124:
          s_arr = [
                  [O,O,X,O,O],
                  [O,O,X,O,O],
                  [O,O,X,O,O],
                  [O,O,X,O,O],
                  [O,O,X,O,O]
                  ];
          break;




      default:
        console.error("Unrecognized text code in TextArray.GetTextFromCode : " + code);
        break;

  }//end switch

  //return the array
  return s_arr;

}//end get text from code


}//end class
