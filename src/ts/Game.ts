import * as PIXI from 'pixi.js'

import { Player } from './Player'
import { Robot1 } from './Robot1'
import { UI } from './UI'

import playerImage1 from "../img/player_luuk.png"
import playerImage2 from "../img/player_test.png"
import playerImage3 from "../img/player_luuk.png"
import robotImage from "../img/robot.png"
import bgImage from "../img/level.png";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export class Game {
    public app : PIXI.Application;
    private loader : PIXI.Loader;
    
    private levelWidth : number = 1800;
    private levelHeight : number = 900;

    private robot1s : Robot1[] = [];
    private player : Player;
    // robot1 : Robot1
    
    background: PIXI.Sprite;

    private ui : UI;
    constructor() {
        // create a app canvas
        this.app = new PIXI.Application({ backgroundColor: 0x372840, width: this.levelWidth, height: this.levelHeight })
        document.body.appendChild(this.app.view)

        // preload all our textures
        this.loader = new PIXI.Loader()
        this.loader
            .add('playerTexture1', playerImage1)
            .add('playerTexture2', playerImage2)
            .add('playerTexture3', playerImage3)
            .add('robotTexture', robotImage)
            .add("backgroundTexture", bgImage);
        this.loader.load(()=>this.startGame())
    }

    private startGame() {
        console.log("starting the game")

        this.background = new PIXI.Sprite(
            this.loader.resources["backgroundTexture"].texture!
          );
        this.background.scale.x = 0.48
        this.background.scale.y = 0.48
        this.background.x = -640
        this.background.y = 0
        this.app.stage.addChild(this.background);

        for (let i = 0; i < 10; i++) {
            let robot1 = new Robot1(this.loader.resources["robotTexture"].texture!)
            this.app.stage.addChild(robot1)
            robot1.randomLocation()
            this.robot1s.push(robot1)
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

        for (let robot1 of this.robot1s) {
            robot1.update(delta)
        }
    }

}

new Game()