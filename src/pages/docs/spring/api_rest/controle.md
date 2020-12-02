---
title: Les contrôles
weight: 5
template: docs
doc_sections: spring
---

Lorsque l'on écrit une API, il est important de vérifier les données en entrée.
Même si les tests de saisie  sont faits côté front, il faut les refaire côté back.
En effet, il ne faut jamais faire confiance à ce que l'on nous envoie.  
Ceci fait partie des bonnes pratiques de sécurité de votre application.  
Vous devez faire deux types de tests :

* Vérifier que les données définissant l'objet envoyé sont valides.
* Vérifier que l'objet et l'action effectuée dessus sont cohérents avec les données existantes.

## Vérification de la validité des données

Cette vérification se fait au niveau du modèle, grâce à une annotation au niveau de l'attribut ou de son getter.
Vous pouvez vérifier qu'une donnée doit être renseignée, un entier positif, un email bien formaté, etc...  
Voici quelques exemples dans le projet :

```java{1,4,5,8}
@PastOrPresent(message = "release date must be past")
private LocalDate releaseDate;

@NotBlank(message = "Name can't be empty")
@Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
private String name;

@PositiveOrZero(message = "fan number must be positive")
private Integer fanNumber;
```

Vous trouvez d'autres exemples sur le site de [baeldung](https://www.baeldung.com/javax-validation).  
Ces contrôles sont effectués grâce à l'annotation `@Valid` que l'on met dans le contrôleur au niveau d'une route :

```java{2}
@PostMapping("/artists")
ResponseEntity<Artist> addArtist(@Valid @RequestBody Artist artist){
    return ResponseEntity.ok().body(service.insert(artist));
}
```

### Tableau des validations possibles

Annotation|Contrôle
-|-
@Null|que la valeur du type concerné soit null
@NotNull|que la valeur du type concerné soit non null
@AssertTrue|que la valeur soit true
@AssertFalse|que la valeur soit false
@DecimalMin|que la valeur soit supérieure ou égale à celle fournie sous la forme d'une chaîne de caractères encapsulant un BigDecimal
@DecimalMax|que la valeur soit inférieure ou égale à celle fournie sous la forme d'une chaîne de caractères encapsulant un BigDecimal
@Digits|qu'un nombre n'a pas plus de chiffres avant et après la virgule que ceux précisés en paramètre
@Size|que la taille de la donnée soit comprise en les valeurs min et max fournies
@Min|que la valeur du type soit un nombre entier dont la valeur doit être supérieure ou égale à la valeur fournie en paramètre
@Max|que la valeur du type soit un nombre entier dont la valeur doit être inférieure ou égale à la valeur fournie en paramètre
@Pattern|la conformité d'une chaîne de caractères avec une expression régulière
@Valid|que l'objet soit valide
@Future|que la date soit dans le futur (postérieure à la date courante)
@Past|que la date soit dans le passé (antérieure à la date courante)

## Les contraintes d'unicité

Insérer des enregistrements dans une base de données, c'est aussi empêcher la création de doublon.
Nous avons les contraintes sur un attribut, et les contraintes sur un ensemble d'attributs.

### Contrainte sur un attribut

Dans notre cas, il ne doit pas avoir 2 artistes qui ont le même nom.
Première chose à vérifier : le schéma de la base de données contient-il une contrainte UNIQUE sur le champ artist.name ?

```sql{3}
CREATE TABLE artist (
    id   INTEGER   PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    bio VARCHAR(255),
    fan_number INTEGER
);
```

Ensuite JPA doit être en phase avec la base, on ajoute la contrainte d'unicité `@Column(unique = true)` sur l'attribut.

```java{4}
@Entity
public class Artist {
    ...
    @Column(unique = true)
    private String name;
}
```

### Contrainte sur un ensemble d'attributs

Ici, il s'agit d'une contrainte sur un ensemble de champs.
Dans notre exemple, c'est la classe Track qui ne doit pas avoir de doublon sur le titre par rapport à un album.
Il faut donc avoir une contrainte dans le schéma de la base. C'est la contrainte uc_title :

```sql{8}
CREATE TABLE track (
    id   INTEGER   PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    duration INTEGER,
    preview VARCHAR(200),
    album_id INT,
    foreign key (album_id) references album(id),
    constraint uc_title unique (title, album_id)
);
```

Et une contrainte dans JPA au niveau de l'entité : `@Table (uniqueConstraint)`

```java{2-4}
@Entity
@Table(
    uniqueConstraints=@UniqueConstraint(name = "uc_title", columnNames={"title", "album_id"})
    )
public class Track {
    ...
    private String title;
    ...
    @ManyToOne @JoinColumn(name="album_id")
    private Album album;
```

## Contrôle d'intégrité de la base

Les contraintes d'unicité, les clefs étrangères protègent la base de données.
Cependant elles ne sont pas suffisantes. Il faut parfois ajouter du code supplémentaire
Ces contrôles ne peuvent pas être faits par une simple annotation.
Il faut écrire ce contrôle dans le contrôleur ou le service.  
Ce peut être le cas d'une maj alors qu'il existe une image plus récente dans la base.
Ici nous avons décidé de refuser la suppression d'un track, si ce dernier est lié à une playlist.
Ce contrôle est écrit dans la classe `TrackServiceImpl` :

```java{6-7}
public void delete(Long id) {
    Optional<Track> track = this.findById(id);
    if (track.isPresent()) {

        // verification que le track n'est pas dans une playlist
        if (!track.get().getPlaylists().isEmpty())
            throw new AppException("Invalid Delete", "Track in playlist");
        repository.delete(track.get());
    }
}
```

## Retour des messages d'erreur au client

Par défaut, lors d'une erreur, les messages envoyés aux client ne sont pas explicites : absence de message, ou message très technique.
Pour corriger cela, nous allons agir à deux niveaux : le paramétrage et la récupération de l'erreur avant l'envoi au client.

### Message absent

Lors d'une erreur, un code erreur est bien renvoyé, mais le message explicatif contenu dans body est vide.

```json{5}
{
    "timestamp": "2020-12-01T19:06:32.400+00:00",
    "status": 403,
    "error": "Forbidden",
    "message": ,
    "path": "/jukebox/tracks/20"
}
```

Dans ce cas, il faut vérifier que le fichier de paramétrage (application.properties) contient bien la ligne suivante :

```ini{2}
# message d'erreur lors d'une mauvaise requete
server.error.include-message=always
```

### Récupérer l'erreur

Nous allons utiliser l'annotation `@ExceptionHandler`.
Cette annotation permet d'attraper une exception et donc de retourner un message correct.  
Nous allons aussi profiter de AOP de Spring pour centraliser dans une même classe le traitement de toutes les exceptions que l'on veut transformer.
Cette centralisation est faite dans la classe `ExceptionAdvice` annotée par `@RestControllerAdvice`.  
Voici la classe :

```java
package co.simplon.jukebox.common;

@RestControllerAdvice
public class ExceptionAdvice {

    /**
     * message d'erreurs donnees invalides
     * @param e : exception
     * @param request : la requete qui est en erreur
     * @return
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, Object> handleValidationExceptions(MethodArgumentNotValidException e,
             HttpServletRequest request) {
        Map<String, String> errors = new LinkedHashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return mapMessage(request, HttpStatus.BAD_REQUEST,"valid exception", errors);
    }

    /**
     * message d'erreur contrainte d'unicite
     * @param e : exception 
     * @param request : la requete qui est en erreur
     * @return
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public Map<String, Object> handleDataIntegrityExceptions(DataIntegrityViolationException e,
             HttpServletRequest request) {
        return mapMessage(request, HttpStatus.BAD_REQUEST,"data integrity violation exception",
                "record allready exist");
    }

    /**
     * message d'erreur applicative
     * @param e : exception
     * @param request : la requete qui est en erreur
     * @return
     */
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AppException.class)
    public Map<String, Object> handleDataIntegrityExceptions(AppException e, HttpServletRequest request) {
        return mapMessage(request, HttpStatus.FORBIDDEN,e.getCategory(), e.getMessage());
    }

    /**
     * mise en forme du message retourne
     * @param request : la requete qui est en erreur
     * @param status : status de retour de la requete
     * @param error : type d'erreur
     * @param errors : message d'erreur
     * @return
     */
    private Map<String, Object> mapMessage(HttpServletRequest request, HttpStatus status,
             String error, Object errors) {
        Map<String, Object> response = new LinkedHashMap <>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", status.value());
        response.put("error", error);
        response.put("message", errors);
        response.put("path", request.getRequestURI().toString());
        return response;
    }
}
```

Les explications :  
`@RestControllerAdvice` indique que c'est une classe qui *conseille* le contrôleur.
Associée à l'annotation `@ExceptionHandler`, cette classe permet de récupérer l'exception de retour.
C'est en quelque sorte un middleware placé juste avant l'envoi du message de retour.  
`ExceptionHandler` indique quelle exception il intercepte.  
`@ResponseStatus` indique le status de la réponse http.

#### Exception contrainte d'intégrité

Si les contraintes d'unicité protègent notre base de données, le message envoyé à l'utilisateur n'est franchement pas très parlant :

```json{4-5}
{
    "timestamp": "2020-12-01T08:48:48.523+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "message": "could not execute statement; SQL [n/a]; constraint [\"JUKEBOX_SCHEMA.UC_TITLE_INDEX_4 ON JUKEBOX_SCHEMA.TRACK(TITLE, ALBUM_ID) VALUES 25\"; SQL statement:\ninsert into track (id, album_id, duration, preview, title) values (null, ?, ?, ?, ?) [23505-200]]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement",
    "path": "/jukebox/tracks"
}
```

De plus, nous avons une belle exception java `JdbcSQLIntegrityConstraintViolationException` dans le log.  
La méthode `handleDataIntegrityExceptions` récupère l'exception `DataIntegrityViolationException` et corrige tout cela.

```java
@ResponseStatus(HttpStatus.BAD_REQUEST)
@ExceptionHandler(DataIntegrityViolationException.class)
public Map<String, Object> handleDataIntegrityExceptions(DataIntegrityViolationException e, 
        HttpServletRequest request) {
    return mapMessage(request, HttpStatus.BAD_REQUEST,
                "data integrity violation exception", "record allready exist");
}
```

#### Erreur de validité

Lors de la reception d'une requête, dans le contrôleur nous mettons l'annotation `@Valid`.
S'il y a une ou plusieurs erreurs, Spring lève l'exception `MethodArgumentNotValidException`.
La méthode `handleValidationExceptions` récupère tous les champs (forEach) avec le message d'erreur associé, et l'envoi au format JSON.  
Ici vous découvrez la programmation fonctionnelle apparue avec Java 8.

```java{5}
@ResponseStatus(HttpStatus.BAD_REQUEST)
@ExceptionHandler(MethodArgumentNotValidException.class)
public Map<String, Object> handleValidationExceptions(MethodArgumentNotValidException e,
         HttpServletRequest request) {
    Map<String, String> errors = new LinkedHashMap<>();
    e.getBindingResult().getAllErrors().forEach((error) -> {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
    });
    return mapMessage(request, HttpStatus.BAD_REQUEST,"valid exception", errors);
}
```

#### Mise en forme du message

```java
private Map<String, Object> mapMessage(HttpServletRequest request, HttpStatus status,
         String error, Object errors) {
    Map<String, Object> response = new LinkedHashMap <>();
    response.put("timestamp", LocalDateTime.now());
    response.put("status", status.value());
    response.put("error", error);
    response.put("message", errors);
    response.put("path", request.getRequestURI().toString());
    return response;
}
```

Cette méthode met en forme le message de retour envoyé au client. Le message a la même structure que le message par défaut.
