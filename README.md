# Next.JS TesloShop APP
Para correr localmente, se necesita la base de datos, para ello la generamos con el siguiente comando que toma la configuracion del archivo docker-compose.yaml
```
docker-compose up -d
```

* El -d significa __ditached__

* MongoDB URL Local:
```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* Llenar las vairables de entorno
MONGO_URL=mongodb://localhost:27017/teslodb

* Reconstruir los modulos de node y levantar Next
```
yarn install
yarn dev
```

## Llenar la base de datos con informacion de pruebas

Desde postman o equivalentes llamar desde un get:
```
http://localhost:3000/api/seed
```
