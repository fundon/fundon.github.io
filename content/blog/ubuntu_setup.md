---
date: 2015-01-21
title: Ubuntu Setup
---

## Update & Upgrade

```
$ sudo apt-get update
$ sudo apt-get upgrade
```


## Add User

```
# adduser fundon
# usermod fundon -G sudo
```


## Package Search and Show Package Info

```
$ apt-cache search golang
$ aptitude search golang
$ aptitude show golang
```


## Packages Install

### Git

```
$ sudo apt-get install git
```

### Golang

```
$ sudo apt-get install golang
```

### Docker

```
$ sudo apt-get install docker.io
$ sudo ln -sf /usr/bin/docker.io /usr/local/bin/docker
```

## Node.js

### PPA

https://launchpad.net/~chris-lea/+archive/node.js

### Source

```
$ sudo apt-get install build-essential
$ sudo apt-get install libssl-dev
$
$ sudo su fundon
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ echo 'source ~/.nvm/nvm.sh' >> ~/.bashrc
$ nvm install -s 0.10.29
$ nvm install -s 0.11.13
```