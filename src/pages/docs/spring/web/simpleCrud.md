---
title: Simple CRUD
weight: 2
template: docs
doc_sections: spring
---

## Les données

Pour commencer, nous allons faire simple.
Nous allons gérer un jukebox. Le jukebox contient des artistes, des albums et des titres.  
Nous commençons par écrire l'interface pour gérer une table, la table artiste.
Nous pouvons créer un enregistrement, le lire, le modifier, et le supprimer (CRUD).

![classe artiste](artiste.jpeg)

## Mise en place du CRUD pour artiste

Ce projet met à disposition l'API suivante :

GET /api/artiste : liste les informations de l'ensemble des enregistrements Artiste.
GET /api/artiste/[id] : renvoie les informations d'un enregistrement Artiste.
POST /api/artiste : crée un nouvel enregistrement Artiste avec les informations fournies.
PUT /api/artiste/[id] : met à jour l'enregistrement Artiste correspondant à l'id fourni avec les informations fournies.
DELETE /api/artiste/[id] : supprime l'enregistrement Artiste correspondant à l'id fourni.

## Compilation et exécution

Dans la suite du projet, vous utilisez Eclipse pour compiler et exécuter.
Vous pouvez aussi le faire en ligne de commande.
`mvn clean install` pour compiler. `mvn jukebox:run` pour lancer le projet.

