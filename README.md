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

## Accéder au shell

Par défaut, la commande lance le terminal **mongosh** connecté à partir des variables d'environnement.

```bash
bin/shell
```

Pour le shell du conteneur *mongo*

```bash
bin/shell mongo
```

## Afficher les logs des conteneur

```bash
bin/log
```

Pour les logs du conteneur *mongo-express*

```bash
bin/log mongo-express
```

## Export mongo

On peut utiliser l'utilitaire **mongodump**, ou le script proposé:
```bash
bin/export
```

Les données seront exportées dans le dossier **output_datas** au format BSON
https://fr.wikipedia.org/wiki/BSON

```bash
docker run -it -v $(pwd):/tmp mongo:5.0 mongoexport --collection=COLLECTION --out=/tmp/COLLECTION.json "mongo+srv://username:password@clusterURL/database"
```

## Import Mongo

Pour importer des données dans Mongo, on utilise l'utilitaire **mongoimport**.

```bash
# Import de données csv dans une base de données que l'on va créer train
mongoimport --db ny --collection restaurants --file primer-dataset.json --drop
```
--db pour donner un nom à votre base de données.
--collection indique le nom de votre collection
--file indique le nom du fichier à intégrer dans la base de données
--drop supprimera au préalable les collections existantes

Dans ce conteneur, un script est proposé.

Utilisez le script **bin/import** qui lit les variables d'environnement suivantes:
- DATABASE_NAME
- COLLECTION_NAME
- IMPORT_FILENAME
```bash
bin/import
```

# Mongo en mode AUTH

Ce docker crée un utilisateur **root** à partir du fichier **.env** fourni.
Il est automatiquement lancé en mode AUTH.