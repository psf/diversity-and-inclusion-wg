.PHONY: help build serve publish clean lint format precommit

help:
	@echo "Targets: build, serve, publish, clean, lint, format, precommit"

build:
	uv run pelican content -o output -s pelicanconf.py

serve:
	uv run pelican --autoreload --listen content -o output -s pelicanconf.py

publish:
	uv run pelican content -o output -s publishconf.py

clean:
	rm -rf output

lint:
	uv run ruff check .
	uv run ruff format --check .

format:
	uv run ruff check --fix .
	uv run ruff format .

precommit:
	prek run --all-files
