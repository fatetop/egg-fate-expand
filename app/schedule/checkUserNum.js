const Subscription = require('egg').Subscription;

class RepeatNotifyEvents extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 10s 间隔
      // // 每三小时准点执行一次
      // cron: '0 0 */3 * * *',
      type: 'worker', // 配置为all时，指定所有的 worker 都需要执行
      immediate: true, // 配置为true时，应用启动并ready后立刻执行
      disable: true, // 配置为true时，这个定时任务不会启动
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx, service } = this;
    try {
      await service.utils.schedule.checkUserNum();
    } catch (err) {
      ctx.logger.error(err);
    }
  }
}

module.exports = RepeatNotifyEvents;
