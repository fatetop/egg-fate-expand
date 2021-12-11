const Service = require('egg').Service;

// redis连接配置
class RedisService extends Service {

  /**
   * 获取get缓存
   * @param {string} key 缓存键名
   * @return {Promise<any>} 缓存值
   */
  async get(key) {
    const { app } = this;
    // 判断redis配置有没有开
    if (app.redis) {
      // 配置前置key
      const data = await app.redis.get(key);
      if (!data) return null;
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * 前置设置Redis缓存
   * @param {string} key 缓存键
   * @param {any} value 缓存值
   * @param {number} seconds 缓存几秒
   * @return {Promise<boolean>} 设置成功与否
   */
  async preSet(key, value, seconds) {
    const { config, ctx } = this;
    // 数据为空 设置短效的缓存
    if (ctx.utils.tHelper.isEmpty(value)) {
      seconds = config.redis.expireTimeOut.DIC_CONFIG_NOT_EXISTS_SHORT;
    }
    return this.set(key, value, seconds);
  }

  /**
   * 设置缓存
   * @param {string} key 缓存键
   * @param {any} value 缓存值
   * @param {?number} seconds 缓存几秒
   * @return {Promise<boolean>} 设置成功与否
   */
  async set(key, value, seconds) {
    const { app } = this;
    // 配置前置key
    value = JSON.stringify(value);
    // 判断redis配置有没有开
    if (app.redis) {
      if (!seconds) {
        return await app.redis.set(key, value) === 'OK';
      }
      return await app.redis.set(key, value, 'EX', seconds) === 'OK';
    }
    return false;
  }

  /**
   * 获取命中的缓存的个数
   * @param {string} key 缓存键名
   * @return {Promise<string[]>} 命中的缓存的个数
   */
  async keys(key) {
    const { app, config } = this;
    // 判断redis配置有没有开
    if (app.redis) {
      // 配置前置key
      const data = await app.redis.keys(config.redis.client.keyPrefix + key);
      // 方便使用
      return data.map(v => v.replace(config.redis.client.keyPrefix, ''));
    }
    return [];
  }

  /**
   * 删除缓存
   * @param {string} key 缓存键名
   * @return {Promise<boolean>} 删除成功与否
   */
  async del(key) {
    const { app } = this;
    // 判断redis配置有没有开
    if (app.redis) {
      let bool = true;
      // 配置前置key
      const data = await app.redis.del(key);
      if (data !== 1) {
        bool = false;
      }
      // 返回是否删除成功
      return bool;
    }
    return false;
  }

  /**
   * 删除缓存
   * @param {string[]} keys 缓存键名
   * @return {Promise<boolean>} 删除成功与否
   */
  async delByList(keys) {
    const { app } = this;
    // 判断redis配置有没有开
    if (app.redis) {
      if (!Array.isArray(keys)) return false;
      let bool = true;
      for (let i = 0; i < keys.length; i++) {
        // 配置前置key
        const data = await app.redis.del(keys[i]);
        if (data !== 1) {
          bool = false;
        }
      }
      // 返回是否删除成功
      return bool;
    }
    return false;
  }

  /**
   * 延时缓存时间
   * @param {string} key 缓存键名
   * @param {number} seconds 缓存几秒
   * @return {Promise<boolean>} 删除成功与否
   */
  async delay(key, seconds) {
    const { app } = this;
    // 判断redis配置有没有开
    if (app.redis) {
      let bool = true;
      // 配置前置key
      const data = await app.redis.expire(key, seconds);
      if (data !== 1) {
        bool = false;
      }
      // 返回是否删除成功
      return bool;
    }
    return false;
  }

  /**
   * 递增
   * @param {string} key 缓存名
   * @param {number} step 步进数
   * @return {Promise<number | null>} 操作后的值
   */
  async increment(key, step = 1) {
    const { app } = this;
    // 判断Redis配置是否开启
    if (app.redis) {
      return app.redis.incrby(key, step);
    }
    return null;
  }

  /**
   * 递减
   * @param {string} key 缓存名
   * @param {number} step 步进数
   * @return {Promise<number | null>} 操作后的值
   */
  async decrement(key, step = 1) {
    const { app } = this;
    // 判断Redis配置是否开启
    if (app.redis) {
      return app.redis.decrby(key, step);
    }
    return null;
  }

}

module.exports = RedisService;
