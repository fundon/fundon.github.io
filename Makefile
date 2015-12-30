
build:
	rm -rf public
	hugo --theme=robots

publish: build
	git push master `git subtree push --prefix public origin master`:master --force

watch:
	hugo server --theme=robots --watch
