const carModel = require('../models/carModel');
const Mark = require('../models/mark');

const getAllCarModels = async (req, res) => {
    try{
        let carModels = await carModel.find().exec();
        await res.json(carModels);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

const createCarModel = async (req, res) => {
    try{
        let {name, markId} = req.body;
        if (!name){
            return res.status(400).json({message: 'Не передан нужный параметр'})
        }
        let mark = await Mark.findById(markId).exec();
        if(!mark){
            return res.status(400).json({message: 'Такой марки не найдено'});
        }
        let model = await carModel.findOne({name}).exec();
        if(model){
            return res.status(400).json({message: 'Такая запись уже существует'});
        }
        let createdCarModel = await carModel.create({name, markId});
        await res.json(createdCarModel);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateCarModel = async (req, res) => {
    try{
        let {name, markId} = req.body;
        let mark = await Mark.findById(markId).exec();
        if (!name){
            return res.status(400).json({message: 'Не передан нужный параметр'})
        }
        if(!mark){
            return res.status(400).json({message: 'Такой марки не найдено'});
        }
        let updateCarModel = await carModel.findOneAndUpdate({_id: req.params.id}, {name});
        await res.json(updateCarModel);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeCarModel = async (req, res) => {
    try{
        await carModel.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findCarModelById = async (req, res) => {
    try{
        let findCarModelById = await carModel.findOne({_id: req.params.id});
        await res.json(findCarModelById);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAllCarModels, createCarModel, findCarModelById, updateCarModel, removeCarModel
};