import * as PIXI from 'pixi.js'

import { Game } from './Game'

export class UI {

    private game : Game;

    private xp : number;
    private hp : number;

    private hiscore : number = 0;

    private graphics : PIXI.Graphics;
    private textStyle : PIXI.TextStyle;
    private basicText : PIXI.Text;

    private messageField: PIXI.Text
    private graphics2 : PIXI.Graphics;

    private centerx : number;
    private centery : number;

    constructor(game: Game) {
        this.game = game

        this.centerx = game.app.screen.width/2;
        this.centery = game.app.screen.height/2;

        this.xp = 0
        this.hp = 6

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x524a63)
        this.graphics.drawRect(40, 20, 500, 60)
        this.graphics.endFill()
        this.game.app.stage.addChild(this.graphics)

        this.textStyle = new PIXI.TextStyle({
            fontSize: 32,
            fill: '#dfeded'
        })
        this.basicText = new PIXI.Text(`XP: ${this.xp} Energy: XX-`, this.textStyle)
        this.basicText.x = 50
        this.basicText.y = 30
        this.game.app.stage.addChild(this.basicText);

        const gameOverStyle = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 70,
            align:"center", 
            fontWeight: 'bold',
            fill: ['#372840'],
            wordWrap: true,
            wordWrapWidth: 420
        })

        this.messageField = new PIXI.Text('', gameOverStyle)
        this.messageField.x = this.centerx - 200
        this.messageField.y = this.centery - 200



        // this.gameOverListener = (e:Event) => this.restartGame(e)
    } 

    substractHalfBar() {
        if(this.hp > 0) {
            this.hp -= 1
        }
    }

    addKillXP() {
        this.xp += 100
    }

    public showGameOver(){
        this.game.deathSound.play();
        this.graphics2 = new PIXI.Graphics()
        this.graphics2.beginFill(0xdfeded)
        this.graphics2.drawRect(600, 200, 675, 375)
        this.graphics2.endFill()
        this.game.app.stage.addChild(this.graphics2)

        if (this.xp >= this.hiscore) { this.hiscore = this.xp }

        this.game.app.stage.addChild(this.messageField)
        // this.messageField.text =  "GAME OVER press to restart"
        this.messageField.text =  `GAME OVER High Score : ${this.hiscore} XP`
        // window.addEventListener("keydown", this.gameOverListener)
    }

    // private restartGame(e:Event){
    //     window.removeEventListener("keydown", this.gameOverListener)
    //     this.game.restart()
    // }
    
    public showWin(){
        this.game.winSound.play();
        this.graphics2 = new PIXI.Graphics()
        this.graphics2.beginFill(0xdfeded)
        this.graphics2.drawRect(600, 200, 675, 375)
        this.graphics2.endFill()
        this.game.app.stage.addChild(this.graphics2)

        if (this.xp >= this.hiscore) { this.hiscore = this.xp }

        this.game.app.stage.addChild(this.messageField)
        // this.messageField.text =  "GAME OVER press to restart"
        this.messageField.text =  `YOU WON!! High Score : ${this.hiscore} XP`
    }

    public update() {
        this.basicText.text = `Energypoints: ${this.hp} | XP: ${this.xp}`

        if (this.hp == 0) {
            this.game.gameOver();
        }
    }
}