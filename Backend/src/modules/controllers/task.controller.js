const { v4: uuidv4 } = require('uuid');
const Task = require('../../models/Task');

module.exports.getAllTasks = async (req, res, next) => {
  Task.find({}).then(result => {
    res.send({data: result});
  })
};

module.exports.createNewTask = (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('text') && body.hasOwnProperty('isCheck')) {
    
    body.id = uuidv4();
    const task = new Task({
      id: body.id,
      text: body.text,
      isCheck: body.isCheck
    })
    task.save().then(result => {
      res.send(result)
    }).catch(err => console.log(err))
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.changeTaskInfo = (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  if (body.hasOwnProperty('id') && (body.hasOwnProperty('text') || body.hasOwnProperty('isCheck'))) {
    Task.updateOne(
      { id: req.body.id },
      { text: req.body.text, isCheck: req.body.isCheck }
    ).then((result) => {
      Task.find().then((result) => {
        res.send(result);
      });
    });
  } else {
    res.status(422).send("Error! Params not correct");
  }
};

module.exports.deleteTask = (req, res, next) => {
  Task.deleteOne({id: req.query.id}).then(result => {
    Task.find().then(_result => {
      res.send({data: _result})
      });
    });
  };

module.exports.deleteTasks = (req, res, next) => {
  Task.remove({}).then(result => {
    res.send({result})
  })
};

