// Orders controller

const { knex } = require('../../../db/database');
const apiErrors = require('../../../util/errors');
const apiMessages = require('../../../util/messages');


// To generate an error response per errors in this document
const processErrors = (message, method, endpoint, err, payload) => {
  const errorList = [];
  // Check for validation error
  console.log(err);
  switch (err.name) {
    // entry already exists
    case 'AlreadyExist':
      errorList.push(apiErrors.errors.ENTRY_ALREADY_EXISTS);
      break;
    // issues with the query
    case 'QueryError':
      errorList.push(apiErrors.errors.MISSING_ENTRY);
      break;
    // issues with the database
    case 'DatabaseError':
      errorList.push(apiErrors.errors.SERVER_ERROR);
      break;
    default:
      errorList.push(apiErrors.errors.UNKNOWN_ERROR);
      break;
  }
  return apiErrors.create(message, method, endpoint, errorList, payload);
};

const registerOrder = (req, res) => {
  const data = req.body;
  return knex('orders').insert(data).returning('*')
    .then(response => res.json(response))
    .catch((err) => {
      const report = processErrors(apiMessages.errors.CREATE_FAILED, 'POST', req.url, err, data);
      res.status(400).json(report);
    });
};
const retreiveOrders = (req, res) => {
  let data = req.body;
  return knex.select('*').from('orders').where('data')

};
const updateOrders = (req, res) => {

};
const editOrder = (req, res) => {

};
const deleteOrder = (req, res) => {

};

// converts the Knex errors to API specific errors


module.exports = {
  registerOrder,
  retreiveOrders,
  updateOrders,
  editOrder,
  deleteOrder,
};

