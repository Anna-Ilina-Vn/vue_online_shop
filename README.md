# tutorial_online_shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### DB
sudo npm install -g json-server

Для того, чтобы заупстить локальный сервер для запроса к данным необходимо
в терминале открыть папку с проектом, в котором содержится файл с данными (db.json)
ввести в командной строке

json-server --watch db.json

Сервер развернется на http://localhost:3000