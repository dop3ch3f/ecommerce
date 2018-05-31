const express = require('express');
const orderCtrl = require('../controllers/orderCtrl');

const api = express.Router();

api.all('/orders')
  .post(orderCtrl.registerOrder)
  .get(orderCtrl.retreiveOrders)
  .put(orderCtrl.updateOrders)
  .patch(orderCtrl.editOrder)
  .delete(orderCtrl.deleteOrder);
module.exports = api;
