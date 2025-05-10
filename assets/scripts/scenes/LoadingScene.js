class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        this.load.image("player", "../assets/images/PlayerDragon.png");
        this.load.image("fireball", "../assets/images/fireball.png");
        this.load.image("badfireball", "../assets/images/BadFireball.png");
        this.load.image("background", "../assets/images/BG.png");
        this.load.image("GreenD", "../assets/images/GreenD.png");
        this.load.image("CyanD", "../assets/images/CyanD.png");
        this.load.image("SkyD", "../assets/images/SkyD.png");
        this.load.image("boss", "../assets/images/ThreeHeaded.png");
        this.load.image("menu", "../assets/images/MenuBG.jpeg");
        this.load.image("win", "../assets/images/WinBG.jpg");
        this.load.image("lose", "../assets/images/LoseBG.png");

        this.load.audio("bgm", "../assets/audio/MenuBG.mp3");
        this.load.audio("loseBG", "../assets/audio/loseBG.mp3");
        this.load.audio("gamebg", "../assets/audio/GameBG.mp3");
        this.load.audio("shoot", "../assets/audio/fireball.mp3");
        this.load.audio("impact", "../assets/audio/hit.mp3");
        this.load.audio("finish", "../assets/audio/WinBG.mp3");
    }

    create() {
        this.scene.start('MenuScene');
    }
}
