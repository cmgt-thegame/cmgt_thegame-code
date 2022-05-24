import * as PIXI from 'pixi.js'

import { Game } from './Game'

export class UI {

    private game : Game

    xp : number

    graphics : PIXI.Graphics
    textStyle : PIXI.TextStyle
    basicText : PIXI.Text

    constructor(game: Game) {
        this.game = game

        this.xp = 2

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x524a63)
        this.graphics.drawRect(40, 20, 500, 60)
        this.graphics.endFill()
        this.game.app.stage.addChild(this.graphics)

        this.textStyle = new PIXI.TextStyle({
            fontSize: 32,
            fill: '#dfeded'
        })
        this.basicText = new PIXI.Text(`XP: ${this.xp} Sleepbar: 10/10`, this.textStyle)
        this.basicText.x = 50
        this.basicText.y = 30
        this.game.app.stage.addChild(this.basicText);
    } 

    public update() {
        this.basicText.text = `XP: ${this.xp} Sleepbar: 10/10`
        this.xp += 1
    }
}