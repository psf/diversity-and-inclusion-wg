.PHONY: help build serve publish clean css lint format precommit

TAILWIND_BIN := .bin/tailwindcss

help:
	@echo "Targets: build, serve, publish, clean, css, lint, format, precommit"

$(TAILWIND_BIN):
	./scripts/install-tailwindcss.sh

css: $(TAILWIND_BIN)
	$(TAILWIND_BIN) -i theme/tailwind.input.css -o theme/static/css/tailwind.css --minify

build: css
	uv run pelican content -o output -s pelicanconf.py

serve: css
	uv run pelican --autoreload --listen content -o output -s pelicanconf.py

publish: css
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
