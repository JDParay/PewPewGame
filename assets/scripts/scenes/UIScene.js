class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
    this.score = 0;
  }

  create() {

    this.scoreText = this.add.text(20, 20, 'Score: 0', {
    fontSize: '24px',
    fill: '#fff',
  });

  this.timeText = this.add.text(20, 50, 'Time: 0.0s', {
    fontSize: '24px',
    fill: '#fff',
  });

  this.registry.events.on('scoreUpdated', this.updateScore, this);
  this.registry.events.on('timeUpdated', this.updateTime, this);
  }

  updateScore(newScore) {
    this.score = newScore;
    this.scoreText.setText(`${this.score}/25`);
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText(`0/25`);
  }

  updateTime(timeInSeconds) {
  this.timeText.setText(`Time: ${timeInSeconds.toFixed(1)}s`);
}

}
