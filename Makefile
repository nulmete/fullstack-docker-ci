### Development environment
build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	ENV=dev docker-compose -f docker-compose-dev.yml up

### Local environment (source code is hot reloaded)
build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

### Production environment (source code is already built into the image - no hot reloading)
build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up

### SSH config
SSH_STRING:=root@104.131.95.133

ssh:
	ssh $(SSH_STRING) -i ~/.ssh/digitalocean

copy-files:
	scp -i ~/.ssh/digitalocean -r ./* $(SSH_STRING):/root/