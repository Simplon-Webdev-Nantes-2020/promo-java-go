---
title: L'interface JSON
weight: 4
template: docs
doc_sections: spring
---

## La sérialisation

Pour communiquer avec l'intérieur, nous avons choisi comme structure de données le JSON.  
Le JSON signifie *JavaScript Object Notation*. C'est un format de données textuelles.  
Cependant, Spring est une application Java et donc ne connaît que les classes et les objets Java.
Ces objets sont en mémoire et notre mission est donc de les traduire dans un format texte, compréhensible par une application Javascript par exemple.
Pour cela nous allons nous appuyer sur un processus bien connu du monde Objet : la sérialisation.
La sérialisation consiste à traduire un objet en mémoire en un flux d'octets qui pourra être écrit dans un fichier, ou envoyé vers une autre application.
Dans notre cas, nous allons plus loin dans le sérialisation, puisque nous voulons que le flux d'octets soient écrit en format texte.  
Le phénomène inverse qui consiste à récupérer du JSON et à en faire un objet Java s'appelle la dé-sérialisation.
Heureusement, nous nous appuyons sur une librairie populaire : **Jackson**.  
Jackson est facile à utiliser.
Nous n'avons pas ou peu de mappage à écrire.
Nous utilisons les annotations.  

## Mise en place

Jackson est intégré à Spring Boot, donc pas besoin de déclarer de librairie.
Par ailleurs, lorsque vous écrivez un RestController, c'est Jackson qui est utilisé par défaut, sans qu'on indique quoi que ce soit.  
Et donc notre mission va être d'utiliser Jackson et d'écrire le moins de code possible pour sérializer et dé-sérialiser du JSON.  
Pour cela, nous allons utiliser les annotations dans le modèle.

## Les difficultés

Utiliser Jackson peut paraître simple dans un premier temps.
Mais comme toute chose simple, cela se complique quand le résultat attendu n'est pas au rendez-vous.
Quelles sont ces difficultés, ces comportements incompréhensible ?

* Pas de génération de l'objet JSON (sérialization).
* Une boucle infinie suite à une référence cyclique lors d'une relation bidirectionnelle.
* Une annotation qui ne fonctionne pas comme indiqué dans les nombreux tutos.
* Une exception lors de l'instanciation de l'objet Java (dé-sérialisation), alors que la sérialisation s'est bien passée.

Ces difficultés viennent toujours lorsque nous avons une relation bi-directionnelle entre deux classes.  
Et donc ces petits inconvénients vous font perdre beaucoup de temps, et vous vous dites qu'il aurait été plus simple coder la sérialisation.
Seule l'expérience avec Jackson vous permettra de progresser et répondre rapidement à un comportement non souhaité.
Nous allons les étudier dans notre projet.

## Une classe sans relation

C'est le cas du premier projet où la classe `Artist` est seule.
Aucune annotation Jackson, tout fonctionne bien.

## Une relation bidirectionnelle

Trois relations bidirectionnelles et trois façons de la gérer.

### Album/Track

Cette relation est bidirectionnelle pour les classes.
C'est une référence cyclique qui fera soit boucler votre application, soit vous n'aurez pas de sérialisation.  
Nous allons indiquer à Jackson qui est maître de cette relation, et ce n'est pas forcément le même maître que pour JPA.  
Nous utilisons l'annotation `@JsonManagedReference` dans la classe Album et l'annotation `@JsonBackReference` dans la classe Track.  
`@JsonManagedReference` est la partie qui sera sérialisée. `@JsonBackReference` est la partie omis de la sérialisation.

```java
@Entity
public class Album {
    ...
    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER)
    @JsonManagedReference
    private List<Track> tracks;
}
```

```java
@Entity
public class Track {
    ...
    @ManyToOne @JoinColumn(name="album_id")
    @JsonBackReference
    private Album album;
}
```

Ce qui donne le résultat pour

Album :

```json
{
    "id": 2,
    "title": "Le Meilleur de la Musique Irlandaise - Les Plus Beaux Airs Celtiques",
    "releaseDate": "2014-03-03",
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

Track :

```json
{
    "id": 3,
    "title": "Mon univers",
    "duration": 202,
    "preview": "https://cdns-preview-f.dzcdn.net/stream/c-fb6c4843fb44d64b3a34028f8b784336-3.mp3"
}
```

### Artist/Album

Même condition que précédemment et une nouvelle solution.
Nous utilisons l'annotation `@JsonBackReference` dans la classe Artist et l'annotation `@JsonIdentityInfo` dans la classe Album.  
`@JsonBackReference` est la partie omis de la sérialisation.
`@JsonIdentityInfo` est la partie qui sera sérialisée.  
`@JsonIdentityReference(alwaysAsId = true)` indique que l'on enverra uniquement l'id de l'artiste

```java
@Entity
public class Artist {
    ...
    @OneToMany(mappedBy = "artist")
    @JsonBackReference
    private List<Album> albums;
}
```

```java
@Entity
public class Album {
    ...
    @ManyToOne @JoinColumn(name = "artist_id")
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId = true)
    private Artist artist;
}
```

Ce qui donne le résultat pour,

Artist :

```json
{
    "id": 1,
    "name": "Celtic woman",
    "bio": "En 2004, les producteurs Sharon Browne et David Downes, directeur musical...",
    "fanNumber": 31760
}
```

Album :

```json
{
    "id": 2,
    "title": "Le Meilleur de la Musique Irlandaise - Les Plus Beaux Airs Celtiques",
    "releaseDate": "2014-03-03",
    "artist": 1
}
```

### Playlist/Track

Cette relation est bidirectionnelle pour les classes et en même temps unidirectionnelle pour JSON.  
Une playlist contient des tracks, mais nous n'avons pas besoin d'indiquer qu'une track est sur une playlist.  
Nous sommes dans le scénario que précédemment et nous l'avons résolu différemment.  
Nous utilisons l'annotation `@JsonIgnore` dans la classe Track et c'est tout.  
`@JsonIgnore` indique que cet attribut ne sera pas sérialisé.

```Java
@Entity
public class Track {
    @ManyToMany(mappedBy = "tracks")
    @JsonIgnore
    private List<Playlist> playlists;
}
```

Ce qui donne le résultat :

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

### La quelle choisir

Qu'elle est la meilleure solution ?  
Sur le Web, vous trouverez souvent le couple `@JsonManagedReference`/`@JsonBackReference`.
C'est la plus facile à implémenter. Elle est explicite.
Cependant, elle n'a pas toujours le comportement désiré.
Je vous conseille dans ce cas d'essayer `@JsonIgnore`, puis `@JsonIdentityInfo`.  
`@JsonIdentityInfo` couplé à `JsonIdentityReference` permet de n'envoyer que l'id de l'objet.  
C'est ce que nous explique [baeldung](https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion).

## Approfondissez

* [Learn Jackson](https://www.tutorialspoint.com/jackson/index.htm)
* [Utilisation des annotations 1](https://www.baeldung.com/jackson-annotations)
* [Utilisation des annotations 2](https://www.baeldung.com/jackson-advanced-annotations)
* [Jackson selon baeldung](https://www.baeldung.com/jackson)
