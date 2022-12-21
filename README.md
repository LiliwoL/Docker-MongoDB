Source:
https://www.mongodb.com/compatibility/docker

# Lancer le docker compose en prenant en compte le fichier .env

```bash
docker compose --env-file .env up -d

# ou

bin/run.sh
```


# Accéder au shell Mongo

```
docker run -it mongo:5.0 mongosh "mongo+srv://username:password@clusterURL/database"
```

# Export mongo

```
docker run -it -v $(pwd):/tmp mongo:5.0 mongoexport --collection=COLLECTION --out=/tmp/COLLECTION.json "mongo+srv://username:password@clusterURL/database"
```

# Import Mongo

```
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