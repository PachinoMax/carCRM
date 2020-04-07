const Side = require('../models/side');

const getAllSides = async (req, res) => {
    try{
        let sides = await Side.find().exec();
        await res.json(sides);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const createSide = async (req, res) => {
    try{
        let {name} = req.body;
        if(!name){
            res.status(400).json({message: 'Не передан параметр'})
        }
        let side = await Side.findOne({name}).exec();
        if (side){
            res.status(400).json({message: 'Такая запись уже существует'})
        }
        let createdSide = await Side.create(name);
        await res.json(createdSide);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateSide = async (req, res) => {
    try{
        let {name} = req.body;
        if(!name){
            res.status(400).json({message: 'Не передан параметр'})
        }
        let side = await Side.findOneAndUpdate({_id: req.params.id}, {name});
        await res.json(side);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeSide = async (req, res) => {
    try{
        await Side.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findSideById = async (req, res) => {
    try{
        let side = await Side.findOne({_id: req.params.id});
        await res.json(side);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAllSides, createSide, findSideById, updateSide, removeSide
}