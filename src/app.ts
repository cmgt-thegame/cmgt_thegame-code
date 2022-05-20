import * as PIXI from 'pixi.js'

import playerImage from "./img/player_luuk.png"

export class Game {
    app : PIXI.Application
    loader : PIXI.Loader

    xp : number
    player : PIXI.Sprite
    basicText : PIXI.Text
    graphics : PIXI.Graphics
    textStyle : PIXI.TextStyle
    constructor() {
        // create a app canvas
        this.app = new PIXI.Application({ backgroundColor: 0x372840, width: 1440, height: 900 })
        document.body.appendChild(this.app.view)

        // preload all our textures
        this.loader = new PIXI.Loader()
        this.loader
            .add('playerTexture', playerImage)
        this.loader.load(()=>this.loadCompleted())
    }

    loadCompleted() {
        console.log("all textures loaded")

        this.startGame()
        this.app.ticker.add((delta) => this.update(delta))
    }
    startGame() {
        console.log("starting the game")

        this.xp = 1
        this.showXP()

        this.player = new PIXI.Sprite(this.loader.resources["playerTexture"].texture!)
        this.player.x = 200
        this.player.y = 200

        this.textStyle = new PIXI.TextStyle({
            fontSize: 32,
            fill: '#dfeded'
        })
        this.basicText = new PIXI.Text(`XP: 0 Sleepbar: 10/10`, this.textStyle)
        this.basicText.x = 50
        this.basicText.y = 30

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x524a63)
        this.graphics.drawRect(40, 20, 500, 60)
        this.graphics.endFill()
        
        this.app.stage.addChild(this.graphics)

        this.app.stage.addChild(this.basicText);
        this.app.stage.addChild(this.player);

    }
    update(delta : number) {
        console.log(`Dit is de Game Loop!`)
        this.player.x += 0.5 * delta
    }

    showXP() {
        console.log(this.xp)
    }

    
}

new Game()