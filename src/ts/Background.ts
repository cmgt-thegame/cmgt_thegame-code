import * as PIXI from "pixi.js"

export class Background extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)

        this.scale.x = 0.48
        this.scale.y = 0.48
        this.x = -640
        this.y = 0
    }


}