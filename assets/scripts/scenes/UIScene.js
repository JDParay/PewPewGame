class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
    this.score = 0;
  }

  create() {
    this.scoreText = this.add.text(900, 30, `0/25`, {
      fontSize: '30px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setDepth(4);

    this.registry.events.on('scoreUpdated', this.updateScore, this);
  }

  updateScore(newScore) {
    this.score = newScore;
    this.scoreText.setText(`${this.score}/25`);
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText(`0/25`);
  }
}
