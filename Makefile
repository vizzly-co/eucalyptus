# APP_NAME=node-smart-proxy make
# APP_NAME=in-browser make

default:
	docker build -f ./apps/$(APP_NAME)/Dockerfile ./apps/$(APP_NAME) -t eucalyptus-$(APP_NAME)\:latest