/* eslint valid-jsdoc: "off" */
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 将 logger 目录放到代码目录下
  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1637052932913_2694';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
    'notfoundHandler',
  ];

  // 安全防护
  config.security = {
    // domainWhiteList: [ 'http://localhost:8080' ],
    // enable: false
    // 关闭csrf防护
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  // 跨域
  // config.cors = {
  //   origin: '*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  // };

  // customLoader https://github.com/eggjs/egg-core/blob/master/lib/loader/mixin/custom_loader.js
  config.customLoader = {
    // 定义在 ctx 上的属性名 ctx.utils
    utils: {
      // 相对于 app.config.baseDir
      directory: 'app/utils',
      // 如果是 app 则使用 loadToApp
      inject: 'ctx',
      // 是否加载框架和插件的目录
      loadunit: false,
    },
  };

  // add your user config here
  const userConfig = {
    projectName: 'egg-template',
    redis: {
      expireTimeOut: {
        USER_LOGIN: 24 * 60 * 60 * 3, // 用户登陆token缓存
        DIC_CONFIG_DEF: 24 * 60 * 60 * 1, // dic表配置信息缓存
        DIC_CONFIG_NOT_EXISTS_SHORT: 60 * 1, // dic表配置不存在时短时缓存
      },
    },
    dicMaps: new Map([
      [ 'home&tips', [ 'home', 'tips', true ]],
    ]),
    alarm: { // 报警通知
      dinDing: { // 钉钉机器人
        checkUserNum: '', // 检查健康用户
        consumeError: '', // 消费者消费错误
      },
    },
    rabbit: { // 消息队列配置
      working: { // 业务相关
        exchange: 'testEx',
        queue: 'testQu',
        exchangeDLX: 'testExDLX',
        routingKeyDLX: 'testRoutingKeyDLX',
        queueDLX: 'testQueueDLX',
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
