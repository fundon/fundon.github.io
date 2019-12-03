+++
title = "10 Habits of a Happy Node Hacker 2016"
date = 2015-12-12T22:22:46+08:00
draft = false

[taxonomies]
tags = ["Translation", "Node", "NPM", "JavaScript"]
+++

原文：[10 Habits of a Happy Node Hacker (2016)][] by Hunter

在 2015 年底，JavaScript 开发者周边已经充斥了很多工具，供他们支配使用。
[上次][]我们已经观察了这个问题，现代 JS 的兴起。今天，我们很容易迷失在这巨大的生态系统中，
所以成功的团队都需要遵循指南，使他们的时间和项目保存健康。

这 10 个习惯很适合即将进入 2016 的 Node.js 黑客。
它们真对的是应用开发者，而不是模块作者，因为这些群体有不同的目标和约束：

## 1. 使用 `npm init` 开始每个新项目

NPM `init` 命令将为你的项目生成一个有效的 `package.json` 文件，
从工作目录中自动推到出一些常见属性。

```sh
$ mkdir my-awesome-app
$ cd my-awesome-app
$ npm init --yes
```

我比较懒，所以我使用了 `--yes` 标志去执行它，然后打开 package.json 做些修改。
第一件事你应该指定一个 `engines` 关键词，使用你当前的 node 版本（`node -v`）。

```json
"engines": {
  "node": "4.2.1"
}
```

## 2. 使用一个智能的 `.npmrc` 配置

默认地，npm 不会保存已经安装的依赖到 package.json（所以你总是需要追踪你的依赖！）。

如果你使用 `--save` 标志去自动更新 package.json，npm 安装这些包会以 `^` 开头，会导致你的
模块在不同版本之间漂移。这对模块开发没问题，但对应用不好，
如果你想要在所有的环境之间保持一致的依赖关系。

一个解决方案是像这样安装包：

```sh
$ npm install foobar --save --save-exact
```

更胜一筹的，你可以把这些选项添加到 `~/.npmrc` 中，更新你的默认设置：

```sh
$ npm config set save=true
$ npm config set save-exact=true
$ cat ~/.npmrc
```

现在，`npm install foobar` 将会自动添加 `foobar` 到 package.json
并且你的依赖不会在安装时产生偏移!

如果你更喜欢在 package.json 中保持弹性依赖，但仍然需要在生产环境中锁住依赖的话，你或者可以
生成 [npm's shrinkwrap][] 到你的工作流中。这需要花费更多的精力，但是还是很多好处的，保持
准确的版本的嵌套依赖关系。

## 3. 快跳上 ES6 火车吧！

Node 4+ 携带了一个 [V8 引擎的更新][]，拥有几个有用的 [ES6 特性][]。
不要害怕，并不是一些复杂的东西，你可以轻松学习它。有许多简单的改进，让人满意。

```js
let user = users.find(u => u.id === ID)

console.log(`Hello, ${user.name}!`)
```

## 4. 坚持使用小写

一些语言鼓励文件名匹配类名，比如 `MyClass` 和 `MyClass.js`。在 Node 中，
不要那样做。而是使用文件名小写的方式：

```js
let MyClass = require('my-class')
```

Node.js 是一个罕见的范例，Linux-centric 化工具，但跨平台支持又多。
当在 OSX 和 Windows 平台时，对待 `myclass.js` 和 `MyClass.js` 是一样的，
Linux 不会。如果要编写可在这些平台移植的代码，你就需要明确匹配 `require`
中的声明，包括大写。

一个简单正确的方式，就是一切都使用文件名小写的方式。例如 `my-class.js`。

> 译者：其实 Mac OSX 也可以设置文件系统 case-sensitive。

## 5. Cluster 你的应用

自从 node 运行时被限制在单核 CPU 和大约 1.5 GB 的内存之后，
部署一个无 clustered 模式的 node 应用在一个大型服务器上是一个对资源巨大的浪费。

要想利用多核和内存超过 1.5 GB 的话，把支持 [Cluster][] 烧尽你的应用。
即使如果今天你仅仅把单个进程运行在小硬件上，在未来 Cluster 也会带给你足够的灵活。

测试是最好的方式，弄清楚你的应用理想的 clustered 进程数，
但最好根据你的平台提出一个[合理的默认值][]，可以有个简单的备选。
比如：

```js
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1
```

选择一个 [Cluster abstraction][] 可以避免重复造（进程管理的）轮子。如果你喜欢分开
`master` 和 `worker` 文件，可以试试 [forky][]。 如果你更喜欢单个入口文件和函数的话，
看看这个 [throng][]。

## 6. 有环境意识

不要在你的项目中乱扔具体环境配置文件！而应该使用环境变量。

首选，安装 [node-foreman][]：

```sh
$ npm install --save --save-exact foreman
```

然后，创建一个 [Procfile][] 文件，声明你的应用的进程类型：

```
web: bin/web
worker: bin/worker
```

现在，你就可以使用 `nf` 程序启动你的应用

```json
"scripts": {
  "start": "nf start"
}
```

要支持本地开发环境，可以创建 `.gitignore` 文件，把 `.env` 文件加入进来。
使用 node-foreman 时，`.env` 文件将会被加载进来：

```sh
DATABASE_URL='postgres://localhost/foobar'
HTTP_TIMEOUT=10000
```

现在，一个简单的命令（`npm start`）将会使 `web` 和 `worker` 进程在那个环境下
同时运转起来。然后，当你部署你的项目时，它会在新的主机上自动适应这些环境变量。

比起 `config/abby-dev.js`、`config/brian-dev.js`，`config/qa1.js`、
`config/qa2.js`、`config/prod.js`，这个更加简单灵活。

## 7. 避免垃圾回收

Node（V8）使用一个懒惰、贪婪的垃圾回收。它默认被限制在大约 1.5 GB。
在回收无用内存前，它有时会等待，直到它彻底回收这些无用内存。如果你的内存使用不断增加，
它可能不是内存泄漏，反而是 [node 通常的懒惰行为][]。

要想对你应用的垃圾回收获得更多的控制，你可以在你的 `Procfile` 文件中给 V8 添加一些标志：

```
web: node --optimize_for_size --max_old_space_size=920 --gc_interval=100 server.js
```

这个尤其重要，如果你的应用是运行在一个少于 1.5 GB 内存的环境上。
例如，你想要把 node 调整到一个 512 MB 的容器上，试试这个：

```
web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 server.js
```

## 8. 把事情链接起来

Npm 的[生命周期脚本][] 可以为自动化创建丰富的钩子。如果你需要在构建你的应用之前运行一些东西，
你可以使用 `preinstall` 脚本。如果想使用 grunt、gulp、browserify 或者 webpack 构建
assets 呢？那就使用 `postinstall` 脚本。

在 package.json 中：

```json
"scripts": {
  "postinstall": "bower install && grunt build",
  "start": "nf start"
}
```

你也可以使用环境变量去控制这些脚本：

```json
"postinstall": "if $BUILD_ASSETS; then npm run build-assets; fi",
"build-assets": "bower install && grunt build"
```

如果你的脚本想在外面进行控制的话，把它们移到相应的文件：

```json
"postinstall": "scripts/postinstall.sh"
```

由于 `./node_modules/.bin` 会被自动添加到环境变量 `PATH` 上，在 package.json 中的脚本
会从上面去寻找，所以你可以直接执行它们，就像 `bower` 或者 `wepack`。

## 9. 仅 git 重要的部分

大多数的应用是由必要的文件和生成文件组成。当使用一个版本控制系统像 git 时，你应该避免对生成的
任何文件都进行追踪。

例如，你的 node 应用可能会有一个 `node_modules` 依赖目录，这个你应该[避免 git 控制][]。
只要每个依赖都列在 package.json 文件中，任何人都可以创建一个你的应用的工作副本，包括
`node_modules` － 在运行 `npm install` 后。

追踪这些生成文件，将会导致你的 git 历史充斥着无用的声音和臃肿。这是非常糟糕的，自从有些依赖是
原生并且需要被编译时，检查它们将使你的应用缺少便捷性，因为你将需要提供多个编译版本，
但却只从一个、可能是不正确的环境中生成。

同样的原因，你也不应该检查 `bower_components` 或者由 grunt 编译生成的 assets。

如果你之前已经不慎检查了 `node_modules` 目录，没关系，你可以删掉它，像这样：

```sh
$ echo 'node_modules' >> .gitignore
$ git rm -r --cached node_modules
$ git commit -am 'ignore node_modules'
```

我也忽略了 npm 的 logs 文件，所以它们不会搞乱我的代码：

```sh
$ echo 'npm-debug.log' >> .gitignore
$ git commit -am 'ignore npm-debug'
```

忽略了这些无用的文件，你的仓库将会更加的小，你的提交将会更加简单，
并且你将避免合并这些因生成目录而导致的分歧。

## 10. 简约

技术预测是不准确的，但我还是会预测下即将到来的一年，2016 将是 JavaScript 简化的一年。

越来越多的开发者正在简化它们的架构。为替换庞大的 MVCs 框架，他们正在使用[静态化的前端构建项目][]，
这样可以部署在 CDN 上，且使用一个 Node.js API 提供动态数据。

我们也开始看到了复杂的构建系统对我们项目的阻力。一些前沿的开发者正在简化他们的构建系统。例如，
使用一个 `vanilla` 构建系统，没有 [bower、gulp 或者 grunt][]。

最终，我们将简化我们的代码在 2016。有时，这来自删除功能，
就像 [Douglas Crockford's "The Better Parts"][]。
其他，这来自添加功能 － 就像我喜欢的 callback 的替代物 [async-await][]。
Async-await 在 Node 中还不能用，但今天你可以借助牛逼的 [Babeljs][] 项目使用它。

不要把看到那么多工具和框架一次性都挤进你的项目，试着去简化你的工作。

## 你的习惯是什么？

我试着在我的所有项目中遵从这些习惯。不管你是 [node 新人][]还是服务端 JS 老手，我确定你会为
自己开发一些技巧。我们非常欢迎听到它们！使用 [#node_habits][] 标签，分享你的习惯！

Happy hacking!

本文由 fundon 翻译，未经许可，不得转载。

[10 habits of a happy node hacker (2016)]: https://blog.heroku.com/archives/2015/11/10/node-habits-2016
[上次]: https://blog.heroku.com/archives/2014/3/11/node-habits
[v8 引擎的更新]: https://nodejs.org/en/blog/release/v4.0.0/
[es6 特性]: https://nodejs.org/en/docs/es6/
[npm's shrinkwrap]: https://docs.npmjs.com/cli/shrinkwrap
[node-foreman]: https://github.com/strongloop/node-foreman
[procfile]: https://devcenter.heroku.com/articles/procfile
[node 通常的懒惰行为]: https://github.com/nodejs/node/issues/3370#issuecomment-148108323
[cluster]: https://nodejs.org/api/cluster.html
[合理的默认值]: https://devcenter.heroku.com/articles/node-concurrency
[cluster abstraction]: https://www.npmjs.com/search?q=cluster
[forky]: https://www.npmjs.com/package/forky
[throng]: https://www.npmjs.com/package/throng
[生命周期脚本]: https://docs.npmjs.com/misc/scripts
[避免 git 控制]: https://docs.npmjs.com/misc/faq#should-i-check-my-node-modules-folder-into-git
[静态化的前端构建项目]: https://medium.com/swlh/scaling-on-the-cheap-933e46944886#.2lvubkyhm
[bower、gulp 或者 grunt]: https://medium.com/@tarkus/you-might-not-need-gulp-js-89a0220487dd#.etiox78kw
[douglas crockford's "the better parts"]: https://www.youtube.com/watch?v=bo36MrBfTk4
[async-await]: https://thomashunter.name/blog/the-long-road-to-asyncawait-in-javascript/
[babeljs]: http://babeljs.io/docs/usage/cli/#babel-node
[node 新人]: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
[#node_habits]: https://twitter.com/search?f=tweets&vertical=default&q=%23node_habits&src=typd
