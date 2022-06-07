import * as PIXI from 'pixi.js'

import { Game } from "./Game"

export class Robot1 extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 0
        this.y = 0
        this.scale.x = 4
        this.scale.y = 4
    }

    public randomLocation() { 
        this.x = Math.random()*1000
        this.y = Math.random()*500
    }

    public update(delta : number) {
        if (this.x < 0) {
            this.x = 1800
        }
        this.x -= 0.5 * delta
    }
}