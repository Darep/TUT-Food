#!/bin/sh

cd src
grunt
cd ..

rm -rf _dist

mkdir -p _dist/js/lib

cp -a css _dist/
cp -a img _dist/
cp -a templates _dist/
cp -a views _dist/

cp js/lib/modernizr.custom.34167.js _dist/js/lib/modernizr.custom.34167.js
cp js/cache.js _dist/js/
cp js/main.* _dist/js/
cp cache.manifest _dist/
cp api.php _dist/
cp index.php _dist/

sed -i '' -e "s/DEBUG', true/DEBUG', false/g" _dist/index.php
sed -i '' -e "s/%date%/`date +%s`/g" _dist/cache.manifest

ls -R1 _dist
