const {v4:uuid} = require('uuid')
const data = require('../data/dummyData');
const asyncHandler = require('express-async-handler')



//@ @url  GET /api/v1/tasks
// @ access  Public
// @desc     Fetch all the tasks

exports.getTasks = (req, res) => {
    res.status(202).send({
        success: true,
        data: data,
        message: 'Tasks are fetched',
        count: data.length
    })
}


exports.getSingleTask = (req, res, next) => {
    const id = Number(req.params.id)

    try {
        if (isNaN(id)) {
            req.errorCode = 403;
            throw new Error("Id should be integer", { cause: 400 });
        }
        if (id > 1000)
            throw new Error('Id should be less than 1000', { cause: 400 });

        const task = data.find((item) => item.id === id);

        if (!task)
            return res.send({
                success: false,
                message: `Task Id ${id} doesn't exist`
            });
        res.status(200).send({ success: true, data: task })


    } catch (error) {
        res.status(400).send({ success: false, message: 'something wrong' })
        next();
    }

}

exports.addNewTask = (req, res, next) => {
    const newTask = req.body;


    data.push({ ...newTask, id: uuid() })
  

    res.status(201).send({
        success: true,
        message: 'New task added',
        data: newTask,
    })

}

