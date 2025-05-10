class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.player = null;
    this.projectiles = null;
    this.obstacles = null;
    this.enemyProjectiles = null;
    this.cursors = null;
    this.shootKey = null;
    this.lastFired = 0;
    this.spawnTimer = 0;
    this.survivalTime = 0;
    this.score = 0;
    this.scoreText = null;
  }

  create() {
    this.survivalTime = 0;
    this.background = this.add.tileSprite(550, 300, 1100, 600, "background");
    this.player = this.physics.add.sprite(550, 600, 'player').setCollideWorldBounds(true).setScale(0.8);
    this.player.setSize(200, 90); 
    this.player.setOffset(80, 70);

    this.projectiles = this.physics.add.group();
    this.obstacles = this.physics.add.group();
    this.enemyProjectiles = this.physics.add.group();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.boostKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.boostKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.SecretKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    this.bgm = this.sound.add('gamebg', { loop: true, volume: 0.5 });
    this.bgm.play();

    this.score = 0;
    this.scene.launch('UIScene');
    this.registry.events.emit('scoreUpdated', this.score);

    this.player.setDepth(2);
    this.projectiles.setDepth(1);

    this.physics.add.overlap(this.projectiles, this.obstacles, this.handleCollision, null, this);
    this.physics.add.overlap(this.player, this.enemyProjectiles, this.playerHit, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.handlePlayerObstacleCollision, null, this);
    this.physics.add.overlap(this.projectiles, this.enemyProjectiles, this.nullifyProjectiles, null, this);
  }

  update(time, delta) {
    this.background.tilePositionY -= 1;
    this.handlePlayerMovement();
    this.handleShooting(time);
    this.spawnObstacles(delta, time);
    this.survivalTime += delta;
    this.registry.events.emit('timeUpdated', this.survivalTime / 1000);
    this.quickFinish();
  }

  shutdown() {
    if (this.scoreText) {
      this.scoreText.destroy();
    }
  }

  quickFinish() {
    if (this.SecretKey.isDown) {
      this.scene.stop('GameScene');
      this.bgm.stop();
      this.scene.start('WinScene');
    }
  }
  handlePlayerMovement() {
  let velocity = 300;
  if (this.boostKey1.isDown | this.boostKey2.isDown) {
    velocity += 300;
  }

  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-velocity);
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(velocity);
  } else {
    this.player.setVelocityX(0);
  }
}

  handleShooting(time) {
    if (this.shootKey.isDown && time > this.lastFired + 300) {
      const projectile = this.projectiles.create(this.player.x, this.player.y - 30, 'fireball');
      projectile.setScale(0.3);
      projectile.setSize(110, 70);
      projectile.setOffset(145, 100);
      projectile.setVelocityY(-200);
      this.sound.play('shoot');
      this.lastFired = time;
    }
  }

spawnObstacles(delta, time) {
  this.spawnTimer += delta;

  if (this.spawnTimer > 2000) {
    const x = Phaser.Math.Between(50, 1050);
    const y = -50;
    const types = ['Green', 'Cyan', 'Sky'];
    const type = Phaser.Utils.Array.GetRandom(types);
    const obstacle = this.obstacles.create(x, y, `${type}D`);
    obstacle.setDepth(3);
    obstacle.setScale(0.6);
    obstacle.setSize(280, 60);
    obstacle.setOffset(50, 200);
    obstacle.setOrigin(0.5, 0.5);
    obstacle.setData('type', type);
    obstacle.setVelocityY(120);
    obstacle.setData('direction', 1);
    obstacle.setData('baseY', y);
    obstacle.setData('fireCooldown', 0);
    this.spawnTimer = 0;
  }

  this.obstacles.getChildren().forEach((obs) => {
    obs.y += Math.sin(this.time.now / 200) * 0.5 * obs.getData('direction');

    const type = obs.getData('type');
    const cooldown = obs.getData('fireCooldown');

    if (cooldown <= 0) {
      if (type === 'Cyan') {
        const bullet1 = this.enemyProjectiles.create(obs.x, obs.y, 'badfireball');
        bullet1.setSize(200, 100);
        bullet1.setOffset(150, 400);
        bullet1.setDepth(1);
        bullet1.setScale(0.2);
        bullet1.setVelocityY(250);
        bullet1.setData('type', 'badfireball');
        obs.setData('fireCooldown', 2500);

      } else if (type === 'Sky') {
        const bullet1 = this.enemyProjectiles.create(obs.x , obs.y, 'badfireball');
        bullet1.setSize(200, 100);
        bullet1.setOffset(150, 400);
        bullet1.setDepth(1);
        bullet1.setScale(0.2);
        bullet1.setVelocityY(300);
        bullet1.setData('type', 'badfireball');

        this.time.delayedCall(500, () => {
          const bullet2 = this.enemyProjectiles.create(obs.x, obs.y, 'badfireball');
          bullet2.setSize(200, 100);
          bullet2.setOffset(150, 400);
          bullet2.setDepth(1);
          bullet2.setScale(0.2);
          bullet2.setVelocityY(250);
          bullet2.setData('type', 'badfireball');
        }, null, this);

        obs.setData('fireCooldown', 1800);
      }
    } else {
      obs.setData('fireCooldown', cooldown - delta);
    }

    if (obs.y > this.scale.height) {
      obs.destroy();
    }
  });

  this.enemyProjectiles.getChildren().forEach((bullet) => {
    if (bullet.y > this.scale.height) {
      bullet.destroy();
    }
  });
}


  handleCollision(projectile, obstacle) {
    const type = obstacle.getData('type');
    projectile.destroy();
    obstacle.destroy();
    this.sound.play('impact');

    if (type === 'Green') this.score += 1;
    else if (type === 'Cyan') this.score += 2;
    else if (type === 'Sky') this.score += 3;

    this.registry.events.emit('scoreUpdated', this.score);

    if (this.score >= 25) {
      this.bgm.stop();
      this.scene.start('WinScene');
    }
  }

  handlePlayerObstacleCollision(player, obstacle) {
    const type = obstacle.getData('type');
    if (type === 'badfireball') {
      this.sound.play('impact');
      obstacle.destroy();
      this.bgm.stop();
      this.scene.stop('GameScene');
      this.scene.start('GameOverScene');
    }
  }

  nullifyProjectiles(playerProjectile, enemyProjectile) {
    playerProjectile.destroy();
    enemyProjectile.destroy();
    this.sound.play('impact');
  }

  playerHit(player, bullet) {
    const type = bullet.getData('type');
    if (type === 'badfireball') {
      this.sound.play('impact');
      bullet.destroy();
      this.bgm.stop();
      this.scene.stop('GameScene');
      this.scene.start('GameOverScene');
    }
  }
} 
