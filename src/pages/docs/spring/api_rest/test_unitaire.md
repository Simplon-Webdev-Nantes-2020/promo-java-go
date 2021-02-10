---
title: Les tests unitaires
weight: 6
template: docs
doc_sections: spring
---

## Introduction

Les test unitaires permettent de tester le code écrit par le développeur.  
Les TU doivent être indépendants de leur environnement et rapide à exécuter.  
Il est sous la responsabilité du développeur de les écrire, mais aussi de les exécuter avant de pusher sur github.  
Dans Spring, nous n'allons pas écrire des tests unitaires sur toutes les méthodes.
Nous allons nous concenter sur les méthodes du contrôleur qui réceptionnent une requête, les méthodes publiques du service et les méthodes écrites dans le repository.  
Pour rappel, lors de la reception d'une requête, c'est le contrôleur qui vérifie la validité de la requête, puis appelle le service.
Le service s'occupe de la couche métier et appelle les différents repository. Le modèle est une classe qui sera appellée par ces 3 classes.  
Le repository, le service et le contrôleur dépendent les uns des autres.
Pour les tester individuellement, nous allons utiliser les mock, et plus particulièrement la bibliothèque Mockito.  
Pourquoi les mock ? Prenons l'exemple du service. Un service appelle un repository qui va lire les enregistrements dans la base de données.
Si nous voulons tester le service indépendamment du repository et donc de la base, il faut simuler le repository et donc l'accès à la base de données. C'est le rôle du mock.

## La base de données

Vous verrez de nombreux exemples de tests qui intègrent une base de données. Cette base est souvent une base h2 car celle-ci est directement intégrée à SpringBoot, donc testable sur toute machine.
Elle a en plus les qualités d'être rapide et non persistante, donc toutes les qualités requises pour faire des tests.  
La base de données test ne doit pas la même que celle du main et donc être déclarée dans le dossier src/test.  
Arrêtons nous là ! Nous sommes en train de parler de tests d'intégration.
Nous utilisons JPA, et JPA nous soulage de l'écriture des requêtes SQL, et par rebond des tests associés.  
**Donc dans notre cas, nous n'avons pas de base de données pour nos tests unitaires.**  
Cependant, si vous écrivez des requêtes SQL, il faudra bien les tester.

## Les tests du repository

Comme nous utilisons l'api JPA, le repository est une interface qui contient peu de code.  
Nous n'allons tester que les méthodes que nous avons déclarer.
Nous utilisons la classe `TestEntityManager` qui a le comportement de l'`EntityManager` sans l'accès à la base de données.  
Nous utilisons la matrice Agile GIVEN-WHEN-THAT.  
Dans l'exemple ci-dessous, nous créons 2 artistes (GIVEN).
Nous recherchons les artistes dont le nom contient "ul" (WHEN).
Et nous vérifions que nous avons trouvé qu'un seul artiste.

```java
public class ArtistRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;
     
    @Autowired
    private ArtistRepository repository;

    @DisplayName("find artist by name")
    @Test
    public void findByNameContainingTest( ) {
        //GIVEN
        Artist artistJulian = new Artist("Julian","my bio",120);
        entityManager.persist(artistJulian);
        Artist artistMary = new Artist("Mary","my bio",140);
        entityManager.persist(artistMary);

        //WHEN
        List<Artist> artistSelect = repository.findByNameContaining("ul");

        //THEN
        assertThat(artistSelect.size()).isEqualTo(1);
    }
}
```

## Les tests du service

Pour tester le service unitairement, il faut s'abstraire du repository, sinon cela devient un test d'intégration.
Mais comment tester un service sans le repo ? Tout simplement avec un mock.
Un mock est un objet qui va prendre la place de l'objet réel et simuler son comportement.
Pour cela, nous utilisons la librairie Mockito que nous déclarons dans le pom.xml :

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
```

Ensuite, nous écrivons la classe ArtistServiceTest avec un certain nombre d'annotations.  

```java
@ExtendWith(MockitoExtension.class)
public class ArtistServiceTest {

    @Mock
    ArtistRepository repository;

    @InjectMocks
    ArtistService service = new ArtistServiceImpl();

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @DisplayName("find all artists")
    @Test
    public void findAllTest() {
        ...
    }
}
```

* `@ExtendWith(MockitoExtension.class)` indique que nous utilisons Mockito
* `@Mock` indique que le service est un mock. C'est une annotation de Mockito.
* `@InjectMocks` signifie au service qu'il va injecter des mock
* `@BeforeEach` indique que la méthode init sera lancée avant chaque test unitaire de la classe.

Ensuite, nous allons décrire un test unitaire. Vous trouverez tous les tests du service sur le [github](https://github.com/Simplon-Webdev-Nantes-2020/jukebox/tree/main/src/test/java/co/simplon/jukebox/service).

```java
@DisplayName("find all artists")
@Test
public void findAllTest() {
    //GIVEN
    List<Artist> inputArtists = new ArrayList<>();
    inputArtists.add(new Artist("Gaston","mybio",5));
    inputArtists.add(new Artist("Marguerite","Il était une fois",3));
    inputArtists.add(new Artist("Marie","la petite maison",3));
    when(repository.findAll()).thenReturn(inputArtists);

    //WHEN
    List<Artist> outputArtists = service.findAll("");

    //THEN
    assertThat(outputArtists.size()).isEqualTo(3);

}
```

Nous utilisons toujours la matrice GIVEN-WHEN-THEN.  
WHEN est la recherche de tous les artistes. THEN est le nombre d'artistes attendu.  
Intéressons nous au GIVEN. Le repository est un mock.
L'instruction `when(repository.findAll()).thenReturn(inputArtists)` signifie : lorsque l'on exécute findAll, on retourne une liste de 3 artistes. `when` est en fait le raccourci de `Mockito.when`. C'est un import static.

## Les tests du contrôleur

Comme pour le test du service, nous allons mocker, mais cette fois ci, c'est le service qui est le mock.  
Et nous utilisons des annotations différentes car nous allons simuler une requête http entrante.

```java
@WebMvcTest(controllers = ArtistController.class)
public class ArtistControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArtistService service;

    @DisplayName("Artist list")
    @Test
    public void getAllArtistTest() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(get("/jukebox/artists"))

                //THEN le statut de la réponse http est OK.
                .andExpect(status().isOk());
    }
}
```

Dans cet exemple, nous avons testé la requête http GET qui retourne tous les artistes.  
On va uniquement vérifier que la requête retourne le code status 200.  
`MockMvc` est la classe qui simule la requête http.
`@MockBean` est une amélioration de `Mock` puis qu'elle va nous éviter d'instancier le service.
C'est une annotation Spring.  
Maintenant nous allons tester une requête plus complexe. Il s'agit de la création d'un artiste :

```java
@Test
public void addArtistTest() throws Exception {

    //GIVEN
    ObjectMapper mapper = new ObjectMapper();
    String json = mapper.writeValueAsString(new Artist("Indo","c'est ma bio",50));

    Artist artistOut = new Artist("Indo","c'est ma bio",50);
    artistOut.setId(1);
    when(service.insert(isA(Artist.class))).thenReturn(artistOut);

    //WHEN
    mockMvc.perform(post("/jukebox/artists")
                            .content(json)
                            .contentType(MediaType.APPLICATION_JSON)
                    )
//                .andDo(print()) //pour les test affiche le résultat de la requete dans le log

            //THEN statut de la réponse http est OK.
            .andExpect(status().isOk())

            //Assert le type de contenu de réponse.
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))

            //THEN
            .andExpect(jsonPath("$").exists())
            //Assert la valeur de l'attribut 'name' dans la réponse json.
            .andExpect(jsonPath("$.id").value("1"))
            //Assert la valeur de l'attribut 'name' dans la réponse json.
            .andExpect(jsonPath("$.name").value("Indo"))
            //Assert la valeur de l'attribut 'name' dans la réponse json.
            .andExpect(jsonPath("$.bio").value("c'est ma bio"))
            //Assert la valeur de l'attribut 'name' dans la réponse json.
            .andExpect(jsonPath("$.fanNumber").value("50"));
}

```

`ObjectMapper` permet de convertir un objet Java en chaîne de caractères JSON et donc de l'injecter dans le body.  
`Mockito.when` simule le comportement du service.  
`mockMvc.perform` simule la requête HTTP. Les `andExcept` correspondent aux résultats attendus.  

Tout le code est sur le [github](https://github.com/Simplon-Webdev-Nantes-2020/jukebox/tree/main/src/test/java/co/simplon/jukebox/controller).

## Vérification que tous les contrôleurs soient présents

Avec ce test basique, nous vérifions la présence de tous les contrôleurs dans la classe `JukeboxApplicationTests`.
`assertThat` est une assertion de la librairie assertj.

```java
@SpringBootTest
class JukeboxApplicationTests {

    @Autowired
    private ArtistController artistController;

    @Autowired
    private AlbumController albumController;

    @Autowired
    private TrackController trackController;

    @Autowired
    private PlaylistController playlistController;

    @Test
    void contextLoads() {
        assertThat(artistController).isNotNull();
        assertThat(albumController).isNotNull();
        assertThat(trackController).isNotNull();
        assertThat(playlistController).isNotNull();
    }
}

```

## La couverture de code

La couverture de code permet de vérifier si votre code est bien couvert par les tests unitaires que vous avez écrit.  
Il est impossible d'avoir 100% du code couvert. Il est souvent admis qu'une couverture de test de 60-70% est une bonne couverture.  
Dans Intellij, vous utiliserez l'option *Run with coverage*. Je vous laisse le soin de lire la documentation de Jetbrain.
Dans Eclipse, vous utiliserez Cobertura. C'est un plugin de Maven que vous pouvez lancer en ligne de commande.
Cobertura indique le pourcentage de code ciblé par les tests unitaires.
