#!/bin/sh

# Setup env file
echo "EXPO_PUBLIC_TUMBLR_API_END_POINT=$TUMBLR_API_END_POINT" > .env
echo "EXPO_PUBLIC_SPEAKER_DECK_API_END_POINT=$SPEAKER_DECK_API_END_POINT" >> .env

# Build and export
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

