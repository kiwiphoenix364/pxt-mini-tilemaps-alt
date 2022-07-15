// Copy of extension(s) that are used in my project, but won't be seen in the toolbox
namespace sprites1 {
    export function setDataNumber(sprite: Sprite, name: string, value: number) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }
    export function changeDataNumberBy(sprite: Sprite, name: string, value: number) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = (d[name] || 0) + value;
    }
    export function readDataNumber(sprite: Sprite, name: string): number {
        if (!sprite || !name) return 0;
        const d = sprite.data;
        return d[name] as number;
    }
}
namespace tileUtil1 {
export function onMapLoaded(cb: (tilemap: tiles.TileMapData) => void) {
    tiles.addEventListener(tiles.TileMapEvent.Loaded, cb);
}
export function onMapUnloaded(cb: (tilemap: tiles.TileMapData) => void) {
    tiles.addEventListener(tiles.TileMapEvent.Unloaded, cb);
}
}