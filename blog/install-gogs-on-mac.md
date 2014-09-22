---
date: 2014090222352
tags: gogs, git
---

Install Gogs on Mac OS X
-------------------------

## Dependences

* [homebrew][]
* [git][]
* [postgresql][]
* [go][]
* [gopm][]

## Installation

### Homebrew

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### git

```sh
brew install git
```

### postgresql

```sh
brew install postgresql
```

### go

```
brew install go
```

### gopm

```
go get -u github.com/gpmgo/gopm
```

### gogs
Build from dev source.

```sh
go get -u github.com/gogits/gogs
mkdir -p ~/services && cd ~/services
git clone --branch=dev file:///$GOPATH/src/github.com/gogits/gogs
cd gogs
gopm build
```


## Configuration

### postgresql

#### Init postgresql
```sh
createdb
psql --command "CREATE USER root WITH SUPERUSER PASSWORD 'THE_DB_PASSWORD';"
createdb -O root gogs
```

#### Start postgresql server

```sh
cp /usr/local/opt/postgresql/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

Or just run

```sh
postgres -D /usr/local/var/postgres
```

### gogs

#### conf/app.ini

You can add git user or use currently login user.
If you want to add git user to run gogs, see http://wiki.freegeek.org/index.php/Mac_OSX_adduser_script.

```
...

RUN_USER = git

...

[database]
DB_TYPE = postgres
HOST = 127.0.0.1:5432

...

[security]
INSTALL_LOCK = true
SECRET_KEY = YOU_MUST_CHANGE

...
```

## Run gogs server

```
cd ~/services/gogs
./gogs web
# open 127.0.0.0:3000
```

## <3 Enjoy!

## Other

* http://gogs.io/docs/intro/



[Homebrew]: http://brew.sh
[git]: http://git-scm.com
[postgresql]: http://www.postgresql.org
[gogs]: http://gogs.io
[gopm]: http://gopm.io
