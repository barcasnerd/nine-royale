import Dealer from '../helpers/dealer.js';
import CartaAtras from '../helpers/cardback.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        //Precargando las cartas
        this.load.image('Card0', '../assets/Card_0.jpeg');
        this.load.image('Card1', '../assets/Card_1.jpeg');
        this.load.image('Card2', '../assets/Card_2.jpeg');
        this.load.image('Card3', '../assets/Card_3.jpeg');
        this.load.image('CardBack', '../assets/Card_Back.jpeg');
        this.load.image('CardR', '../assets/Card_Rotated.jpeg');
        this.load.image('CardL', '../assets/Card_Rotated2.jpeg');
        this.load.image('Zone', '../assets/zone.jpeg');

        //barra de progreso
        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xff312e, 1);
            progressBar.fillRect(630, 350, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
            assetText.setText('Cargando assets: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });


        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(620, 340, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2 + 30,
            y: height / 2 - 30,
            text: 'CARGANDO...',
            style: {
                font: '20px monospace',
                fill: '#ff312e'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.make.text({
            x: width / 2 + 18,
            y: height / 2 + 14,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ff312e'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        var assetText = this.make.text({
            x: width / 2 + 18,
            y: height / 2 + 55,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ff312e'
            }
        });
        assetText.setOrigin(0.5, 0.5);
    }

    create() {

        //Declaraciones
        let self = this;
        self.cameras.main.setBackgroundColor('#950507');
        this.dealer = new Dealer(this);
        this.dealer.deal();
        this.cartaJugador2 = self.dealer.cartaJugador2;
        this.cartaJugador3 = self.dealer.cartaJugador3;
        this.cartaJugador4 = self.dealer.cartaJugador4;

        console.log('2:', this.cartaJugador2);
        console.log('3:', this.cartaJugador3);
        console.log('4:', this.cartaJugador4);

        this.cartaOponente = new CartaAtras(this);
        this.limit = 0;
        this.socket = io();
        this.add.image(775, 350, 'Zone').setScale(0.9, 0.9);
        this.jugador = 4;


        this.socket.on('jugada', (gameObject, limite, jugador) => {
            if (jugador != self.jugador) {
                self.cartaOponente.render(760, 350, gameObject.textureKey);
                self.limit = limite;
                console.log('limiteactual', self.limit);
                //Destroy opponents card
                if (jugador == 2) {
                    self.cartaJugador2.shift().destroy();
                }

                if (jugador == 3) {
                    self.cartaJugador3.shift().destroy();
                }

                if (jugador == 4) {
                    self.cartaJugador4.shift().destroy();
                }
            }
        });

        this.socket.on('jugador1', () => {
            self.jugador = 1;

        });
        this.socket.on('jugador2', () => {
            self.jugador = 2;

        });
        this.socket.on('jugador3', () => {
            self.jugador = 3;

        });

       console.log('selfplayer',self.jugador);

        //cambiamos el tint de la ficha cuando se tenga sujetada
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xfffff);
            self.children.bringToTop(gameObject);
        })


        //devolvemos la carta a su color original 
        this.input.on('dragend', function (pointer, gameObject) {

            gameObject.setTint();
            console.log(gameObject.x);
            console.log(gameObject.y);
            if ((gameObject.x < 460 || gameObject.y < 200) || (gameObject.x > 1060 || gameObject.y > 500)) {
                console.log('drop');
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            } else {
                gameObject.x = 760;
                gameObject.y = 350;

                if (gameObject.input.dragStartX == self.dealer.locations[1]) {
                    self.limit += self.dealer.mano[1];
                }
                if (gameObject.input.dragStartX == self.dealer.locations[2]) {
                    self.limit += self.dealer.mano[2];
                }
                if (gameObject.input.dragStartX == self.dealer.locations[3]) {
                    self.limit += self.dealer.mano[3];
                }

                if (gameObject.input.dragStartX == self.dealer.locations[0]) {
                    self.limit += self.dealer.mano[0];
                }

                console.log('limit', self.limit);

                self.socket.emit('jugada', gameObject, self.limit, self.jugador);

            }
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

        })

    }
}

