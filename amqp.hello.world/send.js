const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err0, conn) {
  if (err0) throw err0;
  conn.createChannel((err, channel) => {
    if (err) throw err;
    const queue = 'Hello';
    const msg = 'Hello World';
    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log('[x] Sent %s', msg);
  });

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
