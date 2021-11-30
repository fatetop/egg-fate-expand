const BaseService = require('../base');

class SConfigService extends BaseService {

  /**
   * 获取dic缓存key
   * @param {string} dicTypeKey dic类型
   * @param {string} dicKey dic key
   * @return {string} dic缓存key
   */
  getDicCacheKey(dicTypeKey, dicKey) {
    return `dic_${dicTypeKey}_${dicKey}`;
  }

  /**
   * 项目初始化需要缓存的dic配置
   * @return {Promise<void>} 无返回值
   */
  async initProject() {
    const { ctx, service, config } = this;
    const dicList = await ctx.model.Dic.findAll({ where: { status: 1, autoCache: 1 } });
    if (dicList.length > 0) {
      // 缓存
      // eslint-disable-next-line array-callback-return
      dicList.map(item => {
        service.utils.redis.set(this.getDicCacheKey(item.dicTypeKey, item.dicKey), item.dicValue, config.redis.expireTimeOut.DIC_CONFIG_DEF);
      });
    }
  }

  /**
   * 获取dic配置表信息
   * @param {string} dicTypeKey dic类型
   * @param {string} dicKey dic key
   * @param {boolean} isNeedCache 是否需要缓存 默认true
   * @return {Promise<string>} 缓存值
   */
  async getDicValueByTypeAndKey(dicTypeKey, dicKey, isNeedCache = true) {
    const { ctx, service, config } = this;
    const cacheName = this.getDicCacheKey(dicTypeKey, dicKey);
    // 优先检查缓存有无
    const cacheData = await service.utils.redis.get(cacheName);
    if (cacheData) return cacheData;

    // 查询数据
    const dicData = await ctx.model.Dic.findOne({ where: { dicTypeKey, dicKey, status: 1 } });
    if (!dicData.id) {
      // 无此配置
      // 设置短时缓存
      await service.utils.redis.set(cacheName, '', config.redis.expireTimeOut.DIC_CONFIG_NOT_EXISTS_SHORT);
      return '';
    }
    // 存在数据
    // 设置有效缓存
    isNeedCache && await service.utils.redis.set(cacheName, dicData.dicValue, config.redis.expireTimeOut.DIC_CONFIG_DEF);
    return dicData.dicValue;
  }

}

module.exports = SConfigService;
