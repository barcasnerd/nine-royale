import Carta from './carta.js';
import CartaAtras from './cardback.js';

export default class Dealer {
    constructor(Scene) {
        let self = this;
        var cartas = [['Card0', 0], ['Card1', 1], ['Card2', 2], ['Card3', 3], ['Card0', 0], ['Card1', 1], ['Card2', 2], ['Card3', 3], ['Card0', 0], ['Card1', 1], ['Card2', 2], ['Card3', 3], ['Card0', 0], ['Card1', 1], ['Card2', 2], ['Card3', 3], ['Card0', 0], ['Card1', 1], ['Card2', 2], ['Card3', 3]];
        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.mano = [];
        this.locations = [];
        this.cartaJugador2 = [];
        this.cartaJugador3 = [];
        this.cartaJugador4 = [];

        //
        function shuffle(o) {
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        //
        this.deal = () => {
            var random = shuffle(numbers);
            var card = new Carta(Scene);
            var cardb = new CartaAtras(Scene);
            for (let index = 0; index < 4; index++) {

                card.render(560 + (index * 140), 600, cartas[random[index]][0]).setInteractive();
                this.mano.push(cartas[random[index]][1]);
                this.locations.push(560 + (index * 140));


            }

            for (let index = 0; index < 4; index++) {


                self.cartaJugador3.push(cardb.render(560 + (index * 140), 105, 'CardBack'));
            }

            for (let index = 0; index < 4; index++) {


                self.cartaJugador2.push(cardb.render(1400, 150 + (index * 145), 'CardR'));

            }

            for (let index = 0; index < 4; index++) {


                self.cartaJugador4.push(cardb.render(125, 150 + (index * 145), 'CardL'));

            }
        }



    }
}