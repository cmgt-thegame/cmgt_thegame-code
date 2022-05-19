import * as PIXI from 'pixi.js'

import playerImage from "./img/player_luuk.png"


// create a app canvas
const app = new PIXI.Application({ backgroundColor: 0x372840, width: 1440, height: 900 })
document.body.appendChild(app.view)

// preload all our textures
const loader = new PIXI.Loader()
loader.add('playerTexture', playerImage)
loader.load(()=>loadCompleted())

// after loading is complete, create a fish sprite

let player : PIXI.sprite

const textStyle = new PIXI.TextStyle({
    fontSize: 32,
    fill: '#dfeded'
})

function loadCompleted() {
    player = new PIXI.Sprite(loader.resources["playerTexture"].texture!)
    player.x = 200
    player.y = 200

    const basicText = new PIXI.Text(`XP: 0 Sleepbar: 10/10`, textStyle)
    basicText.x = 50
    basicText.y = 30

    const graphics = new PIXI.Graphics()

    graphics.beginFill(0x524a63)
    graphics.drawRect(40, 20, 500, 60)
    graphics.endFill()
    
    app.stage.addChild(graphics)

    app.stage.addChild(basicText);
    app.stage.addChild(player);
    
    app.ticker.add((delta : number) => update(delta))
}

function update(delta : number) {
    player.x += 0.5 * delta
}