# build and run locally

```
docker-compose build
docker-compose up -d
```

[http://127.0.0.1:8080/](http://127.0.0.1:8080/)

Note that a tmpfs mount is used for mariadb data to ensure that the database is automatically _deleted_ up on restarts.

# start container for dev and running tests
```
docker-compose up -d devenv
docker-compose exec devenv bash
# in windows msys2 bash shell
winpty ddocker-compose exec devenv bash
```

# run Javascript tests
```
cd web
npm install
npm test
```

[web/test](web/test)

# run Java tests
```
cd api
gradle test
```
[api/src/test/java/se/boxinator/api](api/src/test/java/se/boxinator/api)


# run end-to-end tests
```
docker-compose up -d
docker-compose exec cypress cypress run
```

[test/](test/)