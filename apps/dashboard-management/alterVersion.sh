latestversion=$(npm view @vizzly/dashboard@dev version)

echo "Building with dashboard version ${latestversion}"

sed -i "s/{{ VERSION }}/${latestversion}/g" dist/dashboard-management/browser/index.html
