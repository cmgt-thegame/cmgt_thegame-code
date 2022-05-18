import * as PIXI from 'pixi.js'

import playerImage from "./img/player_luuk.png"


// create a pixi canvas
const pixi = new PIXI.Application({ backgroundColor: 0x372840, width: 1440, height: 900 })
document.body.appendChild(pixi.view)

// preload all our textures
const loader = new PIXI.Loader()
loader.add('playerTexture', playerImage)
loader.load(()=>loadCompleted())

// after loading is complete, create a fish sprite
function loadCompleted() {
    let player = new PIXI.Sprite(loader.resources["playerTexture"].texture!)
    pixi.stage.addChild(player)
}