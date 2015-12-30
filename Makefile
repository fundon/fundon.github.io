
build:
	rm -rf public
	hugo --theme=robots

publish: build
	git subtree push --prefix public origin master

watch:
	hugo server --theme=robots --watch
