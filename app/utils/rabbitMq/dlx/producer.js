const amqp = require('amqplib');

/**
 * @param {*} connectConfig connectConfig
 * @param {{ exchange: string; queue: string; exchangeDLX: string; routingKeyDLX: string; }} other other
 * @param {number} ms ms
 * @param {{ [key: string]: any }} msg msg
 * @param {number} count 重试次数
 * @return {Promise<boolean>} return
 */
module.exports.send = async (connectConfig, { exchange, queue, exchangeDLX, routingKeyDLX }, ms = 1000, msg = {}, count = 0) => {
  if (Object.prototype.toString.call(msg) !== '[object Object]') {
    throw new Error('msg is not a Object');
  }
  const conn = await amqp.connect(connectConfig);
  const ch = await conn.createChannel();
  await ch.assertExchange(exchange, 'direct', { durable: true });
  const queueResult = await ch.assertQueue(queue, {
    exclusive: false,
    deadLetterExchange: exchangeDLX,
    deadLetterRoutingKey: routingKeyDLX,
  });
  await ch.bindQueue(queueResult.queue, exchange);
  console.log('producer msg：', msg);
  try {
    return ch.sendToQueue(queueResult.queue, new Buffer.from(JSON.stringify(msg)), {
      expiration: (ms).toString(),
      headers: { count },
    });
  } catch (err) {
    console.log(err, 'err');
    return false;
  } finally {
    console.log('finally close');
    // 关闭渠道
    await ch.close();
    // 关闭连接
    await conn.close();
  }
};
