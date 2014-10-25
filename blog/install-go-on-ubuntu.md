---
date: 201401025
tags: go
---

Install Go on Ubuntu
-------------------------


## Installation

```sh
VERSION="1.3.3"
wget http://golang.org/dl/go$VERSION.linux-amd64.tar.gz
tar -C /usr/local -xzf go$VERSION.linux-amd64.tar.gz

export PATH="$PATH:/usr/local/go/bin"

# You can custom `GOPATH`.
#export GOPATH=$HOME/dev/go
#export PATH="$PATH:$GOPATH/bin"
```
