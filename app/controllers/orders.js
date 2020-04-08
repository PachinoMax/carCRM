
const User = require('../models/user');
const Details = require('../models/detail');
const Orders = require('../models/order');

const getAllOrders = async (req, res) => {
    try{
        let allOrders = await Orders.find({}).exec();
        await res.json(allOrders);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

const createOrders = async (req, res) => {
    try{
        let {date, description, detailId, userId, count, is_debt, debt_date, guaranty} = req.body;
        if(!date){
            return res.status(400).json({message: 'Передайте дату продажи детали'})
        }
        if(!count){
            return res.status(400).json({message: 'Передайте количество товара'})
        }
        let detail = await Details.findById(detailId).exec();
        if(!detail){
            return res.status(400).json({message: 'Такой детали не найдено'});
        }
        let user = await Users.findById(userId).exec();
        if(!user){
            return res.status(400).json({message: 'Такой хозяин детали не найден'});
        }
        let sum = detail.cost_item * count;

        let createdOrders = await Orders.create({date, description, detailId, userId, count, sum, is_debt, debt_date, guaranty});
        await res.json(createdOrders);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const updateOrders = async (req, res) => {
    try{
        let  {date, description, detailId, userId, count, is_debt, debt_date, guaranty} = req.body;

        let updateOrder = await Orders.findOneAndUpdate({_id: req.params.id}, {date, description, detailId, userId, count, is_debt, debt_date, guaranty});
        await res.json(updateOrder);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const removeOrders = async (req, res) => {
    try{
        await Orders.deleteOne({_id: req.params.id});
        await res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const findOrdersById = async (req, res) => {
    try{
        let findOrdersById = await Orders.findOne({_id: req.params.id});
        await res.json(findOrdersById);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

module.exports ={
    getAllOrders, createOrders, findOrdersById, updateOrders, removeOrders
};