# build and run locally

```
docker-compose build
docker-compose up -d
curl http://127.0.0.1:8080/api/ping
```

Note that a tmpfs mount is used for mariadb data to ensure that the database is automatically _deleted_ up on restarts.

# start container for dev and running tests
```
docker run --rm -v ".:/src" it $(docker build -q ./devenv)
# in windows msys2 bash shell
winpty docker run --rm -v /"$PWD":/src -it $(docker build -q ./devenv)
```

# run Javascript tests
```
cd web
npm install
npm test
```

[web/test](web/test)

# Run Java tests
```
cd api
gradle test
```
[api/src/test/java/se/boxinator/api](api/src/test/java/se/boxinator/api)
