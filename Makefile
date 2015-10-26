
build:
	rm -rf public
	hugo -t robots

publish: build
	git subtree push --prefix public origin master

watch:
	hugo server -t robots -w
