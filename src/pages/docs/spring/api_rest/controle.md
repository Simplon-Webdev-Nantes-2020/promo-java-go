---
title: Les contrôles
weight: 5
template: docs
doc_sections: spring
---

Lorsque l'on écrit une API, il est important de vérifier les données en entrée.
Même si les tests de saisie  sont faits côté front, il faut les refaire côté back.
En effet, il ne faut jamais faire confiance à ce que l'on nous envoie.  
Vous devez faire deux types de tests :

* Vérifier que les données définissant l'objet envoyé sont valides
* Vérifier que l'objet est bien synchronisé avec la base de données

## Vérification de la validité des données

Cette vérification se fait au niveau du modèle, grâce à une annotation au niveau de l'attribut ou de son getter.  
Voici quelques exemples dans le projet :

```java
    @PastOrPresent(message = "release date must be past")
    private LocalDate releaseDate;

    @NotBlank(message = "Name can't be empty")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @PositiveOrZero(message = "fan number must be positive")
    private Integer fanNumber;
```

Vous trouvez d'autres exemples sur le site de [baeldung](https://www.baeldung.com/javax-validation).

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

### Les contraintes d'unicité

A venir

### Renvoi des codes erreur

Lorsque vous essayez de valider un objet json avec une erreur, Spring renvoie automatiquement un code erreur 400.
Le hic est que l'on ne voit pas le message d'erreur.
Une solution proposée est de reformuler le json de retour, en ajoutant les différents messages de validation.
Cette méthode `handleValidationExceptions` est ajoutée dans chaque contrôleur :

```java
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        Map<String, Object> response = new LinkedHashMap <>();
        response.put("timeStamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Valid exception");
        response.put("messages", errors);
        return response;
    }
```

## Contrôle d'intégrité de la base

Lorsque l'on ajoute, modifie ou supprime un enregistrement, l'intégrité de la base peut être compromise.
Ces contrôles se font en amont.  
Ce peut être le cas d'une maj alors qu'il existe une image plus récente dans la base.  
Ici nous avons décidé de Contrôler si un track est lié à une playlist, quand on désire le supprimer.
S'il est lié, on refuse la suppression du track.  
Ce contrôle se fait dans le `TrackController` :

```java
@CrossOrigin
@DeleteMapping("/tracks/{id}")
ResponseEntity<Track> deleteTrack(@PathVariable(value="id") long id){
    Optional<Track> track = service.findById(id);
    if(track.isEmpty())
        return ResponseEntity.notFound().build();

    // verification non lie a une playlist
    if (!track.get().getPlaylists().isEmpty())
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Track in playlist");

    service.delete(track.get().getId());
    return ResponseEntity.accepted().build();
}

```

Et si le message d'erreur est vide dans le body de la requête de retour, il faut vérifier que le fichier de paramétrage (application.properties) contient bien la ligne suivante :

```ini
# message d'erreur lors d'une mauvaise requete
server.error.include-message=always

```

