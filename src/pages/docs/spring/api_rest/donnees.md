---
title: Les données
weight: 2
template: docs
doc_sections: spring
---

## Les tables

Voici le schéma de la base de données.  
Nous avons mis les relations entre les tables.
Elles sont traduites par les clefs étrangères.

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

## Les classes

Voici les classes java sans les relations entre elles :

```java
@Entity
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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

    private String name;

    // getter/setter
    ...
}
```

## Le JSON

Notre application est une API rest, il n'a pas de page HTML.
Pour communiquer avec le serveur Web, nous choisissons comme structure de données le JSON.  
Il s'agit d'objet et non de classe.
Nous avons décidé que la structure du JSON serait une image identique aux classes, donc même nom et même nombre d'attributs.
Ce qui change est l'imbrication des objets entre eux.  
Voici ce qui est décidé.

### Artiste

Un artiste ne contient que ses attributs. Voici un objet, l'artiste "Celtic woman" :

```json
{
    "id": 1,
    "name": "Celtic woman",
    "bio": "En 2004, les producteurs Sharon Browne et David Downes, directeur musical...",
    "fanNumber": 31760
}
```

### Album

Un album est écrit par un artiste et contient des pistes. Voici un objet album "Le Meilleur de la Musique Irlandaise" :

```json
{
    "id": 2,
    "title": "Le Meilleur de la Musique Irlandaise - Les Plus Beaux Airs Celtiques",
    "releaseDate": "2014-03-03",
    "artist": 1,
    "tracks": [
        {
            "id": 19,
            "title": "Riverdance",
            "duration": 168,
            "preview": "https://cdns-preview-2.dzcdn.net/stream/c-25dc19d64662ad1d5a5a5a771a368859-4.mp3"
        },
        {
            "id": 20,
            "title": "Give Me Your Hand",
            "duration": 143,
            "preview": "https://cdns-preview-f.dzcdn.net/stream/c-f2d88538cdbba283fb66e9af7d4a704a-4.mp3"
        },
        {
            "id": 21,
            "title": "The Snowy Breasted Pearl",
            "duration": 213,
            "preview": "https://cdns-preview-4.dzcdn.net/stream/c-46e9aa572cffc205e4fa3aecd2424f37-4.mp3"
        }
    ]
}
```

### Playlist

Une playlist est un référencement de pistes audio, elle a un nom. Voici un objet playlist "celtic" :

```json
{
    "id": 1,
    "name": "celtic",
    "tracks": [
        {
            "id": 20,
            "title": "Give Me Your Hand",
            "duration": 143,
            "preview": "https://cdns-preview-f.dzcdn.net/stream/c-f2d88538cdbba283fb66e9af7d4a704a-4.mp3"
        },
        {
            "id": 22,
            "title": "Ancient Land",
            "duration": 163,
            "preview": "https://cdns-preview-1.dzcdn.net/stream/c-10488f595a176878b63b4dc4041959b5-5.mp3"
        },
        {
            "id": 24,
            "title": "Moorlough Shore",
            "duration": 245,
            "preview": "https://cdns-preview-e.dzcdn.net/stream/c-eb8433459094c30847866d7042ec91e6-6.mp3"
        }
    ]
}
```
