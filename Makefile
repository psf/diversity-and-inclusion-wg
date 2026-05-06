.PHONY: help build serve publish clean

help:
	@echo "Targets: build, serve, publish, clean"

build:
	uv run pelican content -o output -s pelicanconf.py

serve:
	uv run pelican --autoreload --listen content -o output -s pelicanconf.py

publish:
	uv run pelican content -o output -s publishconf.py

clean:
	rm -rf output
