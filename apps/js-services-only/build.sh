latestversion=$(npm view @vizzly/dashboard@dev version)

echo "Building with dashboard version ${latestversion}"

cp www/index.html dist/index.html

sed -i "s/{{ VERSION }}/${latestversion}/g" dist/index.html
