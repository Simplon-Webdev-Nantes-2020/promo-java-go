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

C'est le cas du premier projet où Artist est seul.
Aucune annotation Jackson, tout fonctionne bien.

## Une relation bidirectionnelle

Trois relations bidirectionnelles et trois façons de la gérer.

### Album/Track

Cette relation est bidirectionnelle pour les classes.
C'est une référence cyclique qui fera soit boucler votre application, soit vous n'aurez pas de sérialisation.  
Nous allons dire à Jackson qui est maître de cette relation, et ce n'est pas forcément le même maître que pour JPA.  
Nous utilisons l'annotation `@JsonManagedReference` dans la classe Album et l'annotation `@JsonBackReference` dans la classe Track.

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

### Artist/Album

Même condition que précédemment et une nouvelle solution.
Nous utilisons l'annotation `@JsonBackReference` dans la classe Artist et l'annotation `@JsonIdentityInfo` dans la classe Album.

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
    private Artist artist;
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

### La quelle

Qu'elle est la meilleure solution ?  
Sur le Web, vous trouverez souvent le couple @JsonManagedReference/@JsonBackReference.
C'est la plus facile à implémenter. Elle est explicite.
Cependant, elle n'a pas toujours le comportement désiré.
Je vous conseille dans ce cas d'essayer @JsonIgnore, puis @JsonIdentityInfo.
C'est ce que nous explique [baeldung](https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion).

## Approfondissez

* [Learn Jackson](https://www.tutorialspoint.com/jackson/index.htm)
* [Utilisation des annotations 1](https://www.baeldung.com/jackson-annotations)
* [Utilisation des annotations 2](https://www.baeldung.com/jackson-advanced-annotations)
* [Jackson selon baeldung](https://www.baeldung.com/jackson)
