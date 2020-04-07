const Side = require('../models/side');
const Storage = require('../models/storage');
const User = require('../models/user');
const Cars = require('../models/cars');
const Details = require('../models/detail');

const getAllDetails = async (req, res) => {
    try{
        let allDetails = await Details.find({}).exec();
        await res.json(allDetails);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

const createDetail = async (req, res) => {
    try{
        let {name, description, state, carId, sideId, ownerId, cost_item, storageId, analog} = req.body;
        if(!name){
            return res.status(400).json({message: 'Передайте название детали'})
        } else {
            let detail = await Details.findOne({name}).exec();
            if (detail) {
                return res.status(400).json({message: 'Такая запись уже существует'});
            }
        }
        if(!description){
            return res.status(400).json({message: 'Передайте описание детали'})
        }
        let car = await Cars.findById(carId).exec();
        if(!car){
            return res.status(400).json({message: 'Такой машины не найдено'});
        }
        let side = await Side.findById(sideId).exec();
        if(!side){
            return res.status(400).json({message: 'Такой стороны не найдено'});
        }
        let storage = await Storage.findById(storageId).exec();
        if (!storage){
            return res.status(400).json({message: 'Такое место не найдено'})
        }
        let owner = await User.findById(ownerId).exec();
        if (!owner){
            return res.status(400).json({message: 'Такой хозяйн не найден'})
        }

        let createdDetails = await Details.create({name, description, state, carId, sideId, ownerId, cost_item, storageId, analog});
        await res.json(createdDetails);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateDetails = async (req, res) => {
    try{
        let  {name, description, state, carId, sideId, ownerId, cost_item, storageId, analog} = req.body;

        let car = await Cars.findById(carId).exec();
        if(!car){
            return res.status(400).json({message: 'Такой машины не найдено'});
        }
        let side = await Side.findById(sideId).exec();
        if(!side){
            return res.status(400).json({message: 'Такой стороны не найдено'});
        }
        let storage = await Storage.findById(storageId).exec();
        if (!storage){
            return res.status(400).json({message: 'Такое место не найдено'})
        }
        let owner = await User.findById(ownerId).exec();
        if (!owner){
            return res.status(400).json({message: 'Такой хозяйн не найден'})
        }

        let updateDetail = await Details.findOneAndUpdate({_id: req.params.id}, {name, description, state, carId, sideId, ownerId, cost_item, storageId, analog});
        await res.json(updateDetail);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeDetails = async (req, res) => {
    try{
        await Details.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findDetailsById = async (req, res) => {
    try{
        let findDetailsById = await Details.findOne({_id: req.params.id});
        await res.json(findDetailsById);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAllDetails, createDetail, findDetailsById, updateDetails, removeDetails
};