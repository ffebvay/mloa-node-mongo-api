const config = require('config.json');
const db = require('_helpers/db');
const Task = db.Task;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Task.find();
}

async function getById(id) {
    return await Task.findById(id);
}

async function create(taskParam) {
    const task = new Task(taskParam);

    // save task
    await task.save();
}

async function update(id, taskParam) {
    const task = await Task.findById(id);

    // check if task exists
    if (!task) throw 'Task not found';

    // copy taskParam properties to task
    Object.assign(task, taskParam);

    await task.save();
}

async function _delete(id) {
    await Task.findByIdAndRemove(id);
}