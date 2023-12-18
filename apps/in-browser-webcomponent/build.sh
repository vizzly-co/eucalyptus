latestversion=$(npm view @vizzly/dashboard version)

RUN mkdir -p /opt/app
WORKDIR /opt/app

mkdir -p ./dist

cp www/index.html dist/index.html

sed -i "s/{{ VERSION }}/$(latestversion)/g" dist/index.html
