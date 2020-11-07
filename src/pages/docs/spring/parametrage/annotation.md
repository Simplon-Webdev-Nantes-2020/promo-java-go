---
title: Annotations
weight: 2
template: docs
doc_sections: spring
---

Les annotations sont essentielles pour le fonctionnement de Spring.
Elles simplifient énormément les configurations qui étaient auparavant dans des fichiers XML.
Elles sont très nombreuses, et donc demandent un apprentissage progressif.

## Référentiel

Les annotations sont utilisées dans Java depuis Java 5.
Spring utilise les annotations du JSR (norme Java), des framework(comme hibernate), des api (comme JPA), ou ses propres annotations.
Il n'est pas toujours simple de s'y retrouver.
Il arrive qu'une annotation Spring soit reprise dans une JSR sous un autre nom, et toutes les deux ont la même fonction.  
Aussi, je vous conseille de prendre par ordre : les annotations Spring, puis API, ensuite JSR, et en dernier framework.
Pourquoi, parce que vous écrivez du code pour Spring, donc l'annotation Spring est prioritaire.
JSR est la norme Java, donc évolue peu.
Si vous utilisez une API, il y a peu de chance de changer d'API sans modifier son code.
Par contre, dans Spring vous pouvez remplacer un framework par un autre sans modifier son code.
C'est le cas de d'Hibernate qu'on peut remplacer par EclipseLink.

## Fonctionnement

Lors du lancement de l'application, Spring référence toutes les annotations et les classe dans son référentiel.
Une annotation va indiquer la conduite du code qui suit.
Par exemple @Controller indique que c'est un controller.  
Ainsi, quand Spring référence tous les contrôleurs, il est capable de répondre rapidement à une requête du client.  
Ce petit bout de code très efficace a cependant un gros inconvénient : si on oublie de l'écrire, l'EDI ne dit rien (pas d'erreur), mais le code ne fonctionne pas. D'où une perte de temps de développement.  
Nous détaillons ici quelques annotations. Elles seront abordées au fur et à mesure de la formation.
Vous retrouverez toutes les annotations sur ce [site](http://javamidnight.blogspot.com/2017/11/le-guide-complet-des-annotations-du.html).  

## Les annotations de l'application

### @SpringBootApplication

@SpringBootApplication se place dans la classe principale de SpringBoot. Il est l'addition de 3 annotations :

* Configuration
* EnableAutoConfiguration
* ComponentScan

### @Configuration

Tag la classe comme étant une source de définitions de bean pour l'application.

### @EnableAutoConfiguration

Pom.xml facile la gestion des dépendances en créant en autre un chemin de classe. Ainsi lors de l'exécution de l'appli, Java recherche les classes en parcourant ce chemin.
@EnableAutoConfiguration indique à Spring de commencer d'ajouter les beans en fonction des paramètres de chemin de classe.
Ainsi s'il rencontre spring-webmvc, Spring sait qu'il s'agit d'une application Web.

### @ComponentScan

Indique à Spring les packages à analyser pour trouver les composants.  
Par défaut, il scanne tous les packages sous la classe annotée par ComponentScan.
4 attributs à retenir :

* basePackages : indique les packages à analyser
* useDefaultFilters : true => filtre @Component,@Repository,@Service,@Controller
* includeFilters : filtre avec une regEx
* excludeFilters : filtre avec une regEx

```java
@ComponentScan(basePackages = {"co.simplon.demo1.message"})
```

## Les composants

Le bean (haricot) est une unité de base en Java (on parle de JavaBean). C'est un composant qui respectent certaines règles.  
Spring compartimente les classes en fonction de de leur utilité.
On dit qu'il fonctionne par couche : Aspect Oriented Programming (AOP). Nous retrouvons par exemple le contrôleur, le service, le DAO.
Chaque couche comporte un type de bean. Ces beans sont repérés par des annotations.
Pour les détecter automatiquement, Spring utilise des annotations de balayage de classpath.
Il enregistre ensuite chaque bean dans ApplicationContext.

### @component, @repository, @service

* @Component Stéréotype générique pour indiquer tout composant de Spring.
* @Service annote la couche service
* @Repository annote la couche de persistance

```java
@Component("messageBean")
public class MessageBean {
    public void message() {
        System.out.println("Bonjour cher(e) apprenant(e) !");
    }

    public void message(String phrase) {
        System.out.println("Bonjour cher(e) apprenant(e), voici ta phrase : "+phrase);
    }
}
```

```java
/**
* Il s'agit d'une application simple comme un simple projet Maven avec un main
* Il ne s'agit pas d'une application Web
*/
@SpringBootApplication
public class Springdemo01Application {

public static void main(String[] args) {
    ApplicationContext context = SpringApplication.run(Springdemo01Application.class, args);
    MessageBean monObjetMessage = (MessageBean) context.getBean("messageBean");
    monObjetMessage.message();
    monObjetMessage.message("C'est facile SpringBoot !");
}
```

## L'injection de dépendance

Spring fonctionne souvent avec un couple classe/interface.
Lorsque dans du code, vous utilisez l'interface, Spring la relie automatiquement à la classe.
S'il y a plusieurs classes pour une interface, il recherche la classe la plus appropriée.
Vous pouvez aussi indiquer la classe à instancier.

### @Autowired (ou @Inject)

Vous annotez un constructeur ou une méthode avec cette dernière, Spring va instancier automatiquement l'objet lors de l'utilisation.
Dans l'exemple précédent, messageBean n'a pas été instancié par un new, et pourtant on l'utilise dans 2 méthodes.
@Inject est pratiquement identique à @Autowired : Autowired, c'est Spring, @Inject c'est JSR.
Les annotations @Inject et @Autowired peuvent être positionnées :

* sur un attribut
* sur un setter
* sur une méthode ayant au moins un paramètre (ce sont ces paramètres qui seront injectés)
* sur un constructeur ayant au moins un paramètre (idem méthode)

### @Qualifier

Utilisé si vous avez plusieurs classes pour une interface, qualifier permet le nommage lors de la déclaration de la classe, et de spécifier la classe lors de l'appel.

```java
@Repository
@Qualifier("jdbc")
public class DaoJdbc implements IDao {
    // Ajouter du code
}

@Qualifier("hibernate")
public class DaoHibernate implements IDao {
    // Ajouter du code
}

@Qualifier("springData")
public class DaoData implements IDao {
    // Ajouter du code
}
```

```java
public class Metier {
    @Autowired @Qualifier("jdbc")
    private IDao dao; //

}
```

### @Resource

Lors de l'appel, resource concatène Autowired et Qualifier

```java
public class Métier {
    @resource(name="jdbc")
    private IDao dao; //
}
```

## La gestion des URL

### @Controller, @RestController

Le controller est la classe chef d'orchestre. Elle reçoit une information et dispatche le traitement.
Les annotations vont être essentiellement d'ordre décisionnel.
@Controller indique un controller pour du SOAP.
@RestController, c'est pour une API rest.

### @RequestMapping

Une requête HTTP est composée d'une url, d'un verbe, et de paramètres.
RequestMapping indique que c'est ce contrôler qui se charge de la requête.
Placée au dessus de la classe, c'est le début de l'url.
Placée au dessus d'un méthode : décomposition de l'URL.
Accolade dans l'url => paramètre
Method = verbe (get, post, put delete)

#### @GetMapping, @PutMapping, @PostMapping, @DeleteMapping

```java
@GetMapping("/get/{id}")
```

Equivalent de

```java
@RequestMapping(path = "/get/{id}", method = RequestMethod.GET)
```

#### @PathVariable

Extraction du paramètre compris dans l'URL
http://localhost:8080/demo/dire/everybody

#### @RequestParam

Extraction du paramètre compris dans l'URI
demo/hello?monde=promo

#### @RequestBody

Extrait le paramètre d'entré qui est dans le body. Utilisation avec post et put.

#### @ResponseBody

Indique le type de réponse à une requête HTTP. Ici réponse dans le body. Vous remarquez le message de retour n'est pas mis en forme.
Si vous avez un restController, il est inutile d'indiquer ResponseBody

### @CrossOrigin

Permet l'activation du CORS.
Pour rappel, une appli client riche (type Angular) utilise 2 serveurs : un pour l'interface (NodeJs) et un pour les données (Spring).
Le @CrossOrigin s'implémente de différente façons :

* Sur une RequestMapping : C'est la requête qui permet le CORS.
* Sur le contrôleur : @CrossOrigin(origins = "http://manulep.fr", maxAge = 3600)
* sur les deux : Spring combine les différentes options

### @Valid

@Valid permet de vérifier si l'objet json reçu dans le body est valide. Ce contrôle s'effectue avec les annotations de la classe Entity (ici People).

```java
@CrossOrigin
@PostMapping("/people")
People addPeople(@Valid @RequestBody People people){
    return repository.save(people);
}
```

#### exemple de contrôleur

```java
@Controller
@RequestMapping("/demo")

public class HelloController {

    @Autowired
    private Hello messageBean;

    @RequestMapping(path = "/dire", method = RequestMethod.GET)
    @ResponseBody
    public String afficherMessage() {
        return this.messageBean.dire();
    }

    @GetMapping("/dire/{phrase}")
    @ResponseBody
    public String afficherMessage(@PathVariable("phrase") String phrase) {
        return this.messageBean.dire(phrase);
    }
}
```

## Divers

### @Value

Value permet de donner une valeur à un attribut.

* une chaîne en dur : inutile
* une valeur stockée dans un fichier properties
* une variable système

```java
@Value("string value")
private String stringValue;

@Value("${value.from.file:some default}")
private String valueFromFile;

@Value("${systemValue}")
private String systemValue;
```

## ORM

### Annotations sur l'entité

* @Entity définit la classe comme une entité (modèle).
* @Table relie l'entité à une table dans la BD.

### Annotation sur les champs

* @Id
* @GeneratedValue : lié à l'id
* @NotBlank, @NotNull, @NotEmpty : vérification non vide
* @NotEmpty(message = "{error.login.empty})" : non vide avec message d'erreur dans un fichier i18n
* @Email(message = "{error.email.format}") : validation d'un email
* @Pattern : expression régulière
* @Column : correspondance avec le champ de la table
* @OneToOne, @OneToMany, @ManyToOne, @ManyToMany

### Autres annotations sur les champs à étudier

* @Basic, avec fetch lazy/eager
* @Transient : getter => attribut non persistant
* @Temporal : pour les dates
* @Enumerated : énumération
* @Embedded : Aggrégation qui n'est pas une relation. ex: Classe adresse qui est à plat dans la table de la BD. Il  faut définir la classe aggrégée avec @Embeddable.
