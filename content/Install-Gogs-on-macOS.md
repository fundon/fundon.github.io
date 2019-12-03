+++
title = "Install Gogs on macOS"
date = 2014-10-10

[taxonomies]
tags = ["Git", "Go"]
+++

## Dependences

- [homebrew][]
- [git][]
- [postgresql][]
- [go][]
- [gopm][]

## Installation

### Homebrew

```bash
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### git

```bash
$ brew install git
```

### postgresql

```bash
$ brew install postgresql
```

### go

```bash
$ brew install go
```

### gopm

```bash
$ go get -u github.com/gpmgo/gopm
```

### gogs

Build from dev source.

```bash
$ go get -u github.com/gogits/gogs
$ mkdir -p ~/services && cd ~/services
$ git clone --branch=dev file:///$GOPATH/src/github.com/gogits/gogs
$ cd gogs
$ gopm build
```

## Configuration

### postgresql

#### Init postgresql

```bash
$ createdb
$ psql --command "CREATE USER root WITH SUPERUSER PASSWORD 'THE_DB_PASSWORD';"
$ createdb -O root gogs
```

#### Start postgresql server

```bash
$ cp /usr/local/opt/postgresql/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

Or just run

```bash
$ postgres -D /usr/local/var/postgres
```

### gogs

#### custom/conf/app.ini

You can add git user or use currently logged in user.  
If you want to add git user to run gogs.  
See http://wiki.freegeek.org/index.php/Mac_OSX_adduser_script.

```bash
$ # Create custom folder
$ mkdir -p custom/conf
$ cp conf/app.ini custom/conf
```

```ini
...

RUN_USER = git

[server]
SSH_PORT = 22

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

```bash
$ cd ~/services/gogs
$ ./gogs web
$ # open 127.0.0.0:3000
```

Or add launchd plist file to `~/Library/LaunchAgents/io.gogs.web.plist`

```markup
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>io.gogs.web</string>
  <key>ProgramArguments</key>
  <array>
    <string>sh</string>
    <string>-c</string>
    <string>cd /Users/fundon/services/gogs; ./gogs web</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>WorkingDirectory</key>
  <string>/Users/fundon/services/gogs</string>
</dict>
</plist>
```

```bash
$ launchctl load ~/Library/LaunchAgents/io.gogs.web.plist
```

## SSH Remote

### Setting SSH config `/etc/sshd_config`

```bash
$ sudo cp /etc/sshd_config /etc/sshd_config~previous
$ sudo vi /etc/sshd_config
```

Edit `/etc/sshd_config`

```ini
PermitRootLogin no

RSAAuthentication yes
PubkeyAuthentication yes

UsePAM no
```

### Start SSH Server

```
Open System Preferences > Sharing > Remote Login
```

### Other SSH Articles

https://help.github.com/categories/ssh/

## <3 Enjoy!

## Other

- http://gogs.io/docs/intro/

[homebrew]: http://brew.sh
[git]: http://git-scm.com
[postgresql]: http://www.postgresql.org
[gogs]: http://gogs.io
[gopm]: http://gopm.io
[go]: http://golang.org
