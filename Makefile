BASE := /tuto_devops_slides/

DECKS := formation-dev formation-prod
OUT := dist/training

SLIDES := $(patsubst %,$(OUT)/%/index.html,$(DECKS))
PDFS := $(patsubst %,$(OUT)/%.pdf,$(DECKS))

all: build pdf

dev-dev:
	pnpm dev:dev

dev-prod:
	pnpm dev:prod

build: $(SLIDES)

dist/%/index.html: slides/%.md
	cd slides && pnpm slidev build --base $(BASE) --out ../$(OUT)/$* $<

pdf: $(PDFS)

dist/%.pdf: slides/%.md
	pnpm slidev export --output $@ $<

clean:
	rm -rf dist

.PHONY: all dev build pdf clean
