
build:
	rm -rf public
	hugo -t NexT

publish: build
	git subtree push --prefix public origin master

watch:
	hugo server -t NexT -w