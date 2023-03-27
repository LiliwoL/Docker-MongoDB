# Docker Mongo et Mongo Express

Installe une stack mongo et mongo express

# Sommaire

<!-- TOC -->
* [Docker Mongo et Mongo Express](#docker-mongo-et-mongo-express)
* [Sommaire](#sommaire)
* [Présentation](#prsentation)
* [Accès](#accs)
  * [Mongo](#mongo)
  * [Mongo Express](#mongo-express)
* [Commandes](#commandes)
  * [Lancement des containers](#lancement-des-containers)
  * [Arrêt des containers](#arrt-des-containers)
  * [Accéder au shell Mongo](#accder-au-shell-mongo)
  * [Afficher les logs du container](#afficher-les-logs-du-container)
  * [Export mongo](#export-mongo)
  * [Import Mongo](#import-mongo)
* [Mongo en mode AUTH](#mongo-en-mode-auth)
  * [D'abord une connexion sans auth](#dabord-une-connexion-sans-auth)
  * [Création d'un utilisateur root](#cration-dun-utilisateur-root)
* [Sample data](#sample-data)
  * [Activation de mongo en mode auth](#activation-de-mongo-en-mode-auth)
<!-- TOC -->

v 0.1

# Présentation

> Mongo
Serveur mongo

> Mongo express
https://github.com/mongo-express/mongo-express

# Configuration

- Clonez le dépôt
- Renommez le fichier **.env.sample** en **.env**.
- Configurez les identifiants de l'utilisateur root sur mongo.
- Lancez la commande `bin/start` pour lancer les conteneurs

***

# Accès

## Mongo

URL pour accéder au serveur mongo:
`localhost:27017`

## Mongo Express

URL pour accéder à l'interface **Mongo Express**
`http://localhost:8081`

***

# Commandes

## Lancement des conteneur

Lancement du **docker-compose** en prenant en compte le fichier .**env**

```bash
bin/start

Démarrage de tous les containers
[+] Running 3/3
 ⠿ Network mongo_mongo-network  Created                                                                                                   0.1s
 ⠿ Container mongo              Started                                                                                                   2.1s
 ⠿ Container mongo-express      Started                                                                                                   1.9s
```

## Arrêt des conteneurs

Arrête tous les conteneurs.
```bash
bin/stop
```

## Accéder au shell Mongo

```bash
bin/shell
```

Pour le shell du conteneur *mongo-express*

```bash
bin/shell mongo-express
```

## Afficher les logs des conteneurs

```bash
bin/log
```

Pour les logs du conteneur *mongo-express*

```bash
bin/log mongo-express
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