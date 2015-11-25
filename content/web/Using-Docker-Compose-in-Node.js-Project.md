---
date: 2015-11-26T02:42:34+08:00
draft: false
title: Using Docker Compose in Node.js Project
tags:
  - docker
  - docker-compose
  - node
---

[Published on Medium](https://medium.com/@fundon/using-docker-compose-in-node-js-project-65081953ce62#.3h17cxx5v).


### Docker 到底有什么优点吸引我们？

* **Build**：允许自由组合各种服务来构建我们的应用，避免**开发**和**生产**之间的环境问题，并且不局限在任何平台和语言
* **Ship**：通过统一的用户接口，管理，设计应用开发、测试、发布的生命周期
* **Run**：可以快捷地在多个平台，发布可扩展、安全、可靠的服务


### Use it!

说了这么多，那就让我们玩起来！

#### 0. Install [Docker][] Tools


```sh
$ brew install docker docker-machine docker-compose
$ docker help
```

* [Docker] - 开源的容器应用引擎

* [Machine] - 管理本地、云服务提供商中的 Docker 服务

* [Compose] - 定义，组合，运行多个容器应用

**NOTE**:

* 如果是 Mac OS X 用户，请先安装 Virtualbox `brew cask install virtualbox`。
* 如果不喜欢 Docker CLI 工具，也可以安装 [Kitematic][]，Kitematic 是 Docker 的 GUI 管理工具。


#### 1. Create Node.js Project

```sh
$ mkdir docker-express-mongoose-reis-example
$ cd docker-express-mongoose-redis-example
$ npm init
$ npm i express express-session connect-redis ioredis mongoose --save
$ touch server.js 
```

***server.js***
```javascript
// Import modules
const express = require('express')
const session = require('express-session')
const ioredis = require('ioredis')
const RedisStore = require('connect-redis')(session)
const mongoose = require('mongoose')

// Create App
const app = express()

// Redis Client
const client = ioredis.createClient(6379, process.env.REDIS_PORT_6379_TCP_ADDR)

// Compose Schema
const ComposeSchema = new mongoose.Schema({
  name:  String,
  build: String,
  ports: [String]
})

// Compose Model
const Compose = mongoose.model('Compose', ComposeSchema) 

// Create Session
app.use(session({
  store: new RedisStore({ client }),
  secret: 'Dream'
}))

// Routes for redis
app.get('/redis', (req, res) => {
  res.send('Redis is live!')
})
app.get('/redis/set', (req, res) => {
  client.set('key', 'Redis is live!');
  res.send(`It's redis.`)
})
app.get('/redis/get', (req, res) => {
  client.get('key').then(result => {
    res.send(result || 'Nothing!')
  })
})

// Routes for redis
app.get('/mongoose', (req, res) => {
  res.send('Mongoose is live!')
})
app.get('/mongoose/set', (req, res) => {
  var c = new Compose({
    name: 'docker',
    build: '.',
    ports: ['3000:3000']
  })

  c.save().then(() => {
      res.send(`It's mongoose.`);
    })
})
app.get('/mongoose/get', (req, res) => {
  Compose
    .find({ name: 'docker' })
    .then((result) => {
      res.send(result)
    })
})

app.use((req, res) => {
  res.send('Hello Docker, Express, Mongoose, Redis!')
})

mongoose.connect(`mongodb://${process.env.MONGO_PORT_27017_TCP_ADDR}`, (err) => {
  if (err) throw err

  // Start App
  app.listen(process.env.PORT || 3000)
})
```

***package.json***
```js
{
  "name": "docker-express-mongoose-redis-example",
  "private": true,
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "connect-redis": "^3.0.1",
    "express": "^4.13.3",
    "express-session": "^1.11.3",
    "ioredis": "^1.9.1",
    "mongoose": "^4.2.0"
  }
}
```

#### 2. [Machine][]：在 virtualbox 中创建 Docker Host

```sh
$ # 查看命令行帮助
$ docker-machine
$ # 创建 Docker Host
$ docker-machine create -d virtualbox dev
$ # 启动
$ docker-machine start dev
$ # 查看 dev IP
$ docker-machine ip dev
$ # 查看 dev 环境变量
$ docker-machine env dev
$ # 设置环境变量
$ eval "$(docker-machine env dev)"
```


#### 3. [Compose][]：定义及操作

##### 为项目创建 [Dockerfile][]

```sh
$ cd docker-express-mongoose-redis-example
$ touch Dockerfile
```

***Dockerfile***
```Dockerfile
FROM mhart/alpine-node
# FROM mhart/alpine-node:base
# FROM mhart/alpine-node:base-0.10

WORKDIR /src
ADD . .

# If you have native dependencies, you'll need extra tools
RUN apk add --update make gcc g++ python

# If you need npm, don't use a base tag
RUN npm install

# If you had native dependencies you can now remove build tools
RUN apk del make gcc g++ python && \
  rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

EXPOSE 3000
CMD ["npm", "start"]
```


##### 创建 [docker-compose.yml][] 来组合 Node.js, Redis, Mongodb 服务

```sh
$ cd docker-express-mongoose-redis-example
$ touch docker-compose.yml
```

***Dockerfile***
```yaml
app:
  build: .
  volumes:
    - .:/src
  links:
    - mongo
    - redis
  ports:
    - 3000:3000

redis:
  image: redis

mongo:
  image: mongo
```

```sh
$ # 查看命令行帮助
$ docker-compose
$ # 创建
$ docker-compose build
$ # 启动 app, redis, mongo 等服务，特点是常驻前台
$ docker-compose up
$ # 也可以通过 `start` 启动，特点是常驻在后台
$ docker-compose start
$ # 停止服务
$ docker-compose stop
$ # 输出日志
$ docker-compose logs
```


##### 测试、访问我们的服务 :rocket:

```sh
$ open "http://$(docker-machine ip dev):3000"
$ open "http://$(docker-machine ip dev):3000/redis"
$ open "http://$(docker-machine ip dev):3000/redis/set"
$ open "http://$(docker-machine ip dev):3000/redis/get"
$ open "http://$(docker-machine ip dev):3000/mongoose"
$ open "http://$(docker-machine ip dev):3000/mongoose/set"
$ open "http://$(docker-machine ip dev):3000/mongoose/get"
```


#### 关闭服务，休息下

```sh
$ docker-compose stop
$ docker-machine stop dev
```


**NOTE**:

* Compose 的前身是 __fig__。

* `up` `start` `logs` `stop` `rm` 等 COMMANDs 可以针对某个 Container 使用 e.g: `$ docker-compose logs app`

* **如果 Node 项目比较大，依赖的模块较多，频繁改动，我们可以不需要创建 Node 项目本身的 Container，只需要创建启动其他服务即可。**


### 其他工具

* [Vargant][] - 也是一款环境构建工具，比 Docker 还早 

Vargant 是一款不错的工具，可以帮助我们快速搭建各种服务环境，也能团队之间进行分享，现在基于它的工具链也越来越丰富，感兴趣也可以一试。

* 不用其他构建工具，我们自己搭

“自己动手，丰衣足食” － 不依赖环境构建工具，自己搭，时间精力充足的化，不妨一试，会收获更多。


### 最后


Docker 可玩的不仅仅如此，还可以打包、发布容器应用到线上，构建自己的 Paas([dokku][]) 服务等。

Docker Compose 也可以有更高级玩法。

Enjoy!

```javascript
{
  github: '@fundon',
  email: 'cfddream#gmail.com',
  twitter: '@_fundon'
}
```

### Relates

* https://docs.docker.com/kitematic/
* https://docs.docker.com/installation/mac/
* https://docs.docker.com/machine/install-machine/
* https://docs.docker.com/compose/install/
* https://github.com/mhart/alpine-node
* https://github.com/progrium/dokku

[Docker]: https://docs.docker.com
[Machine]: https://docs.docker.com/machine/
[Compose]: https://docs.docker.com/compose/
[Kitematic]: https://docs.docker.com/kitematic/
[Vargant]: https://www.vagrantup.com
[Dockerfile]: https://docs.docker.com/reference/builder/
[docker-compose.yml]: https://docs.docker.com/compose/yml
[dokku]: https://github.com/progrium/dokku

