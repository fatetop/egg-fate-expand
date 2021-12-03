const BaseService = require('../base');
const moment = require('moment');

class AlarmService extends BaseService {

  /**
   * 钉钉报警机器人
   * @param {string} url 机器人地址
   * @param {string} message 通知消息
   * @param {string[]} workers at手机号码数组
   */
  dingDingRobot(url, message = '', workers = []) {
    const { app, config } = this;
    const nowTime = moment().format('YYYY-MM-DD H:mm:ss');
    const content = `产品：${config.projectName}\n${message}\n运行环境:${config.env}\n当前时间：${nowTime}\n`;
    app.curl(url, {
      method: 'POST',
      contentType: 'json',
      data: {
        msgtype: 'text',
        at: {
          atMobiles: workers,
          isAtAll: workers.length === 0,
        },
        text: { content },
      },
      dataType: 'json',
      timeout: 1000000,
    }).catch(err => {
      app.logger.error(`钉钉报警机器人 报错时间：${nowTime} 请求失败：`, err);
    });
  }

}

module.exports = AlarmService;
