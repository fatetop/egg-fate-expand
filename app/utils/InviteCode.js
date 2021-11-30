/**
 * 生成邀请码
 * @author fate
 * @example 举例引入 import InviteCode from './InviteCode';
 * @example console.log(new InviteCode(2).id2ShareCode(0));
 * console.log(new InviteCode(2).shareCode2id('QU9RT47'));
 * @example console.log(new InviteCode(2).id2ShareCode(100));
 * console.log(new InviteCode(2).shareCode2id('89U4LEZ'));
 * @example console.log(new InviteCode(2).id2ShareCode(99992999));
 * console.log(new InviteCode(2).shareCode2id('A8PPXGU'));
 * @example console.log(new InviteCode(2).id2ShareCode(99992999999));
 * console.log(new InviteCode(2).shareCode2id('AMABAPXG'));
 */
class InviteCode {
  /**
   * 构造
   * @param {number} type 类型 1 纯数字 2 混合
   */
  constructor(type = 1) {

    if (![ 1, 2 ].includes(type)) throw ('type must be among 1,2');

    /**
     * 默认码长度配置
     */
    this.MIN_CODE_LENGTH = 7;

    /**
     * 位数不足时，充当分隔，该字段为保持唯一性，不放入下方的列表
     **/
    this.NUM_STOP_CHAR = '0';

    /**
     * 纯数字的随机码生成库
     */
    this.NUM_CHARS = [ '3', '2', '1', '6', '5', '3', '9', '8', '7' ];

    /**
     * 位数不足时，充当分隔，该字段为保持唯一性，不放入下方的列表
     **/
    this.MIX_STOP_CHAR = 'U';

    /**
     * 混合数字字符的随机码生成库
     */
    this.MIX_CHARS = [ 'D', 'Z', 'X', '9', '2', 'C', '7', 'V', 'Y', 'Q', 'W', '8', 'E', 'A', 'S', 'L', 'G', 'M', 'J', 'F', 'T', 'N', '6', 'B', 'R', '4', 'P', '5', 'K', '3', 'H' ];

    this.init(type);
  }

  /**
   * 初始化模式
   * @param {number} type 类型 1 纯数字 2 混合
   */
  init(type) {
    if (type === 2) {
      this.STOP_CHAR = this.MIX_STOP_CHAR;
      this.CHARS = this.MIX_CHARS;
      this.OFFSET = this.MIX_CHARS.length - 1;
    } else {
      this.STOP_CHAR = this.NUM_STOP_CHAR;
      this.CHARS = this.NUM_CHARS;
      this.OFFSET = this.NUM_CHARS.length - 1;
    }
  }

  /**
   * 根据 id 生成邀请码
   * 如果是 6 位的邀请码只能支持 754137930 7亿5千万用户, 超出的id 会成为7位甚至更长的邀请码
   * @param {number} id 用户id 整数
   * @param {number} codeMinLength 邀请码最小位数
   * @return {string} 邀请码字符串
   */
  id2ShareCode(id, codeMinLength) {
    if (codeMinLength == null) {
      codeMinLength = this.MIN_CODE_LENGTH;
    }
    let code = this.int2chars(id);
    const tailLength = codeMinLength - code.length;
    if (tailLength > 1) {
      // 位数不够时补长
      code = code + this.STOP_CHAR + this.codeTail(tailLength - 1);
    } else if (tailLength === 1) {
      code = code + this.STOP_CHAR;
    }
    return code;
  }

  /**
   * 获取补长的邀请码（随机）
   * @param {number} len 需要的长度
   * @return {string} 获取补长的邀请码（随机）
   */
  codeTail(len) {
    const res = [];
    for (let i = 0; i < len; i++) {
      res.push(this.CHARS[Math.floor(Math.random() * this.OFFSET)]);
    }
    return res.join('');
  }

  /**
   * int转字符串
   * @param {number} id 整数
   * @return {string} 字符串
   */
  int2chars(id) {
    const x = id / this.OFFSET;
    const remainder = id % this.OFFSET;
    if (x === 0) {
      return this.CHARS[id];
    } else if (x < this.OFFSET) {
      return this.CHARS[parseInt(x)] + this.CHARS[parseInt(remainder)];
    }
    return this.int2chars(x) + this.CHARS[parseInt(remainder)];
  }

  /**
   * 根据邀请码 获取 id
   * @param {string} code 邀请码
   * @return {number} 用户id
   */
  shareCode2id(code) {
    // 查看有没有隔离字符
    const inx = code.indexOf(this.STOP_CHAR);
    if (inx > 0) {
      code = code.substring(0, inx);
    }
    // 去除隔离符后的真实code
    return this.chars2int(code);
  }

  chars2int(chars) {
    let res = 0;
    const codeLen = chars.length;
    const totalCharsList = [ ...this.CHARS ];

    for (let i = 0; i < codeLen; i++) {
      const a = chars.substring(i, i + 1);
      if (this.STOP_CHAR === a) {
        break;
      }
      if (totalCharsList.includes(a)) {
        res = res * this.OFFSET + totalCharsList.indexOf(a);
      } else {
        res = 0;
        break;
      }
    }
    return res;
  }
}

// module.exports = InviteCode;
exports.InviteCode = InviteCode;
