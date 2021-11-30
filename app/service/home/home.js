const BaseService = require('../base');

class HomeService extends BaseService {

  /**
   * 获取首页数据
   * @param {string} channelNo 渠道号
   * @return {Promise<{ code: number; message: string; data: any; success: boolean }>} 返回响应体
   */
  async getHomeInfo(channelNo) {
    const { app, service, config } = this;
    // TODO anything
    // eg.
    const tips = await service.dic.dic.getDicValueByTypeAndKey(...config.dicMaps.get('home&tips'));
    return app.serviceSuccess({ channelNo, tips });
  }

}

module.exports = HomeService;
