---
title: La POO
weight: 8
template: docs
doc_sections: java
---

## Concept

Dans cette partie, nous allons aborder les concepts de base de la programmation orientée objet, à savoir les **classes**, les **attributs** et les **méthodes**.  
En effet, en plus des librairies java de base qui contiennent beaucoup de classes (pour représenter des listes, des fichiers, des images, ...), on peut se construire ses propres classes.
Une classe est composée d'attributs et de méthodes, elle sert à fabriquer des objets.  
Une classe permet de créer des objets (ou instances).
La classe est comme un moule qui permet de fabriquer toujours les mêmes sortes d'objet.  
Le mot clé `this` à l'intérieur de la classe permet de désigner l'instance sur laquelle on travaille.  
Par exemple si je travaille sur des mails, il est plus simple de créer une classe mail qui regroupe toutes les variables de chaque mail.
Ainsi mail1 et mail2 sont des **instances** de la **classe** Mail.  

> Note : dans cet article, nous ne faisons qu'une initiation à l'objet. Cette notion sera revue en profondeur ultérieurement.

## Utilité

Imaginons un monde Java sans objet. Voici le code que nous devrions écrire pour déclarer 2 mails :

```java
String objet1 = "ton compte";
String destinataire1 = "toto@yopmail.com";
String message1 = "bonjour, votre compte a été désactivé. Au revoir.";

String objet2 = "salut";
String destinataire2 = "pipou@yopmail.com";
String message2 = "Salut, ça va?";
```

Et voici une version avec une **classe** Mail :

```java
Mail mail1 = new Mail("ton compte", "toto@yopmail.com", "bonjour, votre compte a été désactivé. Au revoir.");
Mail mail2 = new Mail("salut","pipou@yopmail.com","Salut, ça va?");
```

## Les attributs

Les attributs sont des variables propres à l'objet. C'est ce qui le décrit.  
Voici comment définir la classe Mail :

```java
public class Mail {
  String message; // les attributs de la classe, ici il y en a 3
  String destinataire;
  String sujet;
}
```

## Le constructeur

Le constructeur définit comment instancier un nouvel objet :

```java
public class Mail {
  String message; // les attributs de la classe, ici il y en a 3
  String destinataire;
  String sujet;

  // ceci est le constructeur, qui va permettre d'initialiser les attributs
  public Mail(String monMessage, String monDestinataire,  String monSujet) {
    this.message = monMessage;
    this.destinataire = monDestinataire;
    this.sujet = monSujet;
  }
}
```

## Les méthodes

Une classe permet aussi de définir des méthodes.
Les méthodes sont des actions que l'on peut effectuer sur des objets.  
Les méthodes peuvent être aussi l'état de l'objet : `maVoiture.isRed()`.  
Une méthode possède une portée (public, private, protected), un nom, un type de retour (ou void si elle ne donne aucun résultat) et des paramètres.

```java
public class Mail {
  String message; // les attributs de la classe, ici il y en a 3
  String destinataire;
  String sujet;

  public Mail(String monMessage, String monDestinataire,  String monSujet) { // ceci est le constructeur, qui va permettre d'initialiser les attributs
    this.message = monMessage;
    this.destinataire = monDestinataire;
    this.sujet = monSujet;
  }

  public void envoyer(){
    System.out.println("votre message a bien été envoyé à "+this.destinataire);
  }

  public static void main(String[] args) {

  }
}
```

On peut ajouter des paramètres à notre méthode :

```java
public class Mail {
  String message; // les attributs de la classe, ici il y en a 3
  String destinataire;
  String sujet;

  public Mail(String monMessage, String monDestinataire,  String monSujet) { // ceci est le constructeur, qui va permettre d'initialiser les attributs
    this.message = monMessage;
    this.destinataire = monDestinataire;
    this.sujet = monSujet;
  }

  public void envoyer(){
    System.out.println("votre message a bien été envoyé à "+this.destinataire);
  }

  public void envoyerDansXHeures(int nbHeures){
    System.out.println("votre message sera envoyé à "+this.destinataire+" dans "+nbHeures+" heures.");
  }

  public static void main(String[] args) {
    Mail mail1 = new Mail("ton compte", "toto@yopmail.com", "bonjour, votre compte a été désactivé. Au revoir.");
    Mail mail2 = new Mail("salut","pipou@yopmail.com","Salut, ça va?");

    mail1.envoyer();
    mail2.envoyer();
  }
}
```

## Modification des attributs d'un objet

Méthodes get et set. Ces méthodes permettent d'accéder aux attributs. On les appelle des accesseurs/mutateurs.  
Nous auront ainsi les méthodes `getMessage()` et `setMessage(String message)`.
Ces méthodes protègent l'attribut `message` d'une mauvaise manipulation.  
Cette notion sera revue ultérieurement.

## Méthodes statiques

Dans le cas où l'on veut créer des fonctions qui n'ont pas besoin de s'appliquer sur des objets, par exemple une classe qui contient plusieurs fonctions de calculs mathématiques, alors on donne le caractère `static` aux méthodes :

```java
public class Calculs {

    /**
     * Calcule la moyenne de deux nombres entiers
     * @param a : le 1er nombre
     * @param b : le second nombre
     * @return : la moyenne
     */
    public static double moyenne(int a, int b) {
        double resultat = (a+b)/2.0; // on divise par un double pour que le résultat soit décimal
        return resultat;
    }

    // on utilise la méthode main pour tester
    public static void main(String[] args) {
        // quelques tests pour la fonction moyenne
        System.out.println(moyenne(10, 12)); // 11 normalement
        System.out.println(moyenne(10, 11)); // 11.5 normalement
    }
}
```

> Ce qu'il faut retenir : une classe permet de structurer des données (les attributs). Une classe permet aussi de définir des actions pour des objets, ce sont les méthodes.
> Si les méthodes n'ont pas besoin d'être propres à un objet, alors elles sont static

Pour plus de détails : [La documentation officielle de java](https://docs.oracle.com/javase/tutorial/java/concepts/index.html)
