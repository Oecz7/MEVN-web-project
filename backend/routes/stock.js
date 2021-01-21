import express from 'express';
const router = express.Router();

//Import model of stock

import Stock from '../models/stock.js'

const {verificarAuth, verificarAdministrador} = require('../middlewares/autentication');

//Create new stock in DB
router.post('/new-stock',[verificarAuth,verificarAdministrador], async (req, res) => {
    const body = req.body;
    body.userId = req.user._id;

    try {

        const stockDB = await Stock.create(body);
        res.status(200).json(stockDB) //status code & stock created information

    } catch (error) {
        return res.status(500).json({
            msg: 'Error occure',
            error
        }); //server error code
    }
});

router.get('/stock/:id', [verificarAuth, verificarAdministrador],async (req, res) => {
    const _id = req.params.id;
    try {
        const stockDB = await Stock.findOne({ _id });
        res.status(200).json(stockDB);

    } catch (error) {
        return res.status(400).json({
            msg: 'Error occure',
            error
        }); //server error code
    }
});
/// visualize all stocks Get
router.get('/stock',[verificarAuth, verificarAdministrador] ,async (req, res) => {
    const userId = req.user._id;
    try {
        const stockDB = await Stock.find({userId});
        res.json(stockDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });//server error code
    }
});

router.get('/stocks',verificarAuth, verificarAdministrador ,async (req, res) => {
    //const userId = req.user._id;
    try {
        const stockDB = await Stock.find();
        res.json(stockDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });//server error code
    }
});

//Delete
router.delete('/stock/:id', [verificarAuth, verificarAdministrador], async (req, res) => {
    const _id = req.params.id;
    try {
        const stockDB = await Stock.findByIdAndDelete({ _id });
        if (!stockDB) {

            return res.status(400).json({
                mensaje: 'The id stock does not exists',
                error
            });//server error code
        }
        res.json(stockDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });//server error code
    }
});

//Put or Update a stock

router.put('/stock/:id',[verificarAuth, verificarAdministrador], async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const stockDB = await Stock.findByIdAndUpdate(
            _id,
            body,
            { new: true });
        res.json(stockDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});


//Export router to use

module.exports = router;