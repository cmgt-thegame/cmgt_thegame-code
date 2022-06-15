import * as PIXI from 'pixi.js'

import { Game } from "./Game"



export class Player extends PIXI.Sprite {

    // private game : Game

    private xspeed : number = -1
    private yspeed : number

    constructor(texture1 : PIXI.Texture, texture2 : PIXI.Texture, texture3 : PIXI.Texture, character : number) {
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

        console.log("test 3");


        // this.game = game
        // this.x = game.app.screen.width/2
        // this.y = game.app.screen.height/2
        this.x = 100
        this.y = 100
        this.scale.x = 0.4
        this.scale.y = 0.4

        // window.addEventListener("keydown", (e : KeyboardEvent) => this.onKeyDown(e));
        // window.addEventListener("keyup", (e :  KeyboardEvent) => this.onKeyUp(e));
    }

    public update() {
        // if (this.x > 1800) {
        //     this.x = 0
        // }
        // if (this.x < 0) {
        //     this.x = 1800
        // }
        this.x += this.xspeed
        
    }

    // onKeyDown(e: KeyboardEvent): void {
    //     switch (e.key.toUpperCase()) {
    //         case "A":
    //         case "ARROWLEFT":
    //             this.xspeed = -7
    //             this.scale.set
    //             break
    //     }
    // }

    // onKeyUp(e: KeyboardEvent): void {
    //     switch (e.key.toUpperCase()) {
    //         case "":
    //             break;
    //         case "A":
    //         case "ARROWLEFT":
    //             this.xspeed = 0
    //             break
    //     }
    // }
}