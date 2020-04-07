const Mark = require('../models/mark');

const getAll = async (req, res) => {
    try{
        let marks = await Mark.find().exec();
        await res.json(marks);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

const createMark = async (req, res) => {
    try{
        let {name} = req.body;
        if (!name){
            return res.status(400).json({message: 'Не передан нужный параметр'})
        }
        let createdMark = await Mark.create({name});
        await res.json(createdMark);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateMark = async (req, res) => {
    try{
        let {name} = req.body;
        if (!name){
            return res.status(400).json({message: 'Не передан нужный параметр'})
        }
        let mark = await Mark.findOneAndUpdate({_id: req.params.id}, {name});
        await res.json(mark);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeMark = async (req, res) => {
    try{
        await Mark.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findMarkById = async (req, res) => {
    try{
        let mark = await Mark.findOne({_id: req.params.id});
        await res.json(mark);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAll,
    createMark,
    updateMark,
    removeMark,
    findMarkById
};