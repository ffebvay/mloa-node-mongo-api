const express = require('express');
const router = express.Router();
const activityService = require('./activity.service');

// routes
router.post('/add', addActivity);
router.get('/', getAll);
router.get('/user/:userId', getAllByUser);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    activityService.getAll()
        .then(activities => res.json(activities))
        .catch(err => next(err));
}

function getAllByUser(req, res, next) {
    activityService.getByUser(req.params.userId)
        .then(activities => activities ? res.json(activities) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    activityService.getById(req.activity.sub)
        .then(activity => activity ? res.json(activity) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    activityService.getById(req.params.id)
        .then(activity => activity ? res.json(activity) : res.sendStatus(404))
        .catch(err => next(err));
}

function addActivity(req, res, next) {
    activityService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    activityService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    activityService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}