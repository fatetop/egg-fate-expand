/* eslint-disable jsdoc/check-param-names */
const BaseController = require('../base');

class HomeController extends BaseController {

  /**
   * 首页配置
   * @function get
   * @param {string} channelNo 渠道号
   * @return {Response} 首页基本配置信息
   */
  async index() {
    const { ctx, app, service } = this;
    // 参数校验规则
    const errors = app.validator.validate({
      channelNo: {
        type: 'string?',
        trim: true,
        format: /^[\dA-Za-z]+$/,
      },
    }, ctx.query);
    // 校验失败响应
    if (errors) return this.paramsFail(errors);
    const { channelNo } = ctx.query;
    // 调用业务
    return this.apiResponse(await service.home.home.getHomeInfo(channelNo));
  }
}

module.exports = HomeController;
