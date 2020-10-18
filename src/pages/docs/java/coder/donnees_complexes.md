---
title: Les données complexes
weight: 13
template: docs
doc_sections: java
---

## L'énumération

Une autre façon de déclarer des constantes les énumérations. Il s'agit du n-uplet contenant des identifiants.  
Les énumérations sont très pratiques pour ajouter une valeur au sémantique au code.  
Mot clef : `enum`.  

### Enumération simple

``` java
private static final enum Note{DO, RE, MI, FA, SOL, LA, SI};
```

### Classe Enum

Exemple 1 :

```java
public enum Animal {
  LION ("Animal LION"),
  GAZELLE ("Animal GAZELLE"),
  ELEPHANT ("Animal ELEPHANT"),
  GIRAFE ("Animal GIRAFE");

  private String name = "";

  //Constructeur
  Animal(String name){
    this.name = name;
  }

  public String toString(){
    return name;
  }
}
```

Exemple 2 :

```java
public enum Animal {
  LION("Le Lion", "viande"),
  GAZELLE ("La Gazelle", "herbe"),
  ELEPHANT ("L'éléphant", "végétaux"),
  GIRAFE ("La girafe", "feuilles");

  private String name = "";
  private String food = "";

  //Constructeur
  Animal(String name, String food){
    this.name = name;
    this.food = food;
  }

  public void getFood(){
    System.out.println(food);
  }

  public String getName(){
    return name;
  }

  public static void main(String args[]){
    Animal lion = Animal.LION;
    Animal girafe = Animal.GIRAFE;

    System.out.println("La nourriture de la girafe est : " + girafe.getFood());
    System.out.println(lion.getName() + " mange " + lion.getFood());
  }
}
```

## La chaîne de caractères

Pour manipuler une chaîne de caractères, on utilise la classe String.
La manipulation de texte était lente ou verbeuse jusqu'à l'arrivée de Java 11.  
En effet, une variable String est figée en mémoire : elle a une longueur et une valeur.
Pour la modifier, Java génère une nouvelle zone en mémoire.
On utilise donc d'autres structures si on veut manipuler le texte.  
Voici les différentes classes ou méthodes que vous pouvez rencontrer avant Java 11 :

* La classe `String` avec les méthodes join, substring, format
* la classe `StringTokenizer` est utilisé pour stocker une phrase, c'est à dire une suite de mots.
* Depuis Java 11, les 2 classes suivantes sont obsolètes
  * la classe `StringBuilder`
  * la classe `StringBuffer` est plus souple en gestion de mémoire.

## Les dates

La gestion des dates en Java a toujours été compliquée.
La date est stockée au format numérique. Il s'agit du nombre de millisecondes depuis le 01/01/1970.  
Au cours de ses versions, Java a sorti plusieurs API pour gérer les dates. La multiplicité des classes et leur imperfection n'a pas simplifié les choses.  
Aujourd'hui, il faut utiliser l'API `Date` and `Time`.
Voici des exemples d'utilisation sur le site [developpez.com](http://soat.developpez.com/tutoriels/java/time-date-java8/).  

## Les collections

### Définition

Les collections servent à stocker les données en mémoire.  
Il existe une multitude de collections. Voici les actions que nous pouvons effectuer :

* parcourir les éléments
* ajouter un(des) élément(s)
* supprimer un élément
* accéder à un élément

Il existe 2 grandes familles de collections

* java.util.Collection : constitue un ensemble d'objets,
* java.util.Map : stocke un ensemble d'objets en ajoutant la notion de couple clef/valeur.  

### Les list

Nous avons vu les tableaux dynamiques, avec la classe ArrayList.

#### Les Set

Il s'agit de listes qui ont une particularité supplémentaire : ils n'acceptent pas les doublons.  

* HashSet : utilise la table de hachage
* TreeSet : collection triée

#### Les Map

Map est une collection qui gère stocke les données sous le format (clef,valeur).  

* HashMap : stocke clef et valeur
* LinkedHashMap : est un HashMap amélioré puisqu'il conserve l'ordre d'insertion
* TreeMap : HashMap trié sur la clef
* EnumMap : la clef est une énumération

#### Les Queue

Il S'agit d'une collection qui gère les files d'attente.  
Voici quelques exemples de Queue:

* PriorityQueue : les éléments ne sont pas triés au sein de la collection mais que ceux-ci sont dépilés par ordre croissant. pour planifier des tâches, gérer des priorités
* ConcurrentLinkedQueue : pour la FILO
* ArrayBlockingQueue : pour la FIFO
