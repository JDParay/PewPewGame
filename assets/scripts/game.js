let config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 600,
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        LoadingScene,
        MenuScene,
        GameScene,
        UIScene,
        GameOverScene,
        WinScene
    ]
};

let game = new Phaser.Game(config);
