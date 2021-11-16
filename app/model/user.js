module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT, literal } = app.Sequelize;

  const Model = app.model.define('user', {
    id: {
      autoIncrement: true,
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: STRING(50),
      allowNull: true,
      comment: '昵称',
    },
    phone: {
      type: STRING(20),
      allowNull: false,
      comment: '手机号码',
    },
    avatar: {
      type: STRING(100),
      allowNull: true,
      comment: '头像地址',
    },
    status: {
      type: TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      comment: '1可用',
    },
    createTime: {
      type: DATE,
      allowNull: true,
      defaultValue: literal('CURRENT_TIMESTAMP'),
      field: 'create_time',
    },
    updateTime: {
      type: DATE,
      allowNull: true,
      defaultValue: literal('CURRENT_TIMESTAMP'),
      field: 'update_time',
    },
    version: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '本条记录操作的最新版本号',
    },
    delFlag: {
      type: TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      comment: '删除标记(0-否，1-是)',
      field: 'del_flag',
    },
  }, {
    tableName: 'user',
    timestamps: false,
  });

  Model.associate = function() {

  };

  return Model;
};
