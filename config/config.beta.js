module.exports = () => {

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 服务端口
  config.cluster = {
    listen: {
      path: '',
      port: 8888,
      hostname: '0.0.0.0',
    },
  };

  // 将 logger 目录放到代码目录下
  config.logger = {
    level: 'DEBUG',
    outputJSON: true,
    encoding: 'utf-8',
    consoleLevel: 'DEBUG',
  };

  // 数据库ORM管理
  config.sequelize = {
    dialect: 'mysql',
    database: '',
    host: '',
    port: '',
    username: '',
    password: '',
    query: {
      raw: true, // return just the data and not the model instance
    },
    dialectOptions: { // An object of additional options, which are passed directly to the connection library
      dateStrings: true, // 强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一javascript Date对象返回.
      typeCast: true, // 确定是否将column值转换为本地JavaScript类型列值.
    },
    timezone: '+08:00', // 东八时区
    define: {
      // ? underscored: true, // 禁止转换为驼峰
      freezeTableName: true, // 禁止转换为复数
    },
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '', // Redis host
      password: '',
      db: 0,
      keyPrefix: '', // 前缀
    },
  };

  config.amqplib = {
    enable: false,
    connect: {
      hostname: '',
      port: '5672',
      username: '',
      password: '',
      authMechanism: 'AMQPLAIN',
      pathname: '/',
      ssl: {
        enabled: false,
      },
    },
  };

  return {
    ...config,
  };
};
