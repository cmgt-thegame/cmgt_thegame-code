import * as PIXI from 'pixi.js'

import { Player } from './Player'

import playerImage1 from "../img/player_luuk.png"
import playerImage2 from "../img/player_test.png"
import playerImage3 from "../img/player_luuk.png"
import robotImage from "../img/robot.png"
import { UI } from './UI'

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export class Game {
    public app : PIXI.Application
    loader : PIXI.Loader
    

    robots : PIXI.Sprite[] = []
    player : Player
    
    ui : UI
    constructor() {
        // create a app canvas
        this.app = new PIXI.Application({ backgroundColor: 0x372840, width: 1800, height: 900 })
        document.body.appendChild(this.app.view)

        // preload all our textures
        this.loader = new PIXI.Loader()
        this.loader
            .add('playerTexture1', playerImage1)
            .add('playerTexture2', playerImage2)
            .add('playerTexture3', playerImage3)
            .add('robotTexture', robotImage)
        this.loader.load(()=>this.startGame())
    }

    public startGame() {
        console.log("starting the game")

        for (let i = 0; i < 10; i++) {
            let robot = new PIXI.Sprite(this.loader.resources["robotTexture"].texture!)
            this.app.stage.addChild(robot)
            robot.x = Math.random()*1000
            robot.y = Math.random()*500
            robot.scale.x = 5
            robot.scale.y = 5
            this.robots.push(robot)
        }

        this.player = new Player(this.loader.resources["playerTexture1"].texture!, 
        this.loader.resources["playerTexture2"].texture!, 
        this.loader.resources["playerTexture3"].texture!, 1)
        this.app.stage.addChild(this.player);

        this.ui = new UI(this)

        this.app.ticker.add((delta) => this.update(delta))
    }

    private update(delta : number) {
        this.player.update(delta)
        this.ui.update()
    }

}

new Game()