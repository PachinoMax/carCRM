const Storage = require('../models/storage');

const getAllStorages = async (req, res) => {
    try{
        let storages = await Storage.find().exec();
        await res.json(storages);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const createStorage = async (req, res) => {
    try{
        let {name} = req.body;
        if(!name){
            res.status(400).json({message: 'Не передан параметр'})
        }
        let storage = await Storage.findOne({name}).exec();
        if (storage){
            res.status(400).json({message: 'Такая запись уже существует'})
        }
        let createdStorage = await Storage.create(name);
        await res.json(createdStorage);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateStorage = async (req, res) => {
    try{
        let {name} = req.body;
        if(!name){
            res.status(400).json({message: 'Не передан параметр'})
        }
        let updateStorage = await Storage.findOneAndUpdate({_id: req.params.id}, {name});
        await res.json(updateStorage);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeStorage = async (req, res) => {
    try{
        await Storage.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findStorageById = async (req, res) => {
    try{
        let storage = await Storage.findOne({_id: req.params.id});
        await res.json(storage);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAllStorages, createStorage, updateStorage, findStorageById, removeStorage
}