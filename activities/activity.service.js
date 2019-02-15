const config = require('config.json');
const db = require('_helpers/db');
const Activity = db.Activity;

module.exports = {
    getAll,
    getById,
    getByUser,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Activity.find();
}

async function getById(id) {
    return await Activity.findById(id);
}

async function getByUser(uId) {
    let query = {};
    query['userId'] = uId;

    return await Activity.find(query, function(err, activities) {
        if (err) {
            throw 'Activities not found for the current user';
        }
    });
}

async function create(activityParam) {
    const activity = new Activity(activityParam);

    // save activity
    await activity.save();
}

async function update(id, activityParam) {
    const activity = await Activity.findById(id);

    // check if activity exists
    if (!activity) throw 'Activity not found';

    // copy activityParam properties to activity
    Object.assign(activity, activityParam);

    await activity.save();
}

async function _delete(id) {
    await Activity.findByIdAndRemove(id);
}