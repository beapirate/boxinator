# build and run locally

```
docker-compose build
docker-compose up -d
curl http://127.0.0.1:8080/api/ping
```

# start container for dev and running tests
```
docker run --rm -v ".:/src" it $(docker build -q ./devenv)
# in windows msys2 bash shell
winpty docker run -it -v /"$PWD":/src boxinator-devenv
```
