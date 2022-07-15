//% color="#287d81"
namespace MiniTilemaps {
    //% block="Generate mini tilemap on all $selected tiles with collision $collisionImg"
    //% selected.shadow=tileset_tile_picker
    //% collisionImg.shadow=screen_image_picker
    export function GenerateCollision(selected: Image, collisionImg: Image) {
        for (let value2 of tiles.getTilesByType(selected)) {
            for (let index32 = 0; index32 <= collisionImg.width; index32++) {
                for (let index23 = 0; index23 <= collisionImg.height; index23++) {
                    if (0 != collisionImg.getPixel(index32, index23)) {
                        TileCollisionArrayX.push(value2.column * 16 + index32)
                        TileCollisionArrayY.push(value2.row * 16 + index23)
                    }
                }
            }
        }
    }
    //% block="Clear all mini tilemaps"
    export function ClearAll() {
        TileCollisionArrayX = []
        TileCollisionArrayY = []
    }
}
namespace SpriteKind {
    //% isKind
    export const AffectedByPhysics = SpriteKind.create()
}
let cany = 0
let canx = 0
let repeat = 0
let cury = 0
let curx = 0
let TileCollisionArrayY = [0]
let TileCollisionArrayX = [0]
TileCollisionArrayY = []
TileCollisionArrayX = []
tileUtil1.onMapUnloaded(function () {
    TileCollisionArrayY = []
    TileCollisionArrayX = []
})
tileUtil1.onMapLoaded(function () {
    TileCollisionArrayY = []
    TileCollisionArrayX = []
})
game.onUpdate(function () {
    if (TileCollisionArrayX.length != 0) {
        for (let mySprite of sprites.allOfKind(SpriteKind.AffectedByPhysics)) {
            curx = mySprite.x
            cury = mySprite.y
            mySprite.setPosition(sprites1.readDataNumber(mySprite, "prevx"), sprites1.readDataNumber(mySprite, "prevy"))
            repeat = Math.abs(curx - sprites1.readDataNumber(mySprite, "prevx")) + Math.abs(cury - sprites1.readDataNumber(mySprite, "prevy"))
            canx = 1
            cany = 1
            for (let index = 0; index <= repeat; index++) {
                if (repeat > 0) {
                    if (canx == 1) {
                        mySprite.x += (curx - sprites1.readDataNumber(mySprite, "prevx")) / repeat
                        for (let index2 = 0; index2 <= TileCollisionArrayX.length; index2++) {
                            if (canx == 1) {
                                if (TileCollisionArrayX[index2] - mySprite.left >= 0 && TileCollisionArrayX[index2] - mySprite.left < mySprite.width && (TileCollisionArrayY[index2] - mySprite.top >= 0 && TileCollisionArrayY[index2] - mySprite.top < mySprite.height)) {
                                    if (mySprite.image.getPixel(TileCollisionArrayX[index2] - mySprite.left, TileCollisionArrayY[index2] - mySprite.top) != 0) {
                                        mySprite.x += 0 - (curx - sprites1.readDataNumber(mySprite, "prevx")) / repeat
                                        canx = 0
                                    }
                                }
                            }
                        }
                    }
                    if (cany == 1) {
                        mySprite.y += (cury - sprites1.readDataNumber(mySprite, "prevy")) / repeat
                        for (let index22 = 0; index22 <= TileCollisionArrayY.length; index22++) {
                            if (cany == 1) {
                                if (TileCollisionArrayX[index22] - mySprite.left >= 0 && TileCollisionArrayX[index22] - mySprite.left < mySprite.width && (TileCollisionArrayY[index22] - mySprite.top >= 0 && TileCollisionArrayY[index22] - mySprite.top < mySprite.height)) {
                                    if (mySprite.image.getPixel(TileCollisionArrayX[index22] - mySprite.left, TileCollisionArrayY[index22] - mySprite.top) != 0) {
                                        mySprite.y += 0 - (cury - sprites1.readDataNumber(mySprite, "prevy")) / repeat
                                        cany = 0
                                    }
                                }
                            }
                        }
                    }
                }
            }
            sprites1.setDataNumber(mySprite, "prevx", mySprite.x)
            sprites1.setDataNumber(mySprite, "prevy", mySprite.y)
        }
    }
})