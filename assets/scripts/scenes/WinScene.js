class WinScene extends Phaser.Scene {
    constructor() {
      super('WinScene');
    }
  
    create() {
      this.scene.get('UIScene').resetScore();
      this.bgm = this.sound.add('finish', { loop: false, volume: 0.5 });
      this.bgm.play();
      this.add.image(550, 300, 'win').setDisplaySize(1100, 600);
  
      this.add.text(550, 90, 'you kept your promise.', {
        fontSize: '48px',
        fill: '#fff',
        fontFamily: 'Times New Roman',
        stroke: '#000',
        strokeThickness: 6
      }).setOrigin(0.5);

      const mainMenuButton = this.add.text(530, 550, 'Take a slumber.', {
      fontSize: '30px',
      fill: '#000',
      backgroundColor: '#ffffff',
      padding: { x: 8, y: 8 },
      borderRadius: 8
    }).setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.goToMainMenu());
  
const restartButton = this.add.text(530, 500, 'Save them again.', {
      fontSize: '30px',
      fill: '#0000ff',
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
      restartButton.setStyle({ fill: '#0000ff' }); 
    });
  }

  goToMainMenu() {
    this.scene.stop('WinScene');
    this.bgm.stop();
    this.scene.start('MenuScene');
  }
}
