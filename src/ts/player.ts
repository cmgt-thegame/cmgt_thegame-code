import * as PIXI from 'pixi.js'

import { Game } from "./Game"



export class Player extends PIXI.Sprite {

    private game : Game;

    private speedMult : number = 2.5;

    private xspeed : number = 0;
    private yspeed : number = 0;
    private levelWidth : number;
    private levelHeight : number;

    private centerx : number;
    private centery : number;

    public isAttacking : boolean = false;

    constructor(texture1 : PIXI.Texture, texture2 : PIXI.Texture, texture3 : PIXI.Texture, character : number, game : Game, levelWidth : number, levelHeight : number) {
        super(texture1);
        // switch (character) {
        //     case 1:
        //         super(texture1)
        //         break;
        //     case 2:
        //         super(texture2)
        //         break;
        //     case 3:
        //         super(texture3)
        //         break;
        // }

        this.game = game;
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
        this.centerx = game.app.screen.width/2;
        this.centery = game.app.screen.height/2;
        // this.centerx = 400
        // this.centery = 400

        this.anchor.set(0.5)

        this.x = this.centerx 
        this.y = this.centery

        this.scale.set(4, 4)

        window.addEventListener("keydown", (e : KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e :  KeyboardEvent) => this.onKeyUp(e));
    }

    public update() {


        this.x = this.clamp(this.x + this.xspeed, 0, this.levelWidth)
        this.y = this.clamp(this.y + this.yspeed, 0, this.levelHeight)

        // let mapx = this.clamp(this.x, this.centerx, this.levelWidth - this.centerx)
        // let mapy = this.clamp(this.y, this.centery, this.levelHeight - this.centery)
        // let mapx = this.clamp(this.x, this.centerx, this.levelWidth - 400)
        // let mapy = this.clamp(this.y, this.centery, this.levelHeight - 400)
        // this.game.app.stage.pivot.set(mapx, mapy)     

        // console.log(this.x, this.y);
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -1*this.speedMult
                this.scale.set(-4, 4)
                break;
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 1*this.speedMult
                this.scale.set(4, 4)
                break;
            case "W":
            case "ARROWUP":
                this.yspeed = -1*this.speedMult
                break;
            case "S":
            case "ARROWDOWN":
                this.yspeed = 1*this.speedMult
                break;
            case " ":
            case "J":
                this.isAttacking = true
                break;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break;
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break;
            case " E":
            case "J":
                this.isAttacking = false
                break;
        }
    }
}