const exec = require('child_process').exec;

module.exports = class CreateModel {
  /**
   * 创建model
   * @param {string} table 表名
   * @param {'origin' | 'egg'} type 创建类型 默认origin
   */
  constructor(table, type = 'origin') {
    this.tableName = table;
    this.host = '';
    this.database = '';
    this.username = '';
    this.password = '';
    this.folder = '"./app/model"';
    this.port = '';
    this.init(type);
  }

  /**
   * 创建model
   * @param {'origin' | 'egg'} type 创建类型
   */
  async init(type) {
    const tableName = this.tableName || '';
    if (!tableName) throw new Error('tableName is not invalid');
    exec(`${type === 'egg' ? 'egg-' : ''}sequelize-auto -h ${this.host} -d ${this.database} -u ${this.username} -x ${this.password} -p ${this.port} -o ${this.folder} -t ${tableName}`, function(err, stdout, stderr) {
      if (err) {
        console.log('get weather api error:' + stderr);
      } else {
        // 这个stdout的内容就是上面我curl出来的这个东西：
        // console.log('stdout', stdout);
        console.log(`${tableName} model文件生成成功`);
      }
    });
  }
};

