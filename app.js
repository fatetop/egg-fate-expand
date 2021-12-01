module.exports = app => {
  app.messenger.on('egg-ready', () => {
    app.logger.info('all worker is ready', process.pid);
  });

};
