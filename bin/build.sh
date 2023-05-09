pwd
rm -rf dist
tsc -p tsconfig.build.json
cp package.json dist/package.json
cp README.md dist/README.md

