prod:
	sudo docker compose -f docker-compose.prod.yml up --build

prod-detach:
	sudo docker compose -f docker-compose.prod.yml up --build -d

prod-down:
	sudo docker compose -f docker-compose.prod.yml down

prod-clean:
	sudo docker compose -f docker-compose.prod.yml down -v

dev:
	sudo docker compose -f docker-compose.dev.yml up --build

logs:
	sudo docker compose -f docker-compose.prod.yml logs -f

migrate:
	sudo docker compose -f docker-compose.prod.yml run --rm migrate
