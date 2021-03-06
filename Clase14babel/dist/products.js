'use strict';

var express = require('express');
var router = express.Router();

var items = [];
var id = 0;

router.get('/', function (req, res) {
    if (items.length == 0) {
        res.json('No hay productos cargados');
    }
    res.json(items);
});

router.post('/', function (req, res) {
    id = id + 1;
    var _req$body = req.body,
        title = _req$body.title,
        price = _req$body.price,
        thumbnail = _req$body.thumbnail;

    var item = {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: id
    };
    items.push(item);
    res.sendStatus(201);
});

router.get('/:id', function (req, res) {
    if (items.length == 0) {
        res.json('No hay productos cargados');
    }
    var id = req.params.id;
    var item = items.find(function (item) {
        return item.id == id;
    });
    if (!item) {
        res.sendStatus(404).send('Producto no encontrado');
    }
    res.json(item);
});

router.patch('/actualizar/:id', function (req, res) {
    if (items.length == 0) {
        res.json('No hay productos cargados');
    }
    var id = req.params.id;
    var item = items.find(function (item) {
        return item.id == id;
    });
    if (!item) {
        res.sendStatus(404).send('Producto no encontrado');
    }

    var title = req.body.title;
    var price = req.body.price;
    var thumbnail = req.body.thumbnail;


    item.title = title;
    item.price = price;
    item.thumbnail = thumbnail;

    res.sendStatus(204).send('Producto actualizado exitosamente');
});

router.delete('/delete/:id', function (req, res) {
    if (items.length == 0) {
        res.json('No hay productos cargados');
    }
    var id = req.params.id;

    var item = items.find(function (item) {
        return item.id == id;
    });
    if (!item) {
        res.sendStatus(404).send('Producto no encontrado');
    }
    items = items.filter(function (item) {
        return item.id != id;
    });
    res.sendStatus(200).send('Producto eliminado exitosamente');
});

module.exports = router;
