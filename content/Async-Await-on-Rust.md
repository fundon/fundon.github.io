+++
title = "Async-await on Rust"
date = 2019-11-29T08:00:00Z
description = "在异步世界中探索"

[taxonomies]
tags = ["Rust", "Web"]
+++

异步操作，对 **JavaScript** 开发者来说已经属于日常操作，家常便饭。
从 `Callback` 到 `Promise` 再到 `Async-await`，一路摆脱了 `Callback Hell`、`Promise Chain`，
`Async-await` 为工程开发带来了极大便利，简直是神兵利器。

**Rust** 在 **[1.39.0]** 稳定版中引入了期待已久的 `Async-await` 语法糖，这是一个伟大的里程碑，🦀 终于可以愉快地爬行了。

不管是 **JavaScript** 版还是 **Rust** 版本，两则在设计上还是很多相似之处，可以探索一番。

### JavaScript

- [AsyncFunction]：用来创建新的异步函数对象

- [Promise]：对象用于表示一个异步操作的最终完成 (或失败)，及其结果值

  - `pending`：初始状态，既不是成功，也不是失败状态
  - `fulfilled`：意味着操作成功完成
  - `rejected`：意味着操作失败

可以通过 `async function` 来声明一个 `AsyncFunction`，当执行这个 `AsyncFunction()` 时，
会返回一个 `Promise`，然后再执行 `await Promise` 操作，经过计算后，就可以获得最终结果。

```js
async function get() {
  return 'Hello Async-await'
}

async function main() {
  let result = await get()
  console.log(result)
}

main()
```

### Rust

- [Future]：用来表示一个异步计算

- [Poll]：类似 **JavaScript** 中的 `Promise`，它是一个枚举类型

  - `Ready<T>`：表示结果已经计算完毕，准备妥当，可以立刻返回
  - `Pending`：等待状态，任务进行中，还在计算，结果准备中

可以通过 `async fn`，声明一个异步方法，当执行这个异步方法 `fn()` 时，会返回一个 `Future`，然后在执行 `Future.await` 操作，
创建一个新任务，此时内部真正执行的是 `Future.poll()`，它会返回一个 `Poll`，经过计算后，就可以获得最终结果。

**注意**：如果一个异步方法有返回结果 `T`，则相应的，执行 `fn()` 时，返回的是 `Future<Outout = T>`。

```rust
use async_std::task;

async fn get() -> String {
    "Hello Async-await".to_owned()
}

fn main() {
    task::block_on(async {
        let result = get().await;
        println!("{}", result);
    });
}
```

### 总结

以上分析两种语言在 `Async-await` 的设计、执行流程，在实现上有很多相识之处，如果之前有 **JavaScript** 开发经验，则可以轻松地过渡到 **Rust** 中。

总之让我们 🦀 愉快的爬起来。

[1.39.0]: https://blog.rust-lang.org/2019/11/07/Rust-1.39.0.html
[asyncfunction]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
[promise]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
[future]: https://doc.rust-lang.org/std/future/trait.Future.html
[poll]: https://doc.rust-lang.org/beta/std/task/enum.Poll.html
