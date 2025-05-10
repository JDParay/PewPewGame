class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
  
    create() {
        this.bgm = this.sound.add('bgm', { loop: true, volume: 0.5 });
        this.bgm.play();

        this.add.image(0, 0, "menu").setOrigin(0, 0).setScale(1, 1);

        this.add.text(800, 140, 'PROTECTOR\n\t\t\t\tOF SKIES', { font: '75px Times New Roman', fontStyle: 'bold', fill: '#ffffff' }).setOrigin(0.5);
  
        const playBtn = this.add.text(200, 350, 'Start', { font: '32px Times New Roman', fontStyle: 'bold', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        const quitBtn = this.add.text(200, 400, 'Quit', { font: '32px Times New Roman', fontStyle: 'bold', fill: '#8B0000' }).setOrigin(0.5).setInteractive();

        playBtn.on('pointerdown', () => this.startGame());
        quitBtn.on('pointerdown', () => alert("You exited the game."));

        const instructions = this.add.text(670, 490, 
            'Use LEFT/RIGHT ARROWS to move\nSPACE to shoot dragons/fireballs\nand SHIFT to boost your speed.\n\nDEFEND your kingdom!\n\none life only, give it a worthy ending.', 
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
    }

    startGame() {
      this.bgm.stop();
      this.scene.start('GameScene');
    }
}
  