'use strict';

var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface = {
    title: '',
    price: '',
    thumbnail: '',
}

var products = [{
    id: 1,
    title: 'TV',
    price: 1000,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/feather-2/24/tv-128.png'
}, {
    id: 2,
    title: 'Mobile Phone',
    price: 3000,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/it-technology/70/phone-128.png'
}, {
    id: 3,
    title: 'Car',
    price: 5000,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/unigrid-vehicles/54/001_sign_car_passenger-128.png'
}];

app.set("view engine", ".pug");
app.set("views", __dirname + "/views");

app.get('/add', function (req, res) {
    res.sendFile(__dirname + '/form.html');
});

app.get('/', function (req, res) {
    res.render('index.pug', { products: products, dir: 'http://localhost:8000/add' });
});

app.post('/myform', function (req, res) {
    console.log(req.body);
    res.send(req.body);
    products.push(req.body);
});

app.use('/items', require('./products'));

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.broadcast.emit('products', { products: products });

    socket.on('product', function (message) {
        var producto = message.producto,
            precio = message.precio,
            thumbnail = message.thumbnail;


        var newProduct = {
            producto: producto,
            precio: precio,
            thumbnail: thumbnail
        };
        products.push(newProduct);
    });
    socket.emit('prod', { products: products });
});

app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/chat.html');
});

var messages = [{ author: '', date: '', text: '' }];

io.on('connection', function (socket) {
    console.log('Un nuevo cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

http.listen(8000, function () {
    console.log('Running on port http://localhost:8000');
});
