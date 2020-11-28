---
title: Les relations  
weight: 3
template: docs
doc_sections: spring
---

## JPA

C'est JPA/Hibernate qui gère les relations entre les classes.
Ces relations sont déclarées dans le modèle au niveau de l'entité (`@Entity`), à l'aide d'annotation.

## Relation entre Artist et Album

Un artiste écrit plusieurs albums. Un album est écrit par un seul artiste.
C'est une relation **One To many**.  
La relation est bidirectionnelle, c'est à dire que les 2 classes ont une vue réciproque de l'autre.  
Ceci se traduit en Java par les deux annotations `@OneToMany` et `@ManyToOne`.  

### Album/Artist

```java
@Entity
public class Album {
    ...
    @ManyToOne @JoinColumn(name = "artist_id")
    private Artist artist;
    ...
}
```

`Album` contient un seul `Artist`, c'est un attribut unitaire typé `Artist`.  
L'annotation `@ManyToOne`, suivi de `@JoinColumn(name = "artist_id")` indique que c'est `Album` qui référence `Artist`.
`@JoinColumn` indique le champ équivalent (`artist_id`) dans la table album.  
Le mapping entre la classe `Album` et la table `album` s'est fait automatiquement car les deux portent le même nom.
Il en est de même pour toutes les autres classes.  

### Artist/Album

```java
@Entity
public class Artist {
    ...

    @OneToMany(mappedBy = "artist")
    private List<Album> albums;

    ...
}
```

`Artist` contient plusieurs albums, on utilise une `List` générique typé `Album`.  
L'annotation `@OneToMany(mappedBy = "artist")` indique que nous sommes de l'autre côté de la relation.
Il est inutile de décrire à nouveau la relation.
C'est l'attribut `mappedBy` qui l'explique en indiquant l'attribut d'`Album` concerné, ici `private Artist artist`.

## Relation entre Album et Track

Un album est composé de plusieurs pistes (track). Une piste est sur une seul album.
C'est aussi une relation **One To many** et elle est bidirectionnelle.

### Track/Album

```java
@Entity
public class Track {
    ...
    @ManyToOne @JoinColumn(name = "album_id")
    private Album album;
    ...
}
```

`Track` contient un seul `Album`, c'est un attribut unitaire typé `Album`.  
L'annotation `@ManyToOne`, suivi de `@JoinColumn(name = "album_id")` indique que c'est `Track` qui référence `Album`.
`@JoinColumn` indique le champs équivalent (`album_id`) dans la table track.  
Vous remarquez que c'est identique à la relation Album/Artist.

### Album/Track

```java
@Entity
public class Album {
    ...
    @OneToMany(mappedBy = "album",
               cascade = CascadeType.ALL,
               orphanRemoval = true,
               fetch = FetchType.EAGER)
    private List<Track> tracks;
    ...
}
```

`Album` contient plusieurs tracks, on utilise une `List` générique typé `Track`.  
L'annotation `@OneToMany(mappedBy = "album")` indique que nous sommes de l'autre côté de la relation.
Il est inutile de décrire à nouveau la relation.
C'est l'attribut `mappedBy` qui l'explique en indiquant l'attribut de `Track` concerné, ici `private Track track`.  
**Ce qui change**, ce sont les nouveaux attributs de `OneToMany` : `cascade = CascadeType.ALL`, `orphanRemoval=true`, `fetch=FetchType.EAGER`.
Pourquoi ces attributs ?  
Tout simplement parce que la [structure de données json](../donnees#album) contient un album et des pistes. Ils sont donc très liés.  
Le fetch gère la lecture des données dans la base.
La cascade et orphanRemoval gèrent l'écriture dans la base.

### fetch

Le fetch est une stratégie de lecture. Par défaut c'est `LAZY`.
Cela signifie que JPA va lire l'enregistrement lié que lorsqu'il en aura besoin.
Et s'il y a plusieurs enregistrements, il pourra faire plusieurs SELECT.  
Donc un select pour lire l'enregistrement album et un select pour lire les enregistrements track.  
Quand une table est très liée à une autre (comme album avec track), il peut être intéressant de faire une lecture en EAGER.
Ceci économise le nombre de SELECT (et donc du temps).  
Ici nous aurons un select avec une jointure (LEFT JOIN) entre album et track.

### La cascade

Lorsque l'on fait un save d'un album, ceci entraîne une requête de maj dans la base de données (INSERT, UPDATE) de l'enregistrement album.
Comme un album contient des tracks, il faut faire la même chose pour chaque track.  
Lorsque l'on fait un delete d'un album, ceci entraîne une requête de suppression dans la base de données (DELETE).
Comme un album contient des tracks, il faut aussi supprimer les tracks.  
Pour synchroniser l'album et ses tracks, nous devons écrire du code créer/modifier chaque track, et du code pour supprimer chaque track.  
Pour éviter cela, il suffit d'indiquer à la relation l'option `cascade = CascadeType.ALL`.  
C'est JPA/Hibernate qui s'occupe de tout.

### Les enregistrements orphelins

Lorsque que nous faisons une maj d'Album, il est possible que le nombre de tracks ait changé.  
`CascadeType.ALL` permet de créer, modifier ou supprimer des tracks de l'album, mais il a un défaut.  
Ce qui ne fonctionne pas, c'est un track qui a disparu du json lors d'une modification de l'album.
Il n'est pas supprimé de la base et c'est une erreur.  
C'est l'option `orphanRemoval = true` qui nous permet de corriger cela.

## Relation entre Playlist et Track

C'est une relation **Many To Many**.  
C'est la plus compliquée de toute, car elle nécessite une table intermédiaire : `playlist_track`.  
Dans la relation OneToMany/ManyToOne, nous avions décidé que c'était la classe qui contenait ManyToOne (et l'attribut unitaire) qui était maître de la relation.
Ici, nous avons un tableau de chaque côté. Il faut décider de la classe principale (maître). Logiquement, ce sera Playlist.

### Playlist/Track

```java
@Entity
public class Playlist {
    ...
    @ManyToMany
    @JoinTable(name = "playlist_track",
               joinColumns = @JoinColumn(name = "playlist_id"),
               inverseJoinColumns = @JoinColumn(name = "track_id")
              )
    List<Track> tracks;
    ...
}
```

`Playlist` contient plusieurs `Track`, on utilise une List générique typé `Track`.  
L'annotation `@ManyToMany` est suivi de l'annotation `@JoinTable`.
Il s'agit d'une relation matérialisée par la table intermédiaire `playlist_track`.  
`name` est le nom de la table.  
`joinColumns` référence la clef étrangère qui se rapproche de `Playlist`.  
`inverseJoinColumns` référence la clef étrangère qui se rapproche de `Track`.

### Track/Playlist

```java
@Entity
public class Track {
    ...
    @ManyToMany(mappedBy = "tracks")
    private List<Playlist> playlists;
    ...
}
```

`Track` est sur plusieurs `Playlist`, on utilise une List générique typé `Playlist`.  
C'est aussi une annotation `@ManyToMany`, mais comme nous sommes du côté secondaire (autrefois appelée esclave), un attribut `mappedBy` est suffisant.
