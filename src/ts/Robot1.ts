import * as PIXI from 'pixi.js'

import { Game } from "./Game"

export class Robot1 extends PIXI.Sprite {

    private game : Game;

    private timerLeft : number = 0;
    private timerRight : number = 0;
    private upperTimer : number;
    private lowerTimer : number;

    private xspeed : number = 0.5;
    private yspeed : number = 0;

    constructor(texture: PIXI.Texture, game : Game) {
        super(texture)
        this.game = game;


        this.x = 0
        this.y = 0
        this.scale.set(-4, 4)

        this.lowerTimer = this.randomInt(20, 50)*30
        this.upperTimer = this.randomInt(10, 25)*30

        console.log(this.lowerTimer, this.upperTimer)
    }

    public randomLocation() { 
        this.x = this.randomInt(0 + 800,this.game.levelWidth - this.getBounds().x - 100)
        this.y = this.randomInt(0 + 150,this.game.levelHeight - this.getBounds().y - 300)
    }

    public update(delta : number) {

        this.x = this.clamp(this.x + this.xspeed, 0 + 100, this.game.levelWidth - 150)
        this.y = this.clamp(this.y + this.yspeed, 0 + 150, this.game.levelHeight - 300)

        this.timerLeft++
        this.timerRight++

        // console.log(this.timerLeft, this.upperTimer)

        if(this.timerLeft > this.lowerTimer) {
            console.log("TIMER")
            this.xspeed = 0.5
            this.timerLeft = 0
            this.x =- this.getBounds().x
            this.scale.set(-4, 4)
        }
        
        if(this.timerRight > this.upperTimer) {
            this.xspeed = -0.5
            this.timerRight = 0
            this.x =+ this.getBounds().x
            this.scale.set(4, 4)
        }
        
    }

    randomInt(min : number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }
}