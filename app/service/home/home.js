const BaseService = require('../base');

class HomeService extends BaseService {

  /**
   * 获取首页数据
   * @param {string} channelNo 渠道号
   * @return {Promise<{ code: number; message: string; data: any; success: boolean }>} 返回响应体
   */
  async getHomeInfo(channelNo) {
    const { app } = this;
    // TODO anything
    return app.serviceSuccess(channelNo);
  }

}

module.exports = HomeService;
