#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd wiki/.vuepress/dist

# if you are deploying to a custom domain
echo 'two.js.org' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:jonobr1/two.js.git gh-pages

cd -
