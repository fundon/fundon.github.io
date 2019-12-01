+++
title = "Async-await on Rust"
date = 2019-11-29T08:00:00Z
description = "在异步世界中探索"

[taxonomies]
tags = ["Rust", "Web"]
+++

```rust
async fn another_function() {
    // Create the future:
    let future = first_function();

    // Await the future, which will execute it (and suspend
    // this function if we encounter a need to wait for I/O):
    let result: u32 = future.await;
    ...
}
```
