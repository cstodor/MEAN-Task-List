var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://csaba:csaba123@ds053196.mlab.com:53196/mean_task_list_demo', ['tasks']);

// Get All Tasks
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    })
})

// Get Single Task
router.get('/tasks/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    })
});

// Save Task (Need to Handle a POST request)
router.post('/task', function (req, res, next) {
    var task = req.body; // get the task from a form
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
    }
});

// Delete a Task
router.delete('/tasks/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    })
});

// Update a Task
router.put('/tasks/:id', function (req, res, next) {
    var task = req.body;
    var updatedTask = {}; // represents the updated task

    if (task.isDone) {
        updatedTask.isDone = task.isDone;
    }

    if (task.title) {
        updatedTask.title = task.title;
    }

    if (!updatedTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updatedTask, {}, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
    }
});

module.exports = router;