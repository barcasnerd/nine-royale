var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 8080;

//Load the folder of static files
app.use(express.static(__dirname + '/public'));

//Set principal page
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

//Set nineroyale page
app.get('/nineroyale',(req,res)=>{
    res.sendFile(__dirname + '/public/principal.html');
});

//Set contact page
app.get('/contact',(req,res)=>{
    res.sendFile(__dirname + '/public/contact.html');
});

//Server completely loaded
server.listen(port,()=>{
    console.log(`Listening on ${server.address().port}`);
});