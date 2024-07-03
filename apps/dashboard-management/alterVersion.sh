latestversion=$(npm view @vizzly/dashboard version)

echo "Building with dashboard version ${latestversion}"

sed -i "s/{{ VERSION }}/${latestversion}/g" dist/dashboard-management/browser/index.html
