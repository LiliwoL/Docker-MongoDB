# Sommaire

[toc]

v 0.1

# Docker Mongo et Mongo Express

Installe une stack mongo et mongo express

> Mongo express
https://github.com/mongo-express/mongo-express

## Accès à mongo
localhost:27017

## Accès à Mongo Express
http://localhost:8081

Source:
https://www.mongodb.com/compatibility/docker

# Commandes

## Lancement des containers

Lancement du docker compose en prenant en compte le fichier .env

```bash
bin/start
```

## Arrêt des containers

Lancement du docker compose en prenant en compte le fichier .env

```bash
bin/stop
```

## Accéder au shell Mongo

```bash
bin/shell

# ou
docker run -it mongo:5.0 mongosh "mongo+srv://username:password@clusterURL/database"
```

## Afficher les logs du container

```bash
bin/log
```

## Export mongo

```bash
docker run -it -v $(pwd):/tmp mongo:5.0 mongoexport --collection=COLLECTION --out=/tmp/COLLECTION.json "mongo+srv://username:password@clusterURL/database"
```

## Import Mongo

```bash
docker run -it -v $(pwd):/tmp mongo:5.0 mongoimport --drop --collection=COLLECTION "mongodb+srv://user:password@clusterURL/database" /tmp/COLLECTION.json
```


# Mongo en mode AUTH

## D'abord une connexion sans auth

```
docker exec -it mongodb bash
mongo
```

## Création d'un utilisateur root

```
use admin
db.createUser(
  {
     user: "root",
     pwd: "root",
     roles:["root"]
  }
);
```

# Sample data

https://github.com/neelabalan/mongodb-sample-dataset

## Activation de mongo en mode auth

Modification du docker-compose.yml en ajoutant:

```
services:
   mongo:
      container_name: mongodb
      image: mongo
      ports:
       - "27017:27017"
      volumes:
       - mongodbdata:/data/db
      command: [--auth]
      restart: always
volumes:
   mongodbdata:

networks:
   default:
      external:
         name: mongo-network
```