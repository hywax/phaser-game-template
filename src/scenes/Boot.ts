import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    this.load.image('logo', 'assets/img/logo.png')
  }

  create() {
    this.scene.start('Preloader')
  }
}
