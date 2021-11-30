module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT, literal } = app.Sequelize;

  const Model = app.model.define('dic', {
    id: {
      autoIncrement: true,
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    dicTypeKey: {
      type: STRING(20),
      allowNull: false,
      comment: '字典类型key',
      field: 'dic_type_key',
    },
    dicKey: {
      type: STRING(20),
      allowNull: false,
      comment: '字典key',
      field: 'dic_key',
    },
    dicValue: {
      type: STRING(255),
      allowNull: true,
      comment: '字典值',
      field: 'dic_value',
    },
    dicDesc: {
      type: STRING(255),
      allowNull: true,
      comment: '字典描述',
      field: 'dic_desc',
    },
    status: {
      type: TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      comment: '是否启用，1启用，0停用',
    },
    autoCache: {
      type: TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      comment: '是否项目自启缓存 1是 0否',
      field: 'auto_cache',
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
    tableName: 'dic',
    timestamps: false,
  });

  Model.associate = function() {

  };

  return Model;
};
