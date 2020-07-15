#!/usr/bin/env sh

set -e

sudo npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/GStarP/gstarp-diary.git master:gh-pages

cd -