# template
## 介绍
使用egg搭建一个基础框架，方便后期拓展使用

## 技术选型
- 核心框架：[Koa][koa] + [Egg][egg]
- ORM： [Sequelize][sequelize]
- ParamsValidate: [Parameter][parameter]
- 会话管理: MD5 token
- Api风格: Restful
- 资源报警: 钉钉通知机器人
- 消息队列: [RabbitMq][rabbitMq]

## 基础环境
- Nodejs 12+
- Mysql 5.7+
- Redis 6+
- Erlang 23+
- RabbitMq 3.8.14+

## 项目架构

```bash
├── LICENSE
├── README.md
├── agent.js
├── app
│   ├── controller
│   │   ├── base.js
│   │   └── home
│   │       └── home.js
│   ├── extend
│   │   └── application.js
│   ├── middleware
│   │   └── error_handler.js
│   ├── model
│   │   ├── dic.js
│   │   └── user.js
│   ├── public
│   ├── router.js
│   ├── schedule
│   │   └── checkUserNum.js
│   ├── service
│   │   ├── base.js
│   │   ├── dic
│   │   │   └── dic.js
│   │   ├── home
│   │   │   └── home.js
│   │   ├── mq
│   │   │   └── consume.js
│   │   └── utils
│   │       ├── alarm.js
│   │       ├── redis.js
│   │       └── schedule.js
│   └── utils
│       ├── InviteCode.js
│       ├── errorInfo.js
│       ├── index.js
│       ├── rabbitMq
│       │   ├── dlx
│       │   │   ├── consume.js
│       │   │   └── producer.js
│       │   └── xDelayed
│       └── tHelper
│           └── index.js
├── app.js
├── appveyor.yml
├── config
│   ├── config.beta.js
│   ├── config.default.js
│   ├── config.dev.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── config.sit.js
│   └── plugin.js
├── database
│   ├── create.sql
│   ├── createTable.js
│   └── index.js
├── jsconfig.json
├── logs
│   ├── common-error.json.log
│   ├── common-error.log
│   ├── egg-agent.json.log
│   ├── egg-agent.log
│   ├── egg-schedule.json.log
│   ├── egg-schedule.log
│   ├── egg-web.json.log
│   ├── egg-web.log
│   ├── template-web.json.log
│   └── template-web.log
├── package.json
├── publish.restart.beta.sh
├── publish.restart.dev.sh
├── publish.restart.prod.sh
├── publish.restart.test.sh
├── publish.start.beta.sh
├── publish.start.dev.sh
├── publish.start.prod.sh
├── publish.start.test.sh
├── test
│   └── app
│       └── controller
│           └── home.test.js
└── yarn.lock
```

## QuickStart
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
$ cd egg-fate-expand && sh publish.[re]start.[env].sh
```

[koa]: https://koa.bootcss.com/
[egg]: https://eggjs.org
[sequelize]: https://sequelize.org/master
[parameter]: https://github.com/node-modules/parameter
[rabbitMq]: https://www.rabbitmq.com/

## 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
