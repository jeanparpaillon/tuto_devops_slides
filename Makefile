BASE := /tuto_devops_slides/
OUT_DIR := $(PWD)/dist
SLIDES_IN := slides/formation-dev.md slides/formation-prod.md
SLIDES_OUT := $(patsubst slides/%.md,$(OUT_DIR)/%/index.html,$(SLIDES_IN))
PDF_OUT := $(OUT_DIR)/formation-dev.pdf $(OUT_DIR)/formation-prod.pdf

all: build pdf

dev-dev:
	pnpm dev:dev

dev-prod:
	pnpm dev:prod

build: $(SLIDES_OUT)

$(OUT_DIR)/%/index.html: slides/%.md
	pnpm slidev build --base $(BASE) --out $(@D) $<

pdf: $(PDF_OUT)

$(OUT_DIR)/%.pdf: slides/%.md
	pnpm slidev export --output $(OUT_DIR) $<

clean:
	rm -rf $(OUT_DIR)

.PHONY: all dev build pdf clean