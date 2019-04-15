
function setup(app) {

  app.get('/time', (request, response) => {
    response.send(new Date());
  });

  app.get('/hello/:who', (request, response) => {
    const name = request.param.who;

    response.send(`Hello ${name}`);
  });


  const accounts = {
    1: 100,
    2: 100
  };

  const secrets = {
    1: 'iamthebest',
    2: 'not_a_morning_person',
  };


  app.use('/bank/*', (request, response) => {
    const from = request.body.fromAccount;
    const amount = request.body.secret;


    if (secrets[from] != secret) {
      response.send("not authorized");
    }
  });

  app.get('/bank/balance/:accountNumber', (request, response) => {
    const accountNumber = request.param.fromAccount;
    response.send(account[accountNumber]);
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

module.exports = setup;
