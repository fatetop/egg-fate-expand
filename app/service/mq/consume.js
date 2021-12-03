const BaseService = require('../base');

class GetInfoConsumeService extends BaseService {

  /**
   * 处理消费者消息
   * @param {string} msg jsonString
   */
  async consume(msg) {
    // TODO Anything
    console.log('consume, msg', msg, this.config.amqplib);
    // TODO Try error
    throw new Error('aaa');
  }

}

module.exports = GetInfoConsumeService;
