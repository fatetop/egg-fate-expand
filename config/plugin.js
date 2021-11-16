/** @type {Egg.EggPlugin} */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 数据库配置
  /** @see https://sequelize.org/master */
  sequelize: {
    enable: false,
    package: 'egg-sequelize',
  },
  // 请求参数校验
  /** @see https://github.com/node-modules/parameter */
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // redis
  redis: {
    enable: false,
    package: 'egg-redis',
  },
};
