prod:
	sudo docker build -t ablog:latest -f Dockerfile.prod .
	sudo docker run -p 3000:3000 ablog:latest

dev:
	sudo docker build -t ablog:latest .
	sudo docker run -p 3000:3000 ablog:latest

delete:
	sudo docker rm ablog:latest