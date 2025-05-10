class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    this.scene.get('UIScene').resetScore();
    this.bgm = this.sound.add('loseBG', { loop: true, volume: 0.5 });
    this.bgm.play();
    
    this.add.image(555, 300, 'lose').setScale(1);

    const title = this.add.text(550, 100, 'The promised in anguish.', {fontSize: '48px', fontStyle: 'bold', fill: '#fff'}).setOrigin(0.5);

    const mainMenuButton = this.add.text(530, 550, 'Leave them behind.', {
      fontSize: '30px',
      fill: '#fff',
      backgroundColor: '#ff0000',
      padding: { x: 8, y: 8 },
      borderRadius: 8
    }).setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.goToMainMenu());

    const restartButton = this.add.text(530, 500, 'Do it again.', {
      fontSize: '30px',
      fill: '#ff0000',
      backgroundColor: '#000',
      padding: { x: 8, y: 8 }
    }).setOrigin(0.5);

    restartButton.setInteractive();

      restartButton.on('pointerdown', () => {
      this.scene.get('UIScene').resetScore();
      this.bgm.stop();
      this.scene.start('GameScene');
      });

      restartButton.on('pointerover', () => {
      restartButton.setStyle({ fill: '#00ff00' });
    });

    restartButton.on('pointerout', () => {
      restartButton.setStyle({ fill: '#ff0000' }); 
    });
  }

  goToMainMenu() {
    this.scene.stop('GameOverScene');
    this.bgm.stop();
    this.scene.start('MenuScene');
  }
}
