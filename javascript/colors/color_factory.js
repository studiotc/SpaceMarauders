





/**
 * Color Factory
 * Create a new Color
 * This is used to populate sprite arrys with unique colors
 * @type {[type]}
 */
class ColorFactory  {

/**
 * Create a color from the identifier
 * @param  {string} engine String identifier of color to create
 * @return {ColorEngine}  THe created ColorEngine object (or subclass)
 */
  static createOld(engine) {


    if (engine === "static") {
      return new ColorEngine(255,255,255,255);

    } else if (engine === "player") {
      return new ColorPlayer();

    } else if (engine === "player_bullet") {
      return new ColorBullet();

    } else if (engine === "flash_fade") {
      return new ColorFlashFade();

    } else if (engine === "flash_fade_firey") {
      return new ColorFlashFadeFirey();

    } else if (engine === "city") {
      return new ColorCity();

    } else if (engine === "firey") {
      return new ColorFirey();

    } else if (engine === "firey_fade") {
      return new ColorFireyFade();

    } else if (engine === "marauderA1") {
      return new ColorMA1();

    } else if (engine === "marauderA2") {
      return new ColorMA2();

    } else if (engine === "enemy_projectile") {
      return new ColorEnemyProjectile();

    } else if (engine === "marauderMP1") {
      return new ColorMP1();

    } else if (engine === "rainbow") {
      return new ColorRainbow();

    } else {
      console.warn("Color Engine Error: " + engine + " could not be intialized." );
      return new ColorEngine(255,0,0,255);
    }


  }//end create

  /**
   * Create a color from the identifier
   * @param  {string} engine String identifier of color to create
   * @return {ColorEngine}  THe created ColorEngine object (or subclass)
   */
  static create(engine) {

    switch(engine) {

      case "static" :
        return new ColorEngine(255,255,255,255);
        break;

      case "player" :
        return new ColorPlayer();
        break;

      case "player_bullet" :
        return new ColorBullet();
        break;

      case "flash_fade" :
        return new ColorFlashFade();
        break;

      case "flash_fade_firey" :
        return new ColorFlashFadeFirey();
        break;

      case "city" :
        return new ColorCity();
        break;

      case "firey" :
        return new ColorFirey();
        break;

      case "firey_fade" :
        return new ColorFireyFade();
        break;

      case "marauderA1" :
        return new ColorMA1();
        break;

      case "marauderA2" :
        return new ColorMA2();
        break;

      case "enemy_projectile" :
        return new ColorEnemyProjectile();
        break;

      case "marauderMP1" :
        return new ColorMP1();
        break;

      case "rainbow" :
        return new ColorRainbow();
        break;


      default :
        console.warn("Color Engine Error: " + engine + " could not be intialized." );
        return new ColorEngine(255,0,0,255);
        break;


    }//end switch

  }//end create


}//end class ColorFactory
