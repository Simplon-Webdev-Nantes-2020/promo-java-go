---
title: Simple CRUD
weight: 2
template: docs
doc_sections: spring
---

## Le projet

Pour étudier Spring, nous allons commencer par écrire un petit projet.
Nous allons gérer un jukebox. Ce jukebox contient uniquement des artistes.  
Nous pouvons créer un enregistrement, le lire, le modifier, et le supprimer (CRUD) ; ceci grâce à une API rest.
Vous pouvez consulter les sources du projet sur le [github de la promo](https://github.com/Simplon-Webdev-Nantes-2020/jukebox-simple-crud).  
Ensuite, vous approfondirez vos connaissances en ajoutant des albums. Ce sera le sujet du chapitre [Une api rest](../../api_rest/).  

Voici la classe à développer :

![classe artiste](artiste.jpeg)

## Mise en place du CRUD pour artiste

Ce projet met à disposition l'API suivante :

* GET /jukebox/artists  
liste les informations de l'ensemble des enregistrements Artiste.  
* GET /jukebox/artists/[id]  
renvoie les informations d'un enregistrement Artiste.  
* POST /jukebox/artists  
crée un nouvel enregistrement Artiste avec les informations fournies.  
* PUT /jukebox/artists/[id]  
met à jour l'enregistrement Artiste correspondant à l'id fourni avec les informations fournies.  
* DELETE /jukebox/artists/[id]  
supprime l'enregistrement Artiste correspondant à l'id fourni.

## Création du serveur

Grâce à [initializr](https://start.spring.io/), vous créez le projet "co.simplon.jukebox".
Vous ajoutez les dépendances "Spring Web", "Spring Data JPA", et "H2 Database".  
Vous importez votre projet dans Eclipse ou IntelliJ.  
A partir de là, vous pouvez écrire votre code, le compiler et lancer le serveur.  
Vous pouvez aussi le faire en ligne de commande dans le dossier racine du projet :  
`mvnw clean install` pour compiler.  
`mvnw spring-boot:run` pour lancer le projet.  

Vous pouvez tester l'API avec le logiciel [Postman](https://www.postman.com/downloads/) ou avec votre navigateur web.

## JPA

A partir de maintenant, nous allons travailler avec JPA/Hibernate.  
Pour cela, il faut vérifier la nouvelle dépendance dans le **pom.xml**.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

Pour gérer une base de données h2, nous ajoutons aussi une dépendance :

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

## Les ressources

Ce sont les ressources nécessaires au bon fonctionnement du serveur.  
Tout ce projet ne peut fonctionner sans paramétrage et ressources.
Les ressources sont dans le dossier src/main/ressource.  
Il peut avoir un dossier ressource côté test qui servira pour l'exécution des tests unitaires.

### les properties

Le paramétrage se décrit dans le fichier **application.properties**.
Ce fichier est situé dans le dossier src/main/ressource.

#### Connexion à la base de données

Spring se comporte comme un client vis à vis de la base de données.
Il lui faut donc une connexion.
C'est ce que nous déclarons dans le fichier **application.properties**.

```ini
spring.datasource.url=jdbc:h2:mem:jukebox
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.platform=h2
spring.h2.console.enabled=true
```

Vous remarquez que c'est une base de données h2. Cette base est embarquée dans Spring.
H2 est très pratique lorsque l'on ne peut pas installer de base de données sur un serveur.
C'est aussi très pratique pour exécuter les tests unitaires.
H2 peut être permanente, ou uniquement en mémoire. C'est ce choix qui est fait dans ce projet.
Ceci signifie que lorsque votre serveur Spring tombe, tout est perdu.  

Pour vérifier les données dans la base h2, nous avons ajoutez le paramètre `spring.h2.console.enabled`.
Si vous allez sur l'url `localhost:8080/h2-console`, vous accéderez à la base en mémoire.  

#### Le paramétrage

Spring est zéro conf pour un démarrage simple.
Cela n'empêche pas d'ajouter du paramétrage selon ses besoins.
Voici quelques paramètres intéressants pour démarrer :  

Suppression de la bannière Spring au démarrage :

```ini
spring.main.banner-mode=off
```

Création, maj de la base de données au démarrage. Ici il faut que ce soit none pour la base h2 :

```ini
spring.jpa.hibernate.ddl-auto=none
```

Trace des requêtes SQL dans la console :

```ini
spring.jpa.show-sql = true
```

Écriture dans un fichier de log :

```ini
logging.level.root=INFO
logging.file.name=c:/log/springboot-jukebox.log
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

### Les scripts SQL

Pour créer la base de données, nous fournissons dans ce projet le schéma et les données.
Ce sont des fichiers sql qui sont pris en compte au démarrage du serveur.  
Il faut les positionner dans le dossier src/main/resources (au même niveau que application.properties)

Le fichier **schema.sql** :

```sql
CREATE SCHEMA jukeboxdb AUTHORIZATION SA;

use jukeboxdb;

CREATE TABLE artist (
    id   INTEGER   PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    bio VARCHAR(255),
    fan_number INTEGER
);
```

Le fichier **data-h2.sql** :

```sql
use jukeboxdb;
insert into artist(name, bio, fan_number)
    values('Celtic woman','En 2004, les producteurs Sharon Browne et David Downes, directeur musical...',31760);
insert into artist(name, bio, fan_number)
    values('M. Pokora','Né le 26 septembre 1985 à Strasbourg d''un père footballeur et d''une mère fonctionnaire',1310570);
insert into artist(name, bio, fan_number)
    values('Kendji Girac','Kendji Maillé est né à Périgueux, en Dordogne, le 3 juillet 1996.',1014955);
insert into artist(name, bio, fan_number)
    values('Julien Doré','Julien Doré est né le 7 juillet 1982 à Alès dans le Gard. Après des études ',708365);
insert into artist(name, bio, fan_number)
    values('Patrick Fiori','Patrick Fiori, né le 23 septembre 1969 sous le nom de Jean-François Chouchayan',216351);
insert into artist(name, bio, fan_number)
    values('Trois Cafés Gourmands','',167304);
insert into artist(name, bio, fan_number)
    values ('Nolwenn Leroy','C''est le 28 septembre 1982 que voit le jour, à Saint-Renan (Finistère) que voile jour Nolwenn Le Magueresse',230900);
```

## Vérification

Vérifiez que votre serveur fonctionne bien et se connecte à la base de données.  
Sous Eclipse ou Intellij, lancer votre application Spring. Regarder les messages dans la console.  
Dans le navigateur Web, exécutez l'url localhost:8080/h2-console. Si rien ne s'affiche, vérifiez :

* l'url de la base : jdbc:h2:mem:jukebox
* la présence des 3 dépendances dans votre projet (web, jpa, h2).
* les scripts sql sont présents
* le nom du schéma de la base est correct et le même dans tous les scripts.

## Le rôle de chaque classe

Pour écrire une API Rest, vous devez créer quatre packages :

* co.simplon.jukebox.artiste.model pour l'entité
* co.simplon.jukebox.artiste.repository pour le lien avec la base de données
* co.simplon.jukebox.artiste.service pour la couche métier
* co.simplon.jukebox.artiste.controller pour le contrôleur

Dans ce projet, un package ne contient en général qu'une seule classe.
Chaque package est associé à un rôle.  

Le modèle MVC sépare le code en 3 responsabilités.
Lorsque l'on écrit une api rest, la partie vue est presque inexistante car celle-ci est gérée par une autre application.
La vue se résume à l'envoi de données au format JSON.
Spring fait cette action à notre place.  

Reste le contrôleur et le modèle.
Le modèle, c'est l"entité décrite dans le package model.
A ce package, s'ajoute le package repository.  
Le contrôleur, c'est le package controller, associé au package service.  

Allons vite voir cela en détail.

## Le modèle

C'est l'entité Artist. Nous avons donc une classe contenant tous les attributs de l'artiste :  

```java
@Entity
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String bio;

    private Integer fanNumber;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public Integer getFanNumber() {
        return fanNumber;
    }
    public void setFanNumber(Integer fanNumber) {
        this.fanNumber = fanNumber;
    }
}
```

La visibilité des attributs est privée, et nous utilisons les getter/setter pour accéder à leur valeur.  
C'est ici que ce fait le mapping entre la classe @Entity et la base de données.
La classe Artist est reliée à la table *artist* de la base de données, et les attributs deviennent des champs.
Tout champ écrit en camel case est traduit en snake case.  
Nous notons aussi des annotations : @Entity, @Id, @GeneratedValue.

* [@Entity](/docs/spring/parametrage/annotation/#annotations_sur_l_entit) indique à Spring qu'il s'agit d'une entité (un modèle).
* [@id](/docs/spring/parametrage/annotation/#annotation_sur_les_champs) identifie la clef primaire.
* [@GeneratedValue](/docs/spring/parametrage/annotation/#annotation_sur_les_champs) indique que la clef primaire est calculée.  
`(strategy = GenerationType.IDENTITY)` indique que c'est un id auto-incrémenté.

## Un petit test de vérification

Après avoir créer votre projet avec Initializr et créer votre Entity, il est intéressant de tester votre site et vérifier qu'il répond à une requête simple.  
Pour cela, on crée le contrôleur et on ajoute une route de test (/jukebox/artist/hello).

```java
@RestController
@RequestMapping("/jukebox")
public class ArtistController {

    @CrossOrigin
    @GetMapping("/artists/hello")
    ResponseEntity<Artist> getArtistToto() {
        Artist hello = new Artist();
        hello.setName("Hello");
        hello.setBio("Comment allez-vous ?");
        hello.setFanNumber(100);
        return ResponseEntity.ok().body(hello);
    }
}
```

Testez sur votre navigateur [localhost:8080/jukebox/artists/hello](localhost:8080/jukebox/artists/hello).

Nous reviendrons sur les annotations.

## La persistance de données

Cette classe est responsable de la persistance. C'est elle qui lit et écrit les enregistrements de la base de données et renseigne le modèle.
Cette classe est étrangement vide, et d'ailleurs c'est une interface.  

```java
public interface ArtistRepository extends JpaRepository<Artist, Long>{
    public List<Artist> findByNameContaining(String name) ;
}
```

Aussi étrange que cela puisse paraître, c'est ici que sont générées les requêtes SQL.  
Vous en doutez ? Mettez dans la configuration de l'application, une trace des requêtes générées :  
Dans le fichier application.properties :

```ini
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

Et lors d'un accès à la base de données vous aurez ce type de message dans le log :

```log
2020-12-14 13:28:45.663 DEBUG 12456 --- [nio-8080-exec-3] org.hibernate.SQL                        : select artist0_.id as id1_1_0_, artist0_.bio as bio2_1_0_, artist0_.fan_number as fan_numb3_1_0_, artist0_.name as name4_1_0_ from artist artist0_ where artist0_.id=?
2020-12-14 13:28:45.663 TRACE 12456 --- [nio-8080-exec-3] o.h.type.descriptor.sql.BasicBinder      : binding parameter [1] as [BIGINT] - [2]
```

Nous savons que c'est le repository du modèle Artist grâce au type générique (généricité ou notation en diamant) de JpaRepository.  
C'est la magie de Spring que nous étudierons plus tard.  
Nous voyons son utilisation dans le service.

## Le service

Nous créons une interface et son implémentation :

```java
public interface ArtistService {
    Optional<Artist> findById(Long id);
    List<Artist> findAll(String search);
    Artist insert(Artist artist);
    Artist update(Long id, Artist artist);
    void delete(Long id);
}
```

```java
@Service
public class ArtistServiceImpl implements ArtistService {

    @Autowired
    private ArtistRepository repository;

    @Override
    public List<Artist> findAll(String search) {
        ...
    }

    @Override
    public Optional<Artist> findById (Long id) {
        ...
    }

    @Override
    public Artist insert(Artist artist) {
        ...
    }

    @Override
    public Artist update(Long id, Artist artist) {
        ...
    }

    @Override
    public void delete(Long id) {
        ...
    }

}
```

Le service contient la couche métier, c'est ici qu'est écrit le code le plus complexe.
Nous pouvons avoir à gérer plusieurs modèles. Nous y reviendrons.  
Dans notre cas le code se résume à un appel du modèle.
D'abord étudions les annotations, puis regardons chaque méthode.

### Annotations du service

* [@Service](/docs/spring/parametrage/annotation/#component_repository_service) indique que c'est un service
* [@Autowired](/docs/spring/parametrage/annotation/#autowired_ou_inject) indique que nous utilisons le modèle Artist et plus précisément l'interface ArtistRepository. C'est une injection, donc c'est Spring qui s'occupe de l'instanciation.

### findAll

```java
    public List<Artist> findAll(String search) {
        if (! "".equals(search))
            return repository.findByNameContaining(search);
        else
            return repository.findAll();
    }
```

Cette méthode retourne tous les artistes sous forme de liste.
Quand le paramètre search est vide, elle appelle la méthode findall() de ArtistRepository.
Or cette méthode n'est pas déclarée.
En fait ArtistRepository hérite de JpaRepository.
Grâce à un système d'injection de dépendance (DI), Spring trouve dans son architecture la bonne classe qui est capable d'exécuter la requête SQL.  
Quand le paramètre search est renseigné, elle appelle la méthode findByNameContaining(search).
Cette méthode est déclarée mais pas implémentée. Spring a prévu pour nous cette situation et donc possède dans ses réserves du code pour exécuter la requête `SQL select ... where artist.name like ...`.

### findById

```java
@Override
public Optional<Artist> findById (Long id) {
    return repository.findById(id);
}
```

Cette méthode retourne un objet Optional. C'est assez récent dans l'histoire de Spring.
Vous trouverez beaucoup d'exemples sur le web où findById renvoie le modèle (Artist).  
Le type Optional est expliqué dans le contrôleur.

### insert

```java
public Artist insert(Artist artist) {
    return repository.save(artist);
}

```

Insert crée un enregistrement dans la base, et renvoie un artiste.
En effet, nous avons besoin de connaître son nouvel id.  
Elle appelle la méthode save() du modèle.

### update

```java
public Artist update(Long id, Artist artist) {

    Optional<Artist> optionalArtist = this.findById(id);

    if(optionalArtist.isPresent()) {

        Artist artistToUpdate = optionalArtist.get();
        artistToUpdate.setName(artist.getName());
        if (artist.getBio() != null)
            artistToUpdate.setBio(artist.getBio());
        if (artist.getFanNumber() != null)
            artistToUpdate.setFanNumber(artist.getFanNumber());
        return repository.save(artistToUpdate);
    }

    return null;
}
```

Update met à jour l'artiste, mais uniquement les champs qui sont renseignés (not null).
Elle renvoie l'artiste modifié.
Elle appelle les méthodes save() et findById() du modèle.

### delete

```java
public void delete(Long id) {
    Optional<Artist> artist = this.findById(id);
    if (artist.isPresent()) {
        repository.delete(artist.get());
    }
}
```

Cette méthode supprime un artiste s'il est présent.
Pour cela, nous vérifions sa présence.
Elle appelle la méthode delete() du modèle.

## Le contrôleur

Ici nous sommes au niveau de l'URL, c'est à dire le **I** (Interface) du mot **API**.
C'est une API Rest (appellée aussi restFull), la ressource est la donnée que nous partageons avec le client.
Ici la resource est identifiée par l'URL, et c'est l'id qui différencie chaque resource.

```java
@RestController
@RequestMapping("/jukebox")
public class ArtistController {

    @Autowired
    ArtistService service;

    @CrossOrigin
    @GetMapping("/artists")
    public ResponseEntity<List<Artist>> getAllArtist(@RequestParam(value="search", defaultValue="") String search) {
        ...
    }

    @CrossOrigin
    @GetMapping("/artists/{id}")
    ResponseEntity<Artist> getArtistById(@PathVariable(value="id") long id) {
        ...
    }

    @CrossOrigin
    @PostMapping("/artists")
     ResponseEntity<Artist> addArtist(@RequestBody Artist artist){
        ...
    }

    @CrossOrigin
    @PutMapping("/artists/{id}")
    ResponseEntity<Artist> updateArtiste(@PathVariable(value="id") long id, @RequestBody Artist artist){
        ...
    }

    @CrossOrigin
    @DeleteMapping("/artists/{id}")
    ResponseEntity<Artist> deleteArtist(@PathVariable(value="id") long id){
        ...
    }

}
```

### Annotations du contrôleur

Vous retrouverez les explications dans cet [article](/docs/spring/parametrage/annotation/#la_gestion_des_url) du blog.

* `@RestController`  
indique que c'est un contrôleur
* `@RequestMapping("/jukebox")`  
Contrôleur que s'occupe de toutes les url commençant par /jukebox
* `@Autowired`  
injection du service
* `@CrossOrigin`  
permet d'avoir un serveur api et un serveur nodejs pour l'UI.
* `@GetMapping`  
URL avec le verbe GET
* `@PostMapping`  
URL avec le verbe POST
* `@PutMapping`  
URL avec le verbe PUT
* `@DeleteMapping`  
URL avec le verbe DELETE

* `@RequestParam`  
récupère un paramètre dans l'URL après le endpoint (séparateur ?)
* `@PathVariable`  
récupère un paramètre dans l'URL (path)
* `@RequestBody`  
récupère les infos dans le body

### GET /artists

```java
@GetMapping("/artists")
public ResponseEntity<List<Artist>> getAllArtist(@RequestParam(value="search", defaultValue="") String search) {
    List<Artist> listArtist;
    try {
        listArtist = service.findAll(search);
    } catch (Exception e) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(listArtist);
}
```

Cette méthode traite une requête `/jukebox/artists?search=qque chose` avec le verbe GET.
Elle récupère le paramètre search (`@RequestParam`), et retourne une réponse dans le body : `ResponseEntity.ok().body()`.
Cette réponse est une liste d'artistes.
S'il n'y a pas d'erreur, nous renvoyons le code 200 (.ok()), sinon l'erreur 404 (.notFound()).

### GET /artists/{id}

```java
@GetMapping("/artists/{id}")
ResponseEntity<Artist> getArtistById(@PathVariable(value="id") long id) {
    Optional<Artist> artist = service.findById(id);
    if (artist.isEmpty()) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(artist.get());
}
```

Cette méthode traite une requête `/jukebox/artists/xxx` avec le verbe GET.
Elle récupère le paramètre dans l'url (`@PathVariable`), et retourne une réponse dans le body : `ResponseEntity.ok().body()`.
Le type Optional contient un objet Artist, il évite le `nullPointerException`.

### POST /artists

```java
@PostMapping("/artists")
    ResponseEntity<Artist> addArtist(@RequestBody Artist artist){
        return ResponseEntity.ok().body(service.insert(artist));
    }
```

Cette méthode traite une requête `/jukebox/artists` avec le verbe POST.
POST est une création de la ressource.Pour vous en rappeller : dans un blog, on POSTe un article.
L'artiste est dans le body (`@RequestBody`).

### PUT /artists

```java
@PutMapping("/artists/{id}")
    ResponseEntity<Artist> updateArtiste(@PathVariable(value="id") long id, @RequestBody Artist artist){
        Artist updatedArtiste = service.update(id, artist);
        if(updatedArtiste == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(updatedArtiste);
    }
```

Cette méthode traite une requête `/jukebox/artists/xxx` avec le verbe PUT.
PUT est un écrasement de la ressource.
C'est pour cette raison que l'id est dans le path.
L'artiste est dans le body (`@RequestBody`).

### DELETE /artists

```java
@DeleteMapping("/artists/{id}")
ResponseEntity<Artist> deleteArtist(@PathVariable(value="id") long id){
    Optional<Artist> artist = service.findById(id);
    if(artist.isEmpty())
        return ResponseEntity.notFound().build();

    service.delete(artist.get().getId());
    return ResponseEntity.accepted().build();
}
```

Cette méthode traite une requête `/jukebox/artists/xxx` avec le verbe DELETE.
DELETE supprime la ressource.
Nous avons besoin uniquement de l'id qui est dans le path (`@PathVariable`).
