var express = require('express')
var router = express.Router()

let items = [];
let id = 0;

router.get('/', (req,res) => {
    if(items.length == 0){
        res.json('No hay productos cargados');
    }
    res.json(items);
})

router.post('/', (req,res) => {
    id = id + 1;
    const { title, price, thumbnail} = req.body;
    const item = {
        title,
        price,
        thumbnail,
        id
    }
    items.push(item);
    res.sendStatus(201);
})

router.get('/:id', (req,res) => {
    if(items.length == 0){
        res.json('No hay productos cargados');
    }
    const id = req.params.id;
    const item = items.find( item => item.id == id);
    if(!item){
       res.sendStatus(404).send('Producto no encontrado');
    }
    res.json(item);
})

router.patch('/actualizar/:id', function (req, res) {
    if(items.length == 0){
        res.json('No hay productos cargados');
    }
    const id = req.params.id;
    const item = items.find( item => item.id == id);
    if(!item){
       res.sendStatus(404).send('Producto no encontrado');
    }

    const { title } = req.body;
    const { price } = req.body;
    const { thumbnail } = req.body;

    item.title = title;
    item.price = price;
    item.thumbnail = thumbnail;

    res.sendStatus(204).send('Producto actualizado exitosamente');
})

router.delete('/delete/:id', (req,res)=> {
    if(items.length == 0){
        res.json('No hay productos cargados');
    }
    const {id} = req.params
    const item = items.find( item => item.id == id);
    if(!item){
       res.sendStatus(404).send('Producto no encontrado');
    }
    items = items.filter( item => item.id != id);
    res.sendStatus(200).send('Producto eliminado exitosamente');
})

module.exports = router