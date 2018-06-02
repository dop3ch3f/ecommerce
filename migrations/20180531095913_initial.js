const orders = require('../db/schema/orders');

exports.up = (knex, Promise) => (
  orders.createOrdersTable()
);

exports.down = (knex, Promise) => {
  orders.dropOrdersTable();
};
