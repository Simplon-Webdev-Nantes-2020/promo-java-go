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

## Les données

### Les tables

Voici le schéma de la base de données. Nous avons mis les relations. Elle sont traduites par les clefs étrangères.

```sql
CREATE TABLE artist (
    id   INTEGER   PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    bio VARCHAR(255),
    fan_number INTEGER
);

CREATE TABLE album (
    id   INTEGER   PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(70) NOT NULL,
    release_date DATE,
    artist_id INT,
    foreign key (artist_id) references artist(id)
);

CREATE TABLE track (
    id   INTEGER   PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    duration INTEGER,
    preview VARCHAR(200),
    album_id INT,
    foreign key (album_id) references album(id)
);

CREATE TABLE playlist (
    id   INTEGER   PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE playlist_track (
    playlist_id   INT,
    track_id   INT,
    primary key (playlist_id, track_id),
    foreign key (playlist_id) references playlist(id),
    foreign key (track_id) references track(id)
);
```

### Les entités

Voici les classes java sans les relations entre elles :

```java
@Entity
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Name can't be empty")
    private String name;

    private String bio;

    private Integer fanNumber;

    // getter/setter
    ...
}
```

```java
@Entity
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Name can't be empty")
    private String title;

    private LocalDate releaseDate;

    // getter/setter
    ...
}
```

```java
@Entity
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Name can't be empty")
    private String title;

    private int duration;

    private String preview;

    // getter/setter
    ...
}
```

```java
@Entity
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Name can't be empty")
    private String name;

    // getter/setter
    ...
}
```
