const carModel = require('../models/carModel');
const Mark = require('../models/mark');
const carBody = require('../models/carBody');


const getAllCarBodies = async (req, res) => {
    try {
        let carBodies = await carBody.find({}).exec();
        await res.json(carBodies);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const createCarBody = async (req, res) => {
    try{
        let {name, markId, carModelId} = req.body;
        let mark = await Mark.findById(markId).exec();
        if (!name){
            return res.status(400).json({message: 'Не передан нужный параметр'})
        }
        if(!mark){
            return res.status(400).json({message: 'Такой марки не найдено'});
        }
        let model = await carModel.findById(carModelId).exec();
        if(model){
            return res.status(400).json({message: 'Такой марки не найдено'});
        }
        let Body = await carBody.findOne({name}).exec();
        if(Body){
            return res.status(400).json({message: 'Такая запись уже существует'});
        }
        let createdCarBody = await carBody.create({name, markId, carModelId});
        await res.json(createdCarBody);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateCarBody = async (req, res) => {
    try{
        let {name, markId, carModelId} = req.body;
        let mark = await Mark.findById(markId).exec();
        if(!mark){
            return res.status(400).json({message: 'Такой марки не найдено'});
        }
        let model = await carModel.findById(carModelId).exec();
        if(model){
            return res.status(400).json({message: 'Такой модели не найдено'});
        }
        let updateCarBody = await carBody.findOneAndUpdate({_id: req.params.id}, {name});
        await res.json(updateCarBody);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeCarBody = async (req, res) => {
    try{
        await carBody.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findCarBodyById = async (req, res) => {
    try{
        let findCarBodyById = await carBody.findOne({_id: req.params.id});
        await res.json(findCarBodyById);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAllCarBodies, createCarBody, findCarBodyById, updateCarBody, removeCarBody
};