#!/bin/sh
expo export -p web
mv dist/assets/node_modules/* dist/assets/
find dist/_expo/static/js/web/ -type f -print0 | xargs -0 sed -i .bak 's/assets\/node_modules/assets/g'