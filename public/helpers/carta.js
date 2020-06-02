export default class Carta {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let carta = scene.add.image(x, y, sprite).setScale(0.4, 0.4).setInteractive();
            scene.input.setDraggable(carta);
            return carta;
        }
    }
}