const ioredis = require('ioredis');
const Redlock = require('redlock');

// 实例只获取一次， 在app中进行缓存
const REDLOCK = Symbol('Application#redlock');

// this 就是 app 对象
module.exports = {

  /**
   * 设置 redlock 对象
   * @type {Redlock}
   */
  get redlock() {
    const options = this.config.redis.client;
    if (!this[REDLOCK]) {
      const redlock = new Redlock([ new ioredis(options) ], {
        // The expected clock drift; for more details see:
        /** @see http://redis.io/topics/distlock */
        driftFactor: 0.01, // multiplied by lock ttl to determine drift time
        // The max number of times Redlock will attempt to lock a resource
        // before erroring.
        retryCount: 10,
        // the time in ms between attempts
        retryDelay: 200, // time in ms
        // the max time in ms randomly added to retries
        // to improve performance under high contention
        /** @see https://www.awsarchitectureblog.com/2015/03/backoff.html */
        retryJitter: 200, // time in ms
        // The minimum remaining time on a lock before an extension is automatically
        // attempted with the `using` API.
        automaticExtensionThreshold: 500, // time in ms
      });
      this[REDLOCK] = redlock;
    }
    return this[REDLOCK];
  },

  /**
   * 页码控制
   * @param {number} page 页码
   * @param {number} limit 每页展示数
   * @return {{ offset:number; limit:number; page:number; pageSize:number; }} offset偏移量 limit所需数
   */
  pageConfig(page = 1, limit = 10) {
    page = Number(page);
    page = isNaN(page) ? 1 : page;
    page = page < 1 ? 1 : page;
    limit = Number(limit);
    limit = isNaN(limit) ? 10 : limit;
    limit = limit < 1 ? 10 : limit;
    const offset = page * limit - limit;
    return { offset, limit, page, pageSize: limit };
  },

  /**
   * 设置分页返回参数
   * @param {any[]} data 分页数组
   * @param {number} page 当前页
   * @param {number} pageSize 每页展示数
   * @param {number} count 总条目数
   * @return {{ code: number; message: string; data: {pageSize: number; currentPage: number; count: number; totalPages: number; records: any[]}; success: boolean }} 返回分页响应体
   */
  servicePage(data, page, pageSize, count) {
    const pageData = {
      pageSize,
      currentPage: page, // 当前页x
      count, // 总条数
      totalPages: Math.ceil(count / pageSize),
      records: data,
    };
    return this.serviceSuccess(pageData);
  },

  /**
   * 请求返回数据
   * @param {any} data 响应数据
   * @return {{ code: number; message: string; data: any; success: boolean }} 返回成功响应体
   */
  serviceSuccess(data = {}) {
    return {
      code: 0,
      message: '',
      data,
      success: true,
    };
  },

  /**
   * 请求失败返回
   * @param {number} code 返回错误code
   * @param {string} message 返回错误信息
   * @param {any} data 响应数据
   * @return {{ code: number; message: string; data: any; success: boolean }} 返回错误响应体
   */
  serviceFail(code = 1000, message = '', data = {}) {
    return {
      code,
      message,
      data,
      success: false,
    };
  },

};
