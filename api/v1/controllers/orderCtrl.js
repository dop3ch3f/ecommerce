// Orders controller

const { knex } = require('../../../db/database');
const apiErrors = require('../../../util/errors');
const apiMessages = require('../../../util/messages');
const knexGenericErrors = require('knex-generic-errors');

const db = knexGenericErrors.attach(knex, () => knex);

const processErrors = (message, method, endpoint, err, payload) => {
  const errorList = [];
};

const registerOrder = (req, res) => {
  const data = req.body;
  db('orders').insert(data).returning('*')
    .then(response => res.json(response))
    .catch((err) => {
      const report = processErrors(apiMessages.errors.CREATE_FAILED, 'POST', req.url, err, data);
      res.status(400).json(report);
    });
};
const retreiveOrders = (req, res) => {

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

