---
date: 2014-01-25
tags:
  - go
title: Install Go on Ubuntu
---

## Installation

```bash
VERSION="1.3.3"
wget http://golang.org/dl/go$VERSION.linux-amd64.tar.gz
tar -C /usr/local -xzf go$VERSION.linux-amd64.tar.gz

export PATH="$PATH:/usr/local/go/bin"

# You can custom `GOPATH`.
#export GOPATH=$HOME/dev/go
#export PATH="$PATH:$GOPATH/bin"
```
