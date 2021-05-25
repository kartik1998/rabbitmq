const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err0, conn) {
  if (err0) throw err0;
  conn.createChannel((err, channel) => {
    if (err) throw err;
    const queue = 'task_queue';
    const msg = process.argv.length === 3 ? process.argv[2] : 'Hello World!';
    channel.assertQueue(queue, {
      durable: true,
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true,
    });
    console.log(" [x] Sent '%s'", msg);
  });

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
