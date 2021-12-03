const amqp = require('amqplib');

const { send: sendProducer } = require('./producer');

module.exports.run = async (connectConfig, { exchange, queue, exchangeDLX, routingKeyDLX, queueDLX }, callback, addCtxLogs, alarmCallback) => {
  if (Object.prototype.toString.call(callback) !== '[object AsyncFunction]') {
    throw new Error('Callback is not a AsyncFunction');
  }
  const conn = await amqp.connect(connectConfig);
  const ch = await conn.createChannel();
  await ch.assertExchange(exchangeDLX, 'direct', { durable: true });
  const queueResult = await ch.assertQueue(queueDLX, {
    exclusive: false,
  });
  await ch.bindQueue(queueResult.queue, exchangeDLX, routingKeyDLX);
  await ch.consume(queueResult.queue, msg => {
    callback(msg.content.toString()).then(() => {
      ch.ack(msg);
    }).catch(err => {
      addCtxLogs && addCtxLogs('队列消费者消费时报错 ？？', err);
      let count = msg.properties.headers.count;
      count++;
      // 容错最大次数
      if (count < 3) {
        sendProducer(connectConfig, { exchange, queue, exchangeDLX, routingKeyDLX }, 5000, JSON.parse(msg.content.toString()), count);
      } else {
        // TODO 报警
        alarmCallback && alarmCallback();
      }
      ch.ack(msg);
    });
  }, { noAck: false }).then(() => {
    addCtxLogs && addCtxLogs('已连接rabbitMq消费者');
  }).catch(() => {
    addCtxLogs && addCtxLogs('连接rabbitMq消费者失败！！');
  });
};
