#!/bin/sh
expo export -p web
mv dist/assets/node_modules/* dist/assets/
case $(uname -s) in
Darwin)
  find dist/_expo/static/js/web/ -type f -print0 | xargs -0 sed -i '' 's/assets\/node_modules/assets/g'
  ;;
*)
  find dist/_expo/static/js/web/ -type f -print0 | xargs -0 sed -i 's/assets\/node_modules/assets/g'
  ;;
esac

