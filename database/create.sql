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