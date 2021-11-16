
const tHelper = require('./tHelper');
exports.tHelper = tHelper;

/**
 * 四舍五入保留指定位数的数字
 * @param {number} num 数字
 * @param {boolean} isNeedAccurate 需不需要精确
 * @param {number} prefix 保留几位小数
 * @return {number} 保留小数位后的数
 */
exports.transferNumber = function(num, isNeedAccurate = false, prefix = 0) {
  if (num == null || num === undefined) {
    return 0;
  }
  if (!isNeedAccurate) {
    return Number((num).toFixed(prefix));
  }
  const base = 10 ** prefix;
  return Math.round(num * base) / base;
};

/**
 * 获取传入值类型 未预先定义的为 ‘’
 * @param {any} obj 需要判断的入参
 * @return {string} 类型值
 */
exports.typeObj = obj => {
  const typeMap = {
    '[object Array]': 'Array',
    '[object Object]': 'Object',
    '[object String]': 'String',
    '[object Number]': 'Number',
  };
  const typeStr = Object.prototype.toString.call(obj);
  return typeMap[typeStr] || '';
};

/**
 * 创建昵称
 * @return {string} 昵称
 */
exports.createNickname = () => `用户_${this.getRandomByNumber(6)}`;

/**
 * 获取指定位数的随机数字字符串
 * @param {number} num 指定位数 默认值是4
 * @return {string} 数字字符串
 */
exports.getRandomByNumber = (num = 4) => {
  if (num < 1) return '';
  if (this.typeObj(num) !== 'Number') return '';
  return (Math.floor(Math.random() * (10 ** (num - 1)) + (10 ** (num - 1)))).toString();
};

