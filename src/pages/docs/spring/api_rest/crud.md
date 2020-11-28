---
title: CRUD simple
weight: 1
template: docs
doc_sections: spring
---

L'api permet la gestion de 4 classes.  
Dans un premier temps, nous allons créer ces 4 classes sans lien entre elles et les exposer via des url.
Nous pourrons exécuter les 4 fonctions du CRUD.  
Pour cela, nous partons du projet précédent [jukebox simple CRUD](../../web/simpleCrud).  
Ne revenons pas sur la gestion de l'artiste. La gestion des 3 autres classes est identique.  
Vous trouverez l'intégralité du projet sur [github](https://github.com/Simplon-Webdev-Nantes-2020/jukebox).

## Les points d'entrée de l'API

Ce qui donne 20 url pour artist, album, track, playlist :

* GET /jukebox/artists  
* GET /jukebox/artists/[id]  
* POST /jukebox/artists  
* PUT /jukebox/artists/[id]  
* DELETE /jukebox/artists/[id]  
* GET /jukebox/albums  
* GET /jukebox/albums/[id]  
* POST /jukebox/albums  
* PUT /jukebox/albums/[id]  
* DELETE /jukebox/albums/[id]  
* GET /jukebox/tracks  
* GET /jukebox/tracks/[id]  
* POST /jukebox/tracks  
* PUT /jukebox/tracks/[id]  
* DELETE /jukebox/tracks/[id]  
* GET /jukebox/playlists  
* GET /jukebox/playlists/[id]  
* POST /jukebox/playlists  
* PUT /jukebox/playlists/[id]  
* DELETE /jukebox/playlists/[id]  
