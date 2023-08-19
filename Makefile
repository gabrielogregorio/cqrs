.PHONY: dev stop

dev: d
stop: s
log: l
build: b


d: start-setup
	@yarn
	@docker compose up --build -d

b: start-setup
	@yarn
	@docker compose -f ./docker-compose.yml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.yml up --build --force-recreate -d
	@make migrate

s:
	@docker compose down

bash:
	@docker exec -it api_cqrs /bin/bash

l:
	@docker compose -f ./docker-compose.yml logs -f

la:
	@docker compose -f ./docker-compose.yml logs -f api_cqrs

lint:
	@docker compose -f ./docker-compose.yml run -it api_cqrs yarn lint

migrate:
	@docker compose -f ./docker-compose.yml run -T api_cqrs yarn migration:run

revert:
	@docker compose -f ./docker-compose.yml run -T api_cqrs yarn migration:revert

start-setup:
	@if [ ! -f .env ]; then cp .env.example .env; fi
