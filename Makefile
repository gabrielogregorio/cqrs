.PHONY: dev stop

dev: d
stop: s
log: l
build: b


d:
	yarn
	docker compose up --build -d

b:
	yarn
	@docker compose -f ./docker-compose.yml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.yml up --build -d --force-recreate
	@make migrate

s:
	docker compose down

l:
	@echo "Show app logs"
	@docker compose -f ./docker-compose.yml logs -f

migrate:
	docker compose -f ./docker-compose.yml run -T api yarn migration:run

revert:
	docker compose -f ./docker-compose.yml run -T api yarn migration:revert

