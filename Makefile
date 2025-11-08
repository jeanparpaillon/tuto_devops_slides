BASE := /tuto_devops_slides/

DECKS := formation-dev formation-prod
OUT := dist/
INDEX := $(OUT)/index.html

SLIDES := $(patsubst %,$(OUT)/%/index.html,$(DECKS))
PDFS := $(patsubst %,$(OUT)/%.pdf,$(DECKS))

all: build pdf

dev-dev:
	pnpm dev:dev

dev-prod:
	pnpm dev:prod

build: $(SLIDES) $(INDEX)

$(INDEX):
	cp static/index.html $@

$(OUT)/%/index.html: slides/%.md
	cd slides && pnpm slidev build --base $(BASE)/$*/ --out ../$(OUT)/$* $<

pdf: $(PDFS)

$(OUT)/%.pdf: slides/%.md
	pnpm slidev export --output $@ $<

clean:
	rm -rf dist

.PHONY: all dev build pdf clean
