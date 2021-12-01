const BaseService = require('../base');

class ScheduleService extends BaseService {

  /**
   * 定时任务 -- 检查正常用户数
   */
  async checkUserNum() {
    const { ctx, service, config } = this;
    const userCount = await ctx.model.User.count({
      where: {
        status: 1,
      },
    });
    ctx.logger.info('ScheduleService checkUserNum userCount : ', userCount);
    if (userCount < 10) {
      service.utils.alarm.dingDingRobot(config.alarm.dinDing.checkUserNum, '用户系统异常，正常用户数小于10人');
    }
  }

}

module.exports = ScheduleService;
