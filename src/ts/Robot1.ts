import * as PIXI from 'pixi.js'

import { Game } from "./Game"

export class Robot1 extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 0
        this.y = 0
        this.scale.x = 5
        this.scale.y = 5
    }

    randomLocation() { 
        this.x = Math.random()*1000
        this.y = Math.random()*500
    }

    update(delta : number) {
        if (this.x < 0) {
            this.x = 1800
        }
        this.x -= 0.5 * delta
    }
}