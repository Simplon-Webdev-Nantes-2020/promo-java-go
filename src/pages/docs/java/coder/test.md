---
title: Les tests unitaires
weight: 25
template: docs
doc_sections: java
---

## Quid

Le test unitaire (TU) est du code écrit en marge de l'application pour vérifier le bon fonctionnent de l'application.
Le test est exécuté à la demande par le développeur ou lors de la phase de tests.
Le TU n'ai jamais exécuté en production.

## Le TDD

Le principe de base du TDD : écrire les tests avant le code.  
Dans une écriture classique de code, on écrit son programme puis on teste s'il est correct.
En TDD, on fait l'inverse. On se pose les questions :

* Que fait ma méthode ?
* Quels sont les données en entrée ?
* Quel type de résultat retourner ?
* Quel résultat retourner quand j'ai telles données en entrée ?

Notez : dans Java-training, vous avez utilisé le TDD.

## Écriture des tests

Pour écrire les tests, nous utilisons la librairie JUnit5.
Vous trouverez toute la documentation [ici](https://junit.org/junit5/docs/current/user-guide/#writing-tests).

### Comment écrire un test

* le test est séparé de l'application (dans un dossier test)
* le test est écrit dans une classe appartenant au même package que la classe testée
* le test est une série d'assertions

### Les annotations

Les annotations sont mises en début de chaque test.

* `@Test`  
Indique que c'est une méthode de test
* `@DisplayName`  
Au niveau de la classe => meilleure lecture du log
* `@Nested`  
Insertion d'une classe de test dans le test => découpage logique
* `@Disabled`  
Ne pas effectuer le test

### Les assertions

Une assertion est une proposition que l'on avance comme vrai. En JUnit5, il s'agit de méthodes de la bibliothèque.

* `assertEquals`  
vérifie égalité de 2 objets
* `assertNotEquals`  
vérifie que les 2 objets soit différents
* `assertSame`  
vérifie que c'est le même objet (même référence)
* `assertSame`  
vérifie que les 2 objets n'ont pas la même référence
* `assertArrayEquals`  
vérifie égalité 2 tableaux
* `assertIterableEquals`  
vérifie que 2 collections sont égales, même éléments et ordre identique
* `assertLinesMatch`  
Sur des listes de String. Possibilité de tester de RegEx. Plus de [détails](https://www.jmdoudoux.fr/java/dej/chap-junit5.htm#junit5-5-6)
* `assertTrue`  
vérifie que le résultat est vrai
* `assertFalse`  
vérifie que le résultat est faux
* `assertAll`  
agglomère une suite d'assertions
* `assertNull`
vérifie que le résultat est null  
* `assertNotNull`
vérifie que le résultat n'est pas vide  
* `assertTrows`
pour les exceptions  
* `assertDoesNotThrow`  
Ne retourne pas d'exceptions

## Tester les méthodes privées

Une méthode en private est interne à une classe et donc n'est pas testable.
Ceci est bien dommage, car si on veut la tester, il faut agrandir sa visibilité uniquement pour le test.  
Nous avons 3 solutions :

### Utiliser une méthode publique appelante

On part du principe qu'une méthode privée ne se teste pas directement.
Elle se teste via une méthode publique qui appelle cette méthode.  
En résumé, on ne teste directement que les méthodes publiques, les méthodes privés sont testés indirectement.  
Le coverage indiquera si la méthode est testé.

### Protected

Passer la méthode en protected. Ceci ouvre un peu la visibilité.
On part du principe que le test est consommateur de la méthode (c'est un client), et donc que ce code doit être visible pour le test.

#### Visible for testing

On peut ajouter l'annotation `@VisibleForTesting` de la librairie `com.google.guava`.

pom.xml

```xml
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>28.1-jre</version>
</dependency>
```

code

```java
@VisibleForTesting
protected isTheBest(int[] array) {
  ...
}
```

### Friendly

Rappel : friendly est la visibilité par défaut, qui est au niveau package.
Le but est d'alléger le code de la classe qui devient trop grosse.
On créé une nouvelle classe visible uniquement de ce package dans le quel on déporte notre méthode.
Cette méthode devient elle aussi friendly.

### La reflection

C'est une méthode verbeuse qui alourdit terriblement le test unitaire.
Si cela vous intéresse, lisez cet [article](https://www.baeldung.com/java-method-reflection).  
A n'utiliser qu'en cas de sécurité (code qui doit impérativement rester secret).

## Couverture de code (coverage)

La couverture de code est un diagnostique effectué sur l'application.
Ce diagnostique détermine le pourcentage de code ayant un test unitaire, et indique les endroits de votre application qui ne sont pas couverts par des tests.
L'IDE Eclipse intègre en son sein l'outil EclEmma. Vous pouvez aussi utiliser Cobertura.
