const { v4: uuidv4 } = require('uuid');
const Expenses = require('../../models/Expenses');

module.exports.getAllExpenses = async (req, res, next) => {
  Expenses.find({}).then(result => {
    res.send({data: result});
  }) 
};

module.exports.createNewExpenses = (req, res, next) => {
  const body = req.body;
  console.log('body', body)
  if (body.hasOwnProperty('name') && body.hasOwnProperty('price')) {
    
    body.id = uuidv4();
    body.date = new Date();
    const expenses = new Expenses(body)
    expenses.save().then(result => {
      res.send(result)
    }).catch(err => console.log(err))
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.changeExpensesInfo = (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  if (body.hasOwnProperty('id') && (body.hasOwnProperty('name') || body.hasOwnProperty('price'))) {
    Expenses.updateOne(
      { id: req.body.id },
      { name: req.body.name, price: req.body.price }
    ).then((result) => {
      Expenses.find().then((result) => {
        res.send(result);
      });
    });
  } else {
    res.status(422).send("Error! Params not correct");
  }
};

module.exports.deleteExpenses = (req, res, next) => {
  Expenses.deleteOne({id: req.query.id}).then(result => {
    Expenses.find().then(_result => {
      res.send({data: _result})
      });
    });
  };


