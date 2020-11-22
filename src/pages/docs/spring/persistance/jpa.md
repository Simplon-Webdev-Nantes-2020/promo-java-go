---
title: JPA/Hibernate
weight: 2
template: docs
doc_sections: spring
---

## Introduction

JPA/Hibernate est un ORM (Object Relational Mapping).
Un ORM va servir d'interface entre le modèle (l'entité) et la base de données.
À une classe correspond une table, et à un attribut correspond un champ.  
Hibernate est un framework, JPA est une API et s'appuie sur Hibernate.
Hibernate est la fwk historique de Java et la plus populaire.
Il en existe d'autre comme EclipseLink.  
Pour normaliser tous ces framework, est né la notion de standard : JPA (Java Persistence Api).
JPA est donc une interface définissant un certain nombre de mots-clés et de normes à respecter.
On peut voir JPA comme l'interface et Hibernate comme la classe qui implément cette interface.

## le repository

L'écriture des requêtes SQL est une activité longue, répétitive, source d'erreurs, et surtout n'apporte rien au logiciel.
Cependant cette écriture est obligatoire car c'est le seul moyen de communiquer avec la base de données.
C'est ce qu'on appelle en informatique du boilerplate.  
Spring nous délivre de cette tâche peu gratifiante, en confiant cela au repository.  
Si le repository a la lourde tache d'exécuter les requêtes SQL et d'alimenter le modèle, vous avez remarqué qu'il est est vide ou presque, de plus qu'il s'agit d'une interface.  
En fait Spring utilise l'héritage et l'IOC effectuer cette tâche.  
Vous trouverez toutes les infos nécessaires dans la [doc de Spring](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories).

### Les méthodes standards

Nous avons de base 6 méthodes qui permettent d'écrire un CRUD : findAll(), findById(ID primaryKey), existById(ID primaryKey), count(), save(T entity), delete(T entity).  
À cela, s'ajoute le findAll avec l'option tri `Iterable<T> findAll(Sort sort)`, ou l'option pagination `Page<T> findAll(Pageable pageable)`.

### Les méthodes à la demande

Les méthodes standards ne répondent pas à tous les besoins.
Bien souvent, nous avons besoin de recherche par rapport à un champ.
Là aussi, Spring est capable de générer le code nécessaire.  
Il suffit de déclarer des méthodes en utilisant le verbe find, suivi d'opérateurs, suivi de nom de propriétés.  
Par exemple : `findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname)`.  
Les opérateurs disponibles de Query sont les suivants:

* `By` : opérateur principal actant le Where SQL
* `Distinct` : spécifie un Elément unique
* `Or`, `And` : critère d’agrégation ou d’exclusion
* `OrderBy`, `Asc`, `Desc` : acte le tri par propriété et politique Asc/Desc 
* `LessThan`, `GreaterThan` : règles numériques
* `Between`, `After`, `Before` : règle pour des dates
* `Like`, `NotLike` : like Sql
* `IsNull`, `isNotNull`, `NotNul` : opérateurs sur valeurs null
* `Not` : différent de
* `In`, `NotIn` : est contenu, ou pas, dans la liste de valeurs
* `True, False` : opérateurs sur valeurs booléennes
* `IgnoreCase`, `AllIgnore`, `StartingWith`, `EndingWith`, `Containing` : opérateurs sur chaines de caractères

La liste complète est dans la documentation de [Spring](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods).

### Les query

Si avec toute cette armada, vous ne trouvez pas votre bonheur, vous pouvez écrire votre propre requête SQL.
Dans ce cas, vous utilisez l'annotation `@Query`.
Avec `@Query` vous pouvez donner n'importe quel nom à votre méthode.  
Le langage utilisé dans ce cas est le HQL (Hibernate Query Language).
C'est un langage proche du SQL.  
En effet l'annotation @Query impose de commencer la requête au from.  

```java
@Query("from track where album_id = ?1 and duration > ?2")
public List<Track> findLongTrack(long idAlbum, int duration);
```

Si vous préférez le langage SQL, c'est possible. Vous devez le signifier avec l'option nativeQuery = true.

```java
@Query("select * from track where album_id = ?1 and duration > ?2", nativeQuery = true)
public List<Track> findLongTrack(long idAlbum, int duration);
```

Pour tout savoir sur le HQL, lisez la documentation d'[hibernate](https://docs.jboss.org/hibernate/orm/3.6/reference/fr-FR/html/queryhql.html).  

## L'entité (@Entity)

### Les annotions définissant le schéma

JPA/Hibernate permet de relier les classes entre elles et de générer le schéma de la base de données.
C'est au niveau du modèle @Entity qu'on définit cela.  
Dans ce cas, une classe devient une table, un attribut devient un champ, une relation devient une clef étrangère.
Pour la classe, on utilise l'écriture camelCase, pour la base de donnée c'est l'écriture snake_case qui est utilisée.
Spring est capable de faire la correspondance entre les 2 écritures.

### Correspondance avec la base de données

Pour faire la correspondance entre une classe et la table, on utilise l'annotation `@Table(name = "ma_table")`.  
Pour faire la correspondance entre un attribut et un champ de la table, c'est l'annotation `@Column(name = "mon_champ")`  
Si @Table, ou @Column ne sont pas renseignés, la correspondance se fait avec les mêmes mots, en transposant l'écriture camelCase en snake_case.

```java
@Entity
@Table(name = "actor")
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "actor_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "last_name")
    @NotBlank(message = "lastName can't empty!")
    private String lastName;

    @Column(name = "first_name")
    @NotBlank(message = "lastName can't empty!")
    private String firstName;

    @Column(name = "last_update")
    private Timestamp lastUpdate;
}
```

### La contrainte d'unicité

Une contrainte d'unicité a la même fonction que pour une base de données relationnelle.  
Elle est composée d'une ou plusieurs propriétés.  
L'annotation `@UniqueConstraint` permet de créer une unicité sur plusieurs attributs.
Elle est donc mise lors de la déclaration de la classe (dans l'annotation `@Table`).  

```java
@Table(name = "actor", uniqueConstraints = @UniqueConstraint(columnNames = {"lastName", "firstName"}))
public class Actor {
}
```

L'option `unique` définit l'unicité d'un attribut, option de l'annotation `@Column`.  

```java
@Column(name = "title", unique=true)
private String title;
```

### Les relations entre les tables

Il existe 4 relations entre les tables `@OneToOne`, `@ManyToOne`, `@OneToMany`, `@ManyToMany`.
Elles correspondent aux relations du diagrammes des classes.  
Pour faire une relation entre 2 classes, il suffit de déclarer un attribut typé par la classe désignée par la relation.  
Si la relation est OneToOne ou ManyToOne, on utilise un attribut simple.
Si la relation est OneToMany ou ManyToMany, on utilise une collection comme une List ou un Set.  
Pour les relations OneToOne, OneToMany, ManyToOne la relation est complétée par un `@JoinColumn` qui indique le champ correspondant.  
La relation ManyToMany est complétée pour un `@JoinTable`.
Vous trouverez toutes les infos [ici](https://www.baeldung.com/jpa-many-to-many).

```java
@Entity
@Table(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "film_id", unique = true, nullable = false)
    private Long id;

    ...

    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;
}
```

### Les relations bidirectionnelles

Par défaut la relation est unidirectionnelle.  
Pour faire une relation bidirectionnelle, il faut décider de la classe owner qui contiendra l'annotation `@JoinColumn`.  
L'autre classe contient l'option `mappedBy`.  
mappedBy référence le nom de l'attribut contenu dans l'autre classe et non la table.  

```java
@Entity
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @ManyToOne @JoinColumn(name = "artistId")
    private Artist artist;
}
```

```java
@Entity
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "artist")
    @JsonManagedReference
    private List<Album> albums;
}
```

### La cascade et le fetch

Lorsque 2 classes sont liées, il est possible cumuler de fusionner des traitements sur les 2 classes.
Prenons l'exemple d'un disque qui est composé de titres.

```java
@Entity
public class Album {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToMany(mappedBy = "track", cascade = CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER)
	private List<Track> tracks;
}
```

```java
@Entity
public class Track {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne @JoinColumn(name="albumId")
	private Album album;
}
```

#### fetch

Lorsque l'on lit un objet de type Album, on va aussi lire les tracks.
Par défaut la lecture est lazy (fetch=FetchType.LAZY), c'est à dire à la demande.
Ceci convient la plupart du temps.
Lazy a cependant un inconvénient : il fait plusieurs SELECT dans la base.
Parfois, il est préférable de regrouper tous les SELECT en un seul.
C'est eager (fetch=FetchType.EAGER).

#### cascade

L'album et les tracks sont très liés. On peut vouloir créer, ou supprimer les 2 objets en même temps.
On peut faire cela en écrivant un minimum de code. C'est l'option cascade.
L'option `CascadeType.PERSIST` permet une création de l'album et des tracks sans écrire plus de lignes de code.  
L'option `CascadeType.REMOVE` supprime les tracks, si l'album est supprimé.  
L'option `CascadeType.ALL` répercute toutes les opérations d'Album sur Track.  
Toutes les infos [ici](http://blog.paumard.org/cours/jpa/chap03-entite-operations.html).

#### orphanRemoval

Lorsque l'on met à jour un album et ses tracks, il peut être possible de créer de nouveaux tracks, ou de les modifier.
Quid de la suppression ? La suppression est repérée par l'absence du track dans la maj.  
C'est l'option `orphanRemoval=true` qui permet de supprimer tous les tracks ne sont plus liés à l'album.

## gestion des dates avec Hibernate

La gestion des dates a longtemps été problématique en Java. Il a fallut attendre Java 8 et son API java.time.  
JPA/HIbernate a hérité de cela. Depuis Hibernate 5, vous pouvez utiliser les dates de l'API java 8 java.time.  
En voici la correspondance avec le type du champ de la BD :

| type java | type JDBC |
|-----------|-----------|
| java.time.LocalDateTime | TIMESTAMP
| java.time.LocalDate | DATE
| java.time.LocalTime | TIME
| java.time.Duration | BIGINT
| java.time.Instant | TIMESTAMP
| java.time.OffsetDateTime | TIMESTAMP
| java.time.OffsetTime | TIME
| java.time.ZonedDateTime | TIMESTAMP
