const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err0, conn) {
  if (err0) {
    throw err0;
  }
  conn.createChannel(function (err, channel) {
    if (err) {
      throw err;
    }
    const queue = 'Hello';

    channel.assertQueue(queue, {
      durable: false,
    });
    console.log('[*] Waiting for messages in %s. To exit press CTRL+C', queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(' [x] Received %s', msg.content.toString());
      },
      {
        noAck: true,
      },
    );
  });
});
