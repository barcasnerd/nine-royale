
export default class Title extends Phaser.Scene {
    constructor() {
        super({
            key: 'Title'
        });
    }

    preload() {
        //precargamos los archivos necesarios para el juego
        this.load.bitmapFont('myfont', '../assets/fonts/font.png', 'assets/fonts/font.fnt');
        this.load.image('slot', '../assets/Slot.jpg');
        this.load.image('jugar', '../assets/BJugar.png');
        this.load.image('reglas', '../assets/BReglas.png');
        this.load.image('back', '../assets/BAtrás.png');
        this.load.image('mesa', '../assets/Table.png');
        this.load.image('cuadro', '../assets/square.png');
    }

    create() {
        //Le damos a la escena su propia variable
        let self = this;
        
        //Añadimos los componentes de la escena
        this.add.bitmapText(150, 350, 'myfont', 'NineTop', 70).setTint(0xff312e).setInteractive();
        this.start = this.add.image(228, 450, 'jugar').setScale(0.2, 0.2).setInteractive();
        this.add.image(1130, 355, 'slot').setScale(1.7, 1.7).setTint(0xff312e);
        
        //Eventos del ratón sobre los componentes
        this.start.on('pointerover', function () {
            self.start.tint = 0xf8ec34;
        })
        this.start.on('pointerout', function () {
            self.start.tint = 0xFFFFFF;
        })
        //Cambio de excena
        this.start.on('pointerdown', function () {
            this.scene.start('Game');
        }, this);


    }

}