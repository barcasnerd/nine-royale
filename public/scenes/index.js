
import Title from "./title.js";
import Game from "./game.js";

//configuraciones del canvas de Phaser
const config = {
    type: Phaser.AUTO,
    width: 1520,
    height: 700,
    scene: [Title, Game]
};

var game = new Phaser.Game(config);
