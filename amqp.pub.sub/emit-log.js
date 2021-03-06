#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err0, connection) {
  if (err0) {
    throw err0;
  }
  connection.createChannel(function (err, channel) {
    if (err) {
      throw err;
    }
    const exchange = 'logs';
    const msg = process.argv.length === 3 ? process.argv[2] : 'Hello World!';

    channel.assertExchange(exchange, 'fanout', {
      durable: false,
    });

    channel.publish(exchange, '', Buffer.from(msg));
    console.log(' [x] Sent %s', msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
