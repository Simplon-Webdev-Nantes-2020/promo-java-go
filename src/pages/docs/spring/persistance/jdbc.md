---
title: JDBC
weight: 1
template: docs
doc_sections: spring
---

Pour étudier JDBC, nous partons d'un petit projet qui permet de gérer des acteurs dans la base de données de demo Sakila de MySQL.

## Le principe

JDBC signifie *Java Database Connectivity*. C'est une interface (API) qui permet d'accéder aux bases de données relationnelles.  
Elle a l'avantage d'être commune à tous les SGBDR et ainsi d'éviter l'écrire d'un code spécifique selon la base de données utilisée.  
Une entité est liée à une table.
Lorsque l'on utilise un ORM, nous décrivons l'entité et indiquons la table correspondante.
Reste le problème d'accéder à la base de données. Il faut exécuter des requêtes SQL.
En utilisant un ORM, nous faisons confiance à ce dernier. C'est l'ORM qui va générer les requêtes et les exécuter.  
En utilisant JDBC, nous descendons d'un niveau.
C'est nous, développeur, qui écrivons les requêtes SQL, et alimentons l'entité.
Cette méthode demande plus d'écriture de code.
En contre partie, nous savons ce qui est exécuté et donc pouvons affiner les performances et la sécurité.

## Le DAO

DAO signifie Data Access Object. Il s'agit d'un Design pattern qui complète le modèle MVC.
Le principe est de séparer la donnée du traitement technique (ici l'accès à la base de donnée).  
La donnée est appellée DTO (Data Transfer Object). Il s'agit de la classe modèle, celle qui contient les attributs.  
L'accès à la base de données est une classe DAO, elle contient les requêtes SQL et alimente le DTO.

## Code source

Vous trouverez le code source complet sur le github de la promo dans le repo [springboot-jdbc](https://github.com/Simplon-Webdev-Nantes-2020/springboot-jdbc).  
Le code source est organisé selon les principes du MVC (Model View Controller) :

* co.simplon.springboot.actor.model : package contenant les éléments du modèle (DTO)
* co.simplon.springboot.actor.controller : package contenant les contrôleurs de l'application
* co.simplon.springboot.actor.dao : package contenant les classes dao (accès à la base de données)
* co.simplon.springboot.actor.service : package contenant les classes métiers (business)

Dans ce projet, la vue est intégrée au projet. La vue n'est pas une application séparée.
Cette vue est écrite en JQuery pour des raison de rapidité d'écriture. Aujourd'hui, JQuery est obsolète (bien que toujours très présent sur le Web).  
Les éléments relatifs à la Vue sont présents dans le répertoire src/main/resources/static (partie front).  

## Le modèle

### Actor.java

Il s'agit de la classe de notre modèle de données. C'est le DTO. Sa structure correspond à la structure de la table associée dans la base de données.

```java
public class Actor {
    private Long id;
    private String lastName;
    private String firstName;
    private Timestamp lastUpdate;
    public Actor() {
        super();
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    ...
}
```

## La couche DAO

La couche DAO est la couche qui gère la persistance des données.
Cette couche apporte les méthodes CRUD classiques pour gérer la classe Actor.
Cette classe contient la connexion à la base de données et les requêtes SQL.
  
### ActorDAO.java

Il s'agit d'une interface java classique qui contient les méthodes pour créer, modifier, supprimer et retrouver des données de type **Actor** dans la base de données.  

```java
public interface ActorDAO {
    public List<Actor> listActors() throws Exception;
    public Actor getActor(Long id) throws Exception;
    public Actor insertActor(Actor actor) throws Exception;
    public Actor updateActor(Actor actor) throws Exception;
    public void deleteActor(Long id) throws Exception;
}

```

### ActorDAOImpl.java

ActorDAOImpl est la classe d'implémentation associée à l'interface **ActorDAO**.
Elle porte le code capable de produire et exécuter les requêtes SQL nécessaires à la persistance des données de la classe **Actor**.

#### La structure

La classe est composée d'un constructeur de cinq méthodes répondant aux 5 fonctions du CRUD.  
Elle est surmontée de l'annotation **@Repository** permettant au système de résolution des dépendances d'identifier les classes DAO.
Pour accéder à la base de données, nous utilisons l'attribut datasource.
On utilise la classe **JdbcTemplate** pour récupérer le datasource.
Vous remarquez l'annotation **@Autowired** qui signifie que c'est Spring qui s'occupe de tout.  
Ainsi on obtiendra une connexion automatiquement configurée avec les informations du fichier *application.properties*.

Les informations de connexion vers la base de données :

```properties
spring.datasource.url=jdbc:mysql://localhost/sakila?useSSL=false
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

La classe ActorDAOImpl résumée :

```java
@Repository
public class ActorDAOImpl implements ActorDAO {

    private DataSource datasource;

    @Autowired
    public ActorDAOImpl(JdbcTemplate jdbcTemplate) {
        this.datasource = jdbcTemplate.getDataSource();
    }

    @Override
    public List<Actor> listActors() throws Exception {
    }

    @Override
    public Actor getActor(Long id) throws Exception {
    }

    @Override
    public Actor insertActor(Actor actor) throws Exception {
    }

    @Override
    public Actor updateActor(Actor actor) throws Exception {
    }

    @Override
    public void deleteActor(Long id) throws Exception {
    }
}

```

#### La connexion à la base de données

À partir du datasource, nous ouvrons une connexion.
Lorsque la connexion est ouverte, Spring se comporte comme un client vis à vis de la base.

```java
Connection con = datasource.getConnection()
...
con.close();
```

#### La liste des acteurs

La requête est écrite dans une String. C'est du pur SQL.
Cette requête est envoyée sous la forme d'une preparedStatement (une requête préparée).
On utilise la méthode executeQuery().  
On utilise une preparedStatement pour des raisons de sécurité (injection SQL).  
Spring attend le résultat en mode synchrone.
Le résultat est un stream composé de lignes. C'est le resultSet.  
Chaque ligne contient le même nombre d'éléments. Ce sont les colonnes.  
On extrait les valeurs du resultSet soit par le numéro de la colonne, soit par le nom de la colonne. On utilise getString, getLong, getTimestamp selon le format de la donnée.

```java
String sql = "SELECT * FROM actor ";
PreparedStatement pstmt = con.prepareStatement(sql);
ResultSet rs = pstmt.executeQuery();

while (rs.next()) {
    Long id = rs.getLong("actor_id");
    String firstName = rs.getString("first_name");
    String lastName = rs.getString("last_name");
    Timestamp lastUpdate = rs.getTimestamp("last_update");
}
```

Ce qui donne la méthode listActors():

```java
public List<Actor> listActors() throws Exception {
    Actor actor;
    Connection con = datasource.getConnection();
    PreparedStatement pstmt = null;
    ResultSet rs;
    String sql;
    ArrayList<Actor> aLlistOfActor = new ArrayList<Actor>();

    try {
        sql = "SELECT * FROM actor ";
        pstmt = con.prepareStatement(sql);

        rs = pstmt.executeQuery();

        while (rs.next()) {
            actor = getActorFromResultSet(rs);
            aLlistOfActor.add(actor);
        }
    } catch (Exception e) {
        e.printStackTrace();
        throw e;
    } finally {
        pstmt.close();
        con.close();
    }

    return aLlistOfActor;
}

private Actor getActorFromResultSet(ResultSet rs) throws SQLException {
    Actor actor = new Actor();
    actor.setId(rs.getLong("actor_id"));
    actor.setFirstName(rs.getString("first_name"));
    actor.setLastName(rs.getString("last_name"));
    actor.setLastUpdate(rs.getTimestamp("last_update"));
    return actor;
}
```

Et la méthode getActor(Long id)

```java
    public Actor getActor(Long id) throws Exception {
        Connection con = datasource.getConnection();
        PreparedStatement pstmt = null;
        ResultSet rs;
        Actor actor = null;

        try {
            String sql = "SELECT * FROM actor WHERE actor_id = ?";
            pstmt = con.prepareStatement(sql);
            pstmt.setLong(1, id);

            rs = pstmt.executeQuery();
            if (rs.next())
                actor = getActorFromResultSet(rs);
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        } finally {
            pstmt.close();
            con.close();
        }
        return actor;
    }

```

#### La mise à jour d'un acteur

La mise à jour d'un enregistrement concerne trois requêtes SQL : INSERT UPDATE et DELETE.  
Pour cela nous avons toujours besoin d'une connexion et d'un preparedStatement et d'un resultSet.  
L'insertion de donnée dans le preparedStatement se fait avec les méthodes setString, setLong, setTimestamp.  
L'exécution de la requête par la méthode execupteUpdate().  
En insertion de donnée, on récupère l'id par la méthode getGeneratedKeys().  

Ce qui donne pour la création :

```java
public Actor insertActor(Actor actor) throws Exception {
    Connection con = datasource.getConnection();
    PreparedStatement pstmt = null;
    Actor result = null;
    int i = 0;
    Timestamp updateTime = new Timestamp(System.currentTimeMillis());

    try {
        String sql = "INSERT INTO actor (first_name, last_name, last_update) VALUES (?,?,?)";
        pstmt = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
        pstmt.setString(++i, actor.getFirstName());
        pstmt.setString(++i, actor.getLastName());
        pstmt.setTimestamp(++i, updateTime);

        pstmt.executeUpdate();

        ResultSet rs = pstmt.getGeneratedKeys();
        if (rs.next()) {
            actor.setId(rs.getLong(1));
            actor.setLastUpdate(updateTime);
            result = actor;
        }
    } catch (SQLException e) {
        e.printStackTrace();
        throw e;
    } finally {
        pstmt.close();
        con.close();
    }

    return result;

}
```

Ce qui donne pour la modification d'un enregistrement :

```java
public Actor updateActor(Actor actor) throws Exception {
    Connection con = datasource.getConnection();
    Actor result = null;
    PreparedStatement pstmt = null;
    int i = 0;
    Timestamp updateTime = new Timestamp(System.currentTimeMillis());
    try {
        String sql = "UPDATE actor SET first_name = ?, last_name = ?, last_update = ? WHERE actor_id = ?";
        pstmt = con.prepareStatement(sql);
        pstmt.setString(++i, actor.getFirstName());
        pstmt.setString(++i, actor.getLastName());
        pstmt.setTimestamp(++i, updateTime);
        pstmt.setLong(++i, actor.getId());

        int resultCount = pstmt.executeUpdate();
        if(resultCount != 1)
            throw new Exception("Actor not found !");
        actor.setLastUpdate(updateTime);
        result = actor;
    } catch (SQLException e) {
        e.printStackTrace();
        throw e;
    } finally {
        pstmt.close();
        con.close();
    }
    return result;
}
```

Ce qui donne pour la suppression :

```java
public void deleteActor(Long id) throws Exception {
    Connection con = datasource.getConnection();
    PreparedStatement pstmt = null;

    try {
        String sql = "DELETE FROM actor WHERE actor_id = ?";
        pstmt = con.prepareStatement(sql);
        pstmt.setLong(1, id);

        int result = pstmt.executeUpdate();
        if(result != 1)
            throw new Exception("Actor not found !");
    } catch (SQLException e) {
        e.printStackTrace();
        log.error("SQL Error !:" + pstmt.toString(), e);
        throw e;
    } finally {
        pstmt.close();
        con.close();
    }
}

```

#### jdbctemplates

>Dans ces exemples, nous nous sommes descendu très bas au niveau de l'accès à la base de données, ceci dans un but explicatif.
Dans un développement de logiciel, nous utiliserions jdbctemplates.
Vous pouvez vous inspirer du tuto [suivant](https://www.springboottutorial.com/spring-boot-and-spring-jdbc-with-h2).

## La couche service

C'est la couche métier de l'application.  
C'est ici qu'est décrit le comportement des classes (diagramme des séquences), les transactions, les relations entre les classes.  
Le service sert de transition, est appelé par le contrôleur et agit sur le modèle.
Bien qu'il fasse partie du modèle, il est placé dans le package service.

### ActorService

C'est l'interface

```java
public interface ActorService {
    public List<Actor> getAllActors() throws Exception;
    public Actor getActor(Long id) throws Exception;
    public Actor addActor(Actor actor) throws Exception;
    public Actor updateActor(Long id, Actor actor) throws Exception;
    public void deleteActor(Long id) throws Exception;
}
```

### ActorServiceImpl

La classe implémentée

```java
@Service
public class ActorServiceImpl implements ActorService{

    @Autowired
    private ActorDAO dao;

    public List<Actor> getAllActors() throws Exception {
        return dao.listActors();
    }
    public Actor getActor(Long id) throws Exception {
        return dao.getActor(id);
    }
    public Actor addActor(Actor actor) throws Exception {
        return dao.insertActor(actor);
    }
    public Actor updateActor(Long id, Actor actor) throws Exception {
        return dao.updateActor(actor);
    }
    public void deleteActor(Long id) throws Exception {
        dao.deleteActor(id);
    }
}
```

Nous retrouvons les cinq fonctions du CRUD : les quatre fonctions classiques, plus le getAll.  

L'annotation @Service indique que c'est un service.  
L'annotation @Autowired indique que l'on va utiliser le modèle ActorDAO.

### Le contrôleur

#### ActorController.java

Il s'agit du contrôleur de notre application pour le modèle de données Actor.
C'est cette classe qui va gérer l'API REST de notre application.  
L'annotation @Controller ou @RestController, indique qu'il s'agit d'un contrôleur.  
L'annotation @RequestMapping, indique le contrôleur et la méthode appelé lorsque de la réception d'une requête.  
C'est ici que l'on va vérifié l'exactitude des informations fournies par le client.

```java
@RestController
@RequestMapping("/api")
public class ActorController {

    @Autowired
    private ActorService actorService;

    @RequestMapping(value = "/actors", method = RequestMethod.GET)
    public ResponseEntity<?> getAllActors(){
        List<Actor> listActor = null;
        try {
            listActor = actorService.getAllActors();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(listActor);
    }

    @RequestMapping(value = "/actor/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getActor(@PathVariable Long id){
        Actor actor = null;
        try {
            actor =actorService.getActor(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        if(actor == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(actor);
    }

    @RequestMapping(value = "/actor", method = RequestMethod.POST)
    public ResponseEntity<?> addActor(@RequestBody Actor actor){
        Actor resultActor = null;
        String firstName = actor.getFirstName();
        if((firstName == null) || (firstName.isEmpty()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The firstname is not set !");
        String lastName = actor.getLastName();
        if((lastName == null) || (lastName.isEmpty()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The lastname is not set !");
        try {
            resultActor = actorService.addActor(actor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(resultActor);
    }

    @RequestMapping(value = "/actor/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateActor(@RequestBody Actor actor,@PathVariable Long id) throws Exception {
        Actor result = null;
        String firstName = actor.getFirstName();
        if((firstName == null) || (firstName.isEmpty()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The firstname is not set !");
        String lastName = actor.getLastName();
        if((lastName == null) || (lastName.isEmpty()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The lastname is not set !");
        try {
            result = actorService.updateActor(id, actor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @RequestMapping(value = "/actor/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteActor(@PathVariable Long id){
        try {
        actorService.deleteActor(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
```

## La vue

Comme cela a déjà été évoqué, les éléments relatifs à la vue sont présents dans le répertoire main/src/resources/static.
Il s'agit en fait d'un client html/javascript classique qui sera inclus au projet et déployé sur le serveur.
Ce client utilisera l'API REST pour accéder aux données des acteurs via des requêtes Ajax.

Pour étudier ce fonctionnement, consulter les fichiers :

* **index.html** : fichier html point d'entrée du client pour le client web.
* **actor.js** : fichier javascript contenant les fonctions du client web.

## Ce que l'on retient

Il existe des classes qui ont des fonctions définies

* contrôleur
* service
* entité
* accès à la base de données

Il existe une seule vue

* elle est en HTML dans un dossier précis
* elle est envoyée une seule fois au client
* elle envoie des requêtes Ajax au serveur
* au retour de la requête, elle met en forme les données

Tout est relié grâce à la magie de Spring et des annotations.
