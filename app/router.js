/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/homeConfig', controller.home.home.index);
  // router.get('/send', controller.base.sendMqDlx);
};
