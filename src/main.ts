import { Game } from 'phaser'
import { FontPlugin } from 'phaser-font-plugin'
import { Boot, Menu, Preloader } from '@/scenes'

export default new Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#4dc0ca',
  scene: [
    Boot,
    Preloader,
    Menu,
  ],
  plugins: {
    global: [
      {
        key: 'FontLoaderPlugin',
        plugin: FontPlugin,
        start: true,
      },
    ],
  },
})
