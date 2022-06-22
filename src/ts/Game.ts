import * as PIXI from 'pixi.js'

import { Player } from './Player'
import { Robot1 } from './Robot1'
import { UI } from './UI'

import playerImage1 from "../img/player_luuk_sword.png";
import playerImage2 from "../img/player_test.png";
import playerImage3 from "../img/player_luuk.png";
import robotImage from "../img/robot1.png";
import bgImage from "../img/level.png";
import { Background } from './Background';

import damageSound from "url:../audio/impact1.wav";
import hitSound from "url:../audio/Hit_Hurt2.wav";
import swingSound from "url:../audio/Shoot5.wav";
import deathSound from "url:../audio/Explode2.wav";
import winSound from "url:../audio/Random5.wav";
import backgroundSound from "url:../audio/backgroundmusic.mp3";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export class Game {
    public app : PIXI.Application;
    private loader : PIXI.Loader;
    
    public levelWidth : number = 1900;
    public levelHeight : number = 900;

    public frameWidth : number = 1900;
    public framelHeight : number = 900;

    private robot1s : Robot1[] = [];
    private player : Player;
    // robot1 : Robot1
    
    private enemyAmount : number = 10;

    private background : Background;
    private ui : UI;

    public damageSound : HTMLAudioElement;
    public hitSound : HTMLAudioElement;
    public swingSound : HTMLAudioElement;
    public deathSound : HTMLAudioElement;
    public winSound : HTMLAudioElement;

    public backgroundSound : HTMLAudioElement;
    
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
            .add("backgroundTexture", bgImage)
            .add("damageSound", damageSound)
            .add("hitSound", hitSound)
            .add("swingSound", swingSound)
            .add("deathSound", deathSound)
            .add("winSound", winSound)
            .add("backgroundSound", backgroundSound);
        this.loader.load(()=>this.startGame())
    }

    private startGame() {
        console.log("starting the game")

        this.enemyAmount = this.randomInt(5,25)

        this.background = new Background(this.loader.resources["backgroundTexture"].texture!)
        this.app.stage.addChild(this.background);

        for (let i = 0; i < this.enemyAmount; i++) {
            let robot1 = new Robot1(this.loader.resources["robotTexture"].texture!, this)
            this.app.stage.addChild(robot1)
            robot1.randomLocation()
            this.robot1s.push(robot1)
        }

        this.damageSound = this.loader.resources["damageSound"].data!
        this.hitSound = this.loader.resources["hitSound"].data!
        this.swingSound = this.loader.resources["swingSound"].data!
        this.deathSound = this.loader.resources["deathSound"].data!
        this.winSound = this.loader.resources["winSound"].data!
        this.backgroundSound = this.loader.resources["backgroundSound"].data!

        this.player = new Player(this.loader.resources["playerTexture1"].texture!, 
        this.loader.resources["playerTexture2"].texture!, 
        this.loader.resources["playerTexture3"].texture!, 
        1, this, this.levelWidth, this.levelHeight)
        this.app.stage.addChild(this.player);

        this.ui = new UI(this)

        this.backgroundSound.play();
        this.backgroundSound.volume = 0.4

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
                    this.ui.addKillXP();
                    this.damageSound.play();
                } else {
                    robot1.randomLocation();
                    this.ui.substractHalfBar();
                    this.hitSound.play();
                }
                
            }
        }

        if (this.robot1s.length == 0) {
            this.ui.showWin();
        }
    }

    gameOver(){
        console.log("GAMEOVER")
        this.app.stop()
        this.ui.showGameOver()
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

    randomInt(min : number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

}

new Game()