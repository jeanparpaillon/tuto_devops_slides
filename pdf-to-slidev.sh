#!/usr/bin/env bash
PDF="$1"
BASE=$(basename "$PDF" .pdf)

IMG_OUTDIR="slides/public/pdf-slides"
mkdir -p $IMG_OUTDIR

MD_DIR="slides/pdf"
mkdir -p $MD_DIR

# Convert to png
pdftoppm -png "$PDF" $IMG_OUTDIR/$BASE-page

# Generate markdown fragments
echo "" > $MD_DIR/$BASE-slides.md
for img in $IMG_OUTDIR/$BASE-page*.png
do
path=$(realpath --relative-to=slides/public "$img")
echo "Processing $path"
  cat >> $MD_DIR/$BASE-slides.md <<EOF
---
layout: image
image: /$path
backgroundSize: contain
backgroundPosition: center
---

EOF
done

echo "Generated slides/pdf/$BASE-slides.md"