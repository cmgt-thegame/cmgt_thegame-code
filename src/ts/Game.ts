import * as PIXI from 'pixi.js'

import { Player } from './Player'
import { Robot1 } from './Robot1'
import { UI } from './UI'

import playerImage1 from "../img/player_luuk_sword.png"
import playerImage2 from "../img/player_test.png"
import playerImage3 from "../img/player_luuk.png"
import robotImage from "../img/robot1.png"
import bgImage from "../img/level.png";
import { Background } from './Background'

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export class Game {
    public app : PIXI.Application;
    private loader : PIXI.Loader;
    
    private levelWidth : number = 1900;
    private levelHeight : number = 900;

    public frameWidth : number = 1500;
    public framelHeight : number = 900;

    private robot1s : Robot1[] = [];
    private player : Player;
    // robot1 : Robot1
    
    private background: Background;

    private ui : UI;
    constructor() {
        // create a app canvas
        this.app = new PIXI.Application({ backgroundColor: 0x372840, width: this.frameWidth, height: this.framelHeight })
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

        this.background = new Background(this.loader.resources["backgroundTexture"].texture!)
        this.app.stage.addChild(this.background);

        for (let i = 0; i < 15; i++) {
            let robot1 = new Robot1(this.loader.resources["robotTexture"].texture!)
            this.app.stage.addChild(robot1)
            robot1.randomLocation()
            this.robot1s.push(robot1)
        }


        this.player = new Player(this.loader.resources["playerTexture1"].texture!, 
        this.loader.resources["playerTexture2"].texture!, 
        this.loader.resources["playerTexture3"].texture!, 
        1, this, this.levelWidth, this.levelHeight)
        this.app.stage.addChild(this.player);

        this.ui = new UI(this)

        this.app.ticker.add((delta) => this.update(delta))
    }

    private update(delta : number) {
        this.player.update()
        this.ui.update()

        for (let robot1 of this.robot1s) {
            robot1.update(delta)

            if (this.collision(robot1, this.player)) {
                if(this.player.isAttacking) {
                    this.robot1s = this.robot1s.filter(r => r != robot1)
                    robot1.destroy();
                } else {
                    robot1.randomLocation();
                }
                
            }
        }
    }

    collision(sprite1 : PIXI.Sprite, sprite2 : PIXI.Sprite) {
        const bounds1 = sprite1.getBounds();
        const bounds2 = sprite2.getBounds();

        return (
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y
        );
    }

}

new Game()