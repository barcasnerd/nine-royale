var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 8080;
var players = [];
var numbers = [1, 2, 3, 4];

//Load the folder of static files
app.use(express.static(__dirname + '/public'));

//Set principal page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Set nineroyale page
app.get('/nineroyale', (req, res) => {
    res.sendFile(__dirname + '/public/principal.html');
});

//Set contact page
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});


io.on('connection', function (socket) {
    console.log('Usuario conectado: ' + socket.id);
    players.push(socket.id);

    let client = numbers.shift();

    if (client == 1) {
        console.log('longitudplayers: ', players.length);
        io.emit('jugador1');
    }

    if (client == 2) {
        io.emit('jugador2');
    }

    if (client == 3) {
        io.emit('jugador3');
    }



    socket.on('jugada', (gameObject, limite, jugador) => {
        io.emit('jugada', gameObject, limite, jugador);
    });

    socket.on('disconnect', function () {
        console.log('Usuario desconectado: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    })
});


//Server completely loaded
server.listen(port, () => {
    console.log(`Listening on ${server.address().port}`);
});