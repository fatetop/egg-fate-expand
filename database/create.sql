CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `phone` varchar(20) NOT NULL COMMENT '手机号码',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像地址',
  `status` tinyint(1) unsigned DEFAULT '1' COMMENT '1可用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `version` int(11) DEFAULT '0' COMMENT '本条记录操作的最新版本号',
  `del_flag` tinyint(1) unsigned DEFAULT '0' COMMENT '删除标记(0-否，1-是)',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_phone` (`phone`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='用户表(主表全部使用手机号码登陆，在各端有过绑定的使用对应的绑定信息)';

CREATE TABLE `pj_dic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dic_type_key` varchar(20) NOT NULL COMMENT '字典类型key',
  `dic_key` varchar(20) NOT NULL COMMENT '字典key',
  `dic_value` varchar(255) DEFAULT NULL COMMENT '字典值',
  `dic_desc` varchar(255) DEFAULT NULL COMMENT '字典描述',
  `status` tinyint(1) DEFAULT '1' COMMENT '是否启用，1启用，0停用',
  `auto_cache` tinyint(1) DEFAULT '1' COMMENT '是否项目自启缓存 1是 0否',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `version` int(11) DEFAULT '0' COMMENT '本条记录操作的最新版本号',
  `del_flag` tinyint(1) DEFAULT '0' COMMENT '删除标记(0-否，1-是)',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uni_dic_type_key_dic_key` (`dic_type_key`,`dic_key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='字典配置表';

INSERT INTO `dic` (`dic_type_key`, `dic_key`, `dic_value`, `dic_desc`, `status`, `auto_cache`) VALUES ('home', 'tips', '欢迎测试', '首页提示文案', 1, 1);

