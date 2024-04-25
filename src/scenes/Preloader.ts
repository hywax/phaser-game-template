import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super({ key: 'Preloader' })
  }

  init() {
    const { width, height } = this.cameras.main

    const backLogo = this.add
      .image(width / 2, height / 2, 'logo')
      .setAlpha(0.2)

    const frontLogo = this.add
      .image(width / 2, height / 2, 'logo')
      .setCrop(0, 0, 0, 0)

    this.load.on('progress', (value: number) => {
      frontLogo.setCrop(0, 0, value * frontLogo.width, frontLogo.height)

      if (value >= 1) {
        backLogo.destroy()
      }
    })
  }

  preload() {
    this.load.font('pixeloid', 'assets/fonts/pixeloid.woff2')
    this.load.font('pixeloid-bold', 'assets/fonts/pixeloid-bold.woff2')

    // Insert here a list of resources to be preloaded ...
  }

  create() {
    this.scene.start('Menu')
  }
}
