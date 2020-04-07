const carModel = require('../models/carModel');
const carBody = require('../models/carBody');
const Mark = require('../models/mark');
const cars = require('../models/cars');

const getAllCars = async (req, res) => {
    try{
        let allCars = await cars.find({}).exec();
        await res.json(allCars);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

const createCars = async (req, res) => {
    try{
        let {engine, year, markId, carModelId, carBodyId} = req.body;
        if(!engine){
            return res.status(400).json({message: 'Передайте название двигателя'})
        } else {
            let findedEngine = await cars.findOne({engine, year}).exec();
            if (findedEngine) {
                return res.status(400).json({message: 'Такая запись уже существует'});
            }
        }
        if(!year){
            return res.status(400).json({message: 'Передайте год машины'})
        }
        let mark = await Mark.findById(markId).exec();
        if(!mark){
            return res.status(400).json({message: 'Такой марки не найдено'});
        }
        let model = await carModel.findById(carModelId).exec();
        if(model){
            return res.status(400).json({message: 'Такой модели не найдено'});
        }
        let body = await carBody.findById(carBodyId).exec();
        if (!body){
            return res.status(400).json({message: 'Такой кузов не найден'})
        }

        let createdCars = await cars.create(req.body);
        await res.json(createdCars);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateCars = async (req, res) => {
    try{
        let  {engine, year, markId, carModelId, carBodyId} = req.body;
        if (!engine){
            return res.status(400).json({message: 'Не передан нужный параметр'})
        }if (!year){
            return res.status(400).json({message: 'Не передан нужный параметр'})
        }
        let mark = await Mark.findById(markId).exec();
        if(!mark){
            return res.status(400).json({message: 'Такой марки не найдено'});
        }
        let model = await carModel.findById(carModelId).exec();
        if(model){
            return res.status(400).json({message: 'Такой модели не найдено'});
        }
        let body = await carBody.findByUd(carBodyId).exec();
        if (!body){
            return res.status(400).json({message: 'Такой кузов не найден'})
        }
        let updateCars = await cars.findOneAndUpdate({_id: req.params.id}, {engine, year, markId, carModelId, carBodyId});
        await res.json(updateCars);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeCars = async (req, res) => {
    try{
        await cars.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findCarsById = async (req, res) => {
    try{
        let findCarsById = await cars.findOne({_id: req.params.id});
        await res.json(findCarsById);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAllCars, createCars, findCarsById, removeCars, updateCars
};