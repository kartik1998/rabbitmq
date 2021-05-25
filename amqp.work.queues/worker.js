const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err0, conn) {
  if (err0) {
    throw err0;
  }
  conn.createChannel(function (err, channel) {
    if (err) {
      throw err;
    }
    const queue = 'task_queue';

    // This makes sure the queue is declared before attempting to consume from it
    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1); // Instead of round robin try to give messages to queues which are free

    channel.consume(
      queue,
      function (msg) {
        const secs = msg.content.toString().split('.').length - 1;
        console.log('[x] time: ', secs, 'recieved string: ', msg.content.toString());
        setTimeout(function () {
          console.log('[x] Done');
        }, secs * 1000);
      },
      {
        // automatic acknowledgment mode,
        // see https://www.rabbitmq.com/confirms.html for details
        noAck: false,
      },
    );
  });
});
