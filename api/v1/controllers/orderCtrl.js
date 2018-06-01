// Orders controller

const { knex } = require('../../../db/database');
const apiMessages = require('../../../util/messages');
const processErrors = require('../../../util/genReport');


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
  const data = req.body;
  const criteria = new Date();
  // send response using order_id
  if (data.order_id) {
    return knex.select('*').from('users').where('order_id', '=', data.order_id)
      .then(response => res.json(response))
      .catch((err) => {
        const report = processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, err, data);
        res.status(400).json(report);
      });
  }
  // send response using user_id
  if (data.user_id) {
    return knex.select('*').from('users').where('user_id', '=', data.user_id)
      .then(response => res.json(response))
      .catch((err) => {
        const report = processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, err, data);
        res.status(400).json(report);
      });
  }
  // send all responses using time
  return knex.select('*').from('orders').where('created_at', '<', criteria)
    .then(response => res.json(response))
    .catch((err) => {
      const report = processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, err, data);
      res.status(400).json(report);
    });
};
const updateOrders = (req, res) => {
  const data = req.body;
  return knex('orders').where('order_id', data.order_id).update(data)
    .then(response => res.json(response))
    .catch((err) => {
      const report = processErrors(apiMessages.errors.PUT_FAILED, 'PUT', req.url, err, data);
      res.status(400).json(report);
    });
};
const editOrder = (req, res) => {
  const data = req.body;
  return knex('orders').where('order_id', data.order_id).update(data)
    .then(response => res.json(response))
    .catch((err) => {
      const report = processErrors(apiMessages.errors.PATCH_FAILED, 'PATCH', req.url, err, data);
      res.status(400).json(report);
    });
};
const deleteOrder = (req, res) => {
  const data = req.body;

  return knex('orders')
    .where('order_id', re)
    .del();
};

// converts the Knex errors to API specific errors


module.exports = {
  registerOrder,
  retreiveOrders,
  updateOrders,
  editOrder,
  deleteOrder,
};

