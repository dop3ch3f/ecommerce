const cluster = require('cluster');
const express = require('express');
const mws = require('./config/middlewares');
const routes = require('./api/v1/index');
const numWorkers = require('os').cpus().length;
const auth = require('./config/auth');
const { knex } = require('./db/database');

const app = express();
require('dotenv').config();
// use middlewares
app.use(mws);

// use route
app.use(auth);
app.use(routes.home);

knex.migrate.latest()
  .then((success) => {
    console.log('DB ready', success);
  })
  .catch((err) => {
    console.log('DB not ready', err);
  });

// connect to server custer
if (cluster.isMaster) {
  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers;) {
    cluster.fork();
    i += 1;
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`app running on port: ${process.env.PORT}`);
  });
}
