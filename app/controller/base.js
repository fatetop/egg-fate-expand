const Controller = require('egg').Controller;

/**
 * ! MUST DO 控制器层处理参数校验 、调用service 、 最终服务响应
 */
class BaseController extends Controller {

  /**
   * 请求可响应结果 json响应
   * @param {{ code: number; message: string; data: any; success: boolean }} body 响应体
   */
  apiResponse(body = {}) {
    this.ctx.set({
      'Content-Type': 'application/json',
    });
    this.ctx.status = 200;
    this.ctx.body = body;
  }

  /**
   * 处理参数校验失败的响应
   * @param {{ message: string; code: string; field: string; }[]} errors validate校验后的错误信息
   */
  paramsFail(errors) {
    // eq
    // [
    //   {
    //     message: 'should be one of index, other',
    //     code: 'invalid',
    //     field: 'position'
    //   }
    // ]
    this.apiResponse(this.app.serviceFail(this.config.errorCode.paramsError, `${errors[0].field} ${errors[0].message}`));
  }

}

module.exports = BaseController;
