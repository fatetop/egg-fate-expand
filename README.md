# template
## 介绍
使用egg搭建一个基础框架，方便后期拓展使用

## 技术选型
- 核心框架：Koa + Egg
- ORM： Sequelize
- 会话管理: MD5 token
- Api风格：restful

## 基础环境
- Nodejs 12+
- Mysql 5.7+
- redis 6+

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ yarn install
$ yarn local
$ open http://localhost:8888/
```

### Deploy

```bash
# dev environment 
$ git clone [项目地址]
$ cd egg-template && sh publish.[re]start.[env].sh
```

[egg]: https://eggjs.org

## 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
