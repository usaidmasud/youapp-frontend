build:
	docker compose build --no-cache

start:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down -v

