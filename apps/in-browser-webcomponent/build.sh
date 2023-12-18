latestversion=$(npm view @vizzly/dashboard version)

cp www/index.html dist/index.html

sed -i "s/{{ VERSION }}/$(latestversion)/g" dist/index.html
