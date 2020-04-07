const marks = require('../app/controllers/marks');
const auth = require('../app/controllers/auth');
const sides = require('../app/controllers/sides');
const carModels = require('../app/controllers/carModels');
const carBodies = require('../app/controllers/carBodies');
const cars = require('../app/controllers/cars');
const storages = require('../app/controllers/storages');
const authMiddleware = require('../app/middleware/auth');

module.exports = (app) => {
    //auth
    app.post('/signin', auth.signIn);
    app.post('/refresh-tokens', auth.refreshTokens);
    //marks
    app.get('/marks', marks.getAll);
    app.post('/marks/add', marks.createMark);
    app.get('/marks/:id',authMiddleware, marks.findMarkById);
    app.put('/marks/:id',authMiddleware, marks.updateMark);
    app.delete('/marks/:id',authMiddleware, marks.removeMark);
    //sides
    app.get('/sides', authMiddleware, sides.getAllSides);
    app.post('/sides/add', authMiddleware, sides.createSide);
    app.get('/sides/:id', authMiddleware, sides.findSideById);
    app.put('/sides/:id', authMiddleware, sides.updateSide);
    app.delete('/sides/:id', authMiddleware, sides.removeSide);
    //carModels
    app.get('/carModels', carModels.getAllCarModels);
    app.post('/carModels/add', carModels.createCarModel);
    app.get('/carModels/:id', carModels.findCarModelById);
    app.put('/carModels/:id', carModels.updateCarModel);
    app.delete('/carModels/:id', carModels.removeCarModel);
    //carBody
    app.get('/carBodies', carBodies.getAllCarBodies);
    app.post('/carBodies/add', carBodies.createCarBody);
    app.get('/carBodies/:id', carBodies.findCarBodyById);
    app.put('/carBodies/:id', carBodies.updateCarBody);
    app.delete('/carBodies/:id', carBodies.removeCarBody);
    //cars
    app.get('/cars', cars.getAllCars);
    app.post('/cars/add', cars.createCars);
    app.put('/cars/:id', cars.updateCars);
    app.get('/cars/:id', cars.findCarsById);
    app.delete('/cars/:id', cars.removeCars);
    //storages
    app.get('/storages', storages.getAllStorages);
    app.post('/storages/add', storages.createStorage);
    app.put('/storages/:id', storages.updateStorage);
    app.get('/storages/:id', storages.findStorageById);
    app.delete('/storages/:id', storages.removeStorage);
    

};