import * as PIXI from 'pixi.js'

export class Player extends PIXI.Sprite {

    constructor(texture : PIXI.Texture) {
        super(texture)
        this.x = 200
        this.y = 200
        this.scale.x = 0.5
        this.scale.y = 0.5
    }

    update(delta : number) {
        console.log("player update")
        this.x += 0.5 * delta
    }
}