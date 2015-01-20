
build:
	@ hugo --uglyUrls

publish: build
	@ git subtree push --prefix public origin master