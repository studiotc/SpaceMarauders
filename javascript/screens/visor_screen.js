

/**
 * Visor displays all the character stats (health, score)
 * and other stats like city health
 */
class Visor  extends BaseGameScreen {

constructor(defender, stats) {
  super();

  this.defender = defender;

  //unit size of text character
  let char_unit_size = TextArray.TextCharUnitSize();

  let settings = Game.Settings();

  //text location - offset from upper left corner
  let xy = settings.UnitSize * 2;
  this.score_location = new Point2d(xy,xy);
  let hpx = settings.UnitSize * (settings.UnitWidth - 14);
  this.hp_location = new Point2d(hpx,xy);

  //game score
  this.stats = stats;
  this.current_score = 0;

  this.last_score = 0;

  this.text_score = new TextArray(this.current_score.toString(), this.score_location, "player");

  this.current_hp = this.defender.getHitPoints();
  this.last_hp = this.current_hp;

  this.text_hp = new TextArray(this.current_hp.toString(), this.hp_location, "player");


}

/**
 * Update the score text
 * @return {undefined} No Return
 */
updateScoreText() {

  this.current_score = this.stats.getTotalScore();
  //update only if needed - avoid doing it every call = premature optimization!
  if (this.current_score !== this.last_score) {
      this.text_score = new TextArray(this.current_score.toString(), this.score_location, "player");
      this.last_score = this.current_score;
  }

  this.current_hp = this.defender.getHitPoints();
  if (this.current_hp !== this.last_hp) {
    this.text_hp = new TextArray(this.current_hp.toString(), this.hp_location, "player");
    this.last_hp = this.current_hp ;
  }



}

/**
 * This shouldn't ever be called, but override anyways...
 * There is no lifespan for the screen - it's an overlay
 * @return {Boolean} True if screen is ifnished, false to keep displaying
 */
isFinished() {
    return false;
}


/**
 * Draw the visor
 * @param  {object} g Canvas graphics context to draw to
 * @return {undefined} No return
 */
draw(g) {

  this.text_score.draw(g);
  this.text_hp.draw(g);

}


}//end class
