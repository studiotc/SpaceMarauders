


class StatTracker {


  constructor() {

    this.total_score = 0;

    this.wave_e_killed = 0;
    this.wave_e_hit_points = 0;
    this.wave_p_killed = 0;
    this.wave_p_hit_points = 0;

    //points for projectiles and enemies
    this.proj_hp_value = 25;
    this.enemy_hp_value = 100;

    //points for good health
    this.city_health_bonus = 100;
    this.player_health_bonus = 50;

  }

  reset() {

    this.wave_e_killed = 0;
    this.wave_e_hit_points = 0;
    this.wave_p_killed = 0;
    this.wave_p_hit_points = 0;

  }

  getTotalScore() {
    return this.total_score;
  }



  flagKill(character) {

    this.wave_e_killed += 1;

    this.total_score += this.enemy_hp_value;
    //this.wave_e_hit_points += character.hitPOints();

  }

  flagShot(projectile) {

    this.wave_p_killed += 1;
    this.total_score += this.proj_hp_value;
    //this.wave_p_hit_points += projectile.hitPoints()

  }

  /**
   * Update the score with player hp bonus
   * @param  {[type]} playerHP [description]
   * @return {number} Number of points
   */
  updatePlayerBonus(playerHP) {

    let playerBonus = playerHP * this.player_health_bonus;
    this.total_score += playerBonus;
    return playerBonus;
  }

/**
 * Update the city bonus at the end of a wave
 * @param  {number} wave  Current wave number
 * @param  {number} cityHP [description]
 * @return {number} Bonus score for city
 */
  updateCityBonus(wave, cityHP) {

    let cityBonus = cityHP * this.city_health_bonus;

    if(cityBonus === 0) {
      cityBonus = wave  * this.city_health_bonus;
    }

    this.total_score += cityBonus;
    return cityBonus;

  }

/**
 * Talley up the score based on hit points taken
 * not used....
 */
  waveEnd() {

    let p_hp_value  = 25;
    let e_hp_value = 100;

    // let t_pp = wave_p_hit_points * p_hp_value;
    // let t_ep = wave_e_hit_points * e_hp_value;

    let t_pp = wave_p_killed * p_hp_value;
    let t_ep = wave_e_killed * e_hp_value;

    this.total_score += t_pp + t_ep;

  }



}//end class
