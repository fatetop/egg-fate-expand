module.exports = agent => {

  agent.messenger.on('egg-ready', async () => {
    agent.logger.info('agent is ready');
  });

};
