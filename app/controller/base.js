const Controller = require('egg').Controller;

/**
 * ! MUST DO 控制器层处理参数校验 、调用service 、 最终服务响应
 */
class BaseController extends Controller {

  /**
   * 测试 Dlx 队列 Producer
   */
  async sendMqDlx() {
    const { ctx, config } = this;
    if (!config.amqplib.enable) {
      // 没有使用rabbitMQ
      throw new Error('Not enable amqplib');
    }
    const { exchange, queue, exchangeDLX, routingKeyDLX } = config.rabbit.working;
    const msg = { a: 'hello world! hello world!' };
    const sendRes = await ctx.utils.rabbitMq.dlx.producer.send(config.amqplib.connect, { exchange, queue, exchangeDLX, routingKeyDLX }, 5000, msg).catch(ctx.logger.error);
    if (!sendRes) {
      // TODO 报警机制
      // service.utils.alarm.dingDingRobot();
    }
  }

  /**
   * get http status code
   * @param {number} code code
   * @return {number} code
   */
  static getHttpCode(code) {
    let httpCode = 500;
    switch (code) {
      case 0:
        httpCode = 200; // 业务处理成功
        break;
      case 1000:
        httpCode = 400; // 参数校验失败
        break;
      case 401:
        httpCode = 401; // 认证失败
        break;
      case 201:
        httpCode = 201; // 资源添加成功
        break;
      default:
        break;
    }
    return httpCode;
  }

  /**
   * 请求可响应结果 json响应
   * @param {{ code: number; message: string; data: any; success: boolean }} body 响应体
   */
  apiResponse(body = {}) {
    this.ctx.set({
      'Content-Type': 'application/json',
    });
    this.ctx.status = BaseController.getHttpCode(body.code);
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
    this.apiResponse(this.app.serviceFail(this.ctx.utils.errorInfo.errorCode.paramsError, `${errors[0].field} ${errors[0].message}`));
  }

}

module.exports = BaseController;
