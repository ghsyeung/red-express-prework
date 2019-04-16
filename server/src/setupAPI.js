const cors = require('cors');
const express = require('express');

const secrets = {
  1: 'iamthebest',
  2: 'not_a_morning_person',
};


function checkSecret(id, s) {
  return secrets[id] === s;
}

function formatDate(d) {
  return `${d.getYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
}

function setup(app) {
  setupCORS(app);

  app.get('/time', (request, response) => {
    response.json(formatDate(new Date()));
  });

  app.get('/hello/:who?', (request, response) => {
    const name = request.params.who || 'nobody';
    response.json(`Hello ${name}`);
  });

  app.post('/hello', (request, response) => {
    const name = request.body.who;
    response.send(`Hello ${name}`);
  });


  const accounts = {
    1: 100,
    2: 100
  };

  app.use('/bank/*', (request, response, next) => {
    const from = request.body.fromAccount;
    const secret = request.body.secret;

    next();
  });

  app.post('/bank/balance', (request, response) => {
    const accountNumber = request.body.fromAccount;
    response.send('' + accounts[accountNumber]);
  });

  app.post('/bank/transfer', (request, response) => {
    const from = request.body.fromAccount;
    const to = request.body.toAccount;
    const amount = request.body.amount;

    if (accounts[from] < amount) {
      response.send("not enough money");
    } else {
      accounts[from] -= amount;
      accounts[to] += amount;

      response.send("ok");
    }
  });

}

function setupCORS(app) {
  app.use(cors());
  app.options('*', cors());
  app.use(express.json());
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json(err);
  })
}

module.exports = setup;
