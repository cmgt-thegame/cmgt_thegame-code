import * as PIXI from 'pixi.js'

import { Game } from "./Game"

export class Player extends PIXI.Sprite {

    // private game : Game

    constructor(texture1 : PIXI.Texture, texture2 : PIXI.Texture, texture3 : PIXI.Texture, character : number) {
        switch (character) {
            case 1:
                super(texture1)
                break;
            case 2:
                super(texture2)
                break;
            case 3:
                super(texture3)
                break;
        }

        // this.game = game
        this.x = 200
        this.y = 200
        this.scale.x = 0.4
        this.scale.y = 0.4
    }

    public update(delta : number) {
        if (this.x > 1800) {
            this.x = 0
        }
        this.x += 0.5 * delta
    }
}