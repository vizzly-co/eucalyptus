latestversion=$(npm view @vizzly/dashboard@dev version)

echo "Building with dashboard version ${latestversion}"

cp www/index.html dist/index.html

if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s/{{ VERSION }}/${latestversion}/g" dist/index.html
else
    sed -i "s/{{ VERSION }}/${latestversion}/g" dist/index.html
fi