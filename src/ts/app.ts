import * as PIXI from 'pixi.js'

import playerImage from "../img/player_luuk.png"
import robotImage from "../img/robot.png"

export class Game {
    public app : PIXI.Application
    loader : PIXI.Loader

    robots : PIXI.Sprite[] = []
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
            .add('robotTexture', robotImage)
        this.loader.load(()=>this.startGame())
    }

    public startGame() {
        console.log("starting the game")

        this.xp = 1
        this.showXP()

        for (let i = 0; i < 10; i++) {
            let robot = new PIXI.Sprite(this.loader.resources["robotTexture"].texture!)
            this.app.stage.addChild(robot)
            robot.x = Math.random()*1000
            robot.y = Math.random()*500
            robot.scale.x = 0.5
            robot.scale.y = 0.5
            this.robots.push(robot)
        }

        this.player = new PIXI.Sprite(this.loader.resources["playerTexture"].texture!)
        this.player.x = 200
        this.player.y = 200
        this.app.stage.addChild(this.player);

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x524a63)
        this.graphics.drawRect(40, 20, 500, 60)
        this.graphics.endFill()
        this.app.stage.addChild(this.graphics)
        
        this.textStyle = new PIXI.TextStyle({
            fontSize: 32,
            fill: '#dfeded'
        })
        this.basicText = new PIXI.Text(`XP: 0 Sleepbar: 10/10`, this.textStyle)
        this.basicText.x = 50
        this.basicText.y = 30
        this.app.stage.addChild(this.basicText);


        this.app.ticker.add((delta) => this.update(delta))
    }
    private update(delta : number) {
        this.player.x += 0.5 * delta
    }

    showXP() {
        console.log(this.xp)
    }
}

new Game()