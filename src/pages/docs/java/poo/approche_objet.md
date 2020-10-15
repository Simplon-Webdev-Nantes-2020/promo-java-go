---
title:  Démarrer en POO
weight: 6
template: docs
doc_sections: java
---

En Java tout est objet, sauf les types primitifs comme les entiers et caractères.  
Les objets appartiennent forcément à une classe, qui divisent cet univers.
Tout code doit être écrit dans une classe.  

## La classe

Une classe déclare des propriétés communes à un ensemble d'objets d'une part, et les méthodes d'autre part.  
C'est en quelque sorte un squelette.  
Lorsque l'on instancie un objet (`new Object`), on le fait par rapport à une classe.  
A ce moment, la JVM alloue une place en mémoire contenant les propriétés de l'objet.  
Une classe est identifiée par le mot réservé `class`, son nom, et son body contenu dans des accolades `{}`.  
Voici un exemple de déclaration de la classe `Animal` par le mot clef `class`.

``` java
class Animal {
}
```

### Les propriétés

Les propriétés caractérisent un objet, par exemple une couleur, un nombre de pétales. Ce sont des composants.  
On déclare les propriétés en début de classe. Il s'agit de variables propres à un objet (instance).  
En Java, on utilise aussi bien de terme de *propriété* que d'*attribut*.  
Nous ajoutons trois caractéristiques à la classe `Animal` :

``` java
class Animal {
    String nom;
    String race;
    int nombreDePattes;
}
```

### Les méthodes

Les méthodes correspondent aux comportements. C'est l'équivalent des fonctions.  
Une méthode renvoie un résultat typé. Si la méthode renvoie `void`, cela signifie qu'il n'y a pas de résultat.  
Pour avoir un code lisible, nommer vos méthodes explicitement. Il s'agit d'une phrase sans son sujet, et cette phrase a un sens. Le verbe est écrit à l'infinitif.

``` java
class Animal {
    String nom;
    String race;
    int nombreDePattes;

    void exprimerSaJoie() {
        switch (this.race) {
            case "chien":
                System.out.println("Ouaf Ouaf");
                break;
            case "chat":
                System.out.println("Miaou");
                break;
            case "oiseau":
                System.out.println("Cui cui");
                break;
            default:
                System.out.println("I'm happy");
                break;
        }
    }
}
```

Et voici l'appel de la méthode :

```java
monObjet.exprimerSaJoie();
```

## Les classes et objets

Il ne faut pas confondre classe et objet.  

* Une classe est à la fois une description et un conteneur.  
* Un objet est une entité. On appelle cela une instance.  
* Un objet appartient forcément à une classe.  

Imaginons créer un logiciel de location de voitures, nous devons décrire une voiture.
La voiture est définie par :

* des propriétés : la marque, le nombre de places, la couleur
* et des comportements ou des aptitudes : elle consomme du carburant, est-elle neuve ?, un client peut la louer.

Ici nous avons décrit la voiture. On n'a pas valoriser les propriétés. C'est donc la classe `Voiture`.  
  
Maintenant, créons une voiture (une instance) : c'est une Ferrari, elle a 2 places, elle est rouge.  
Puis une deuxième voiture : c'est une Renault, elle a 5 places, elle est grise.  
On a mis des valeurs dans les propriétés. Et on ne déclare pas de comportement, car il est décrit dans la classe.  

## Le constructeur et le destructeur

Tout objet a une vie, et donc naît et meurt.
Une classe n'a pas de vie.  
On instancie toujours un objet en désignant sa classe.  
Pour créer un objet on utilise le mot clef `new`. Cet appel exécute une méthode particulière : le constructeur.  
Cette méthode réserve une place en mémoire et renvoie l'adresse de cet emplacement. On utilise parfois le terme pointeur.  
Cette adresse est stockée dans une variable qui a pour type le nom de la classe.  
Lorsqu'un objet est détruit, la méthode appelée est le destructeur.

### Le constructeur

Le constructeur est une méthode qui porte le nom de la classe.  
En fait, on doit parler de constructeurs, car on peut avoir plusieurs constructeurs avec des paramètres différents.  
Dans cette méthode, on renseigne les propriétés par des valeurs passées en paramètre.  
La déclaration du constructeur n'est pas obligatoire.

Voici le constructeur avec tous les attributs de la classe.

``` Java
public Animal(String nom, String race, int nombreDePattes) {
    this.nom = nom;
    this.race = race;
    this.nombreDePattes = nombreDePattes;
}
```

Et l'instanciation de l'objet

``` Java
Animal titi = new Animal("titi", "oiseau", 2);
```

### Le destructeur

En Java, le développeur n'écrit pas de code pas pour supprimer un objet.  
C'est le ramasse-miette GC (garbage collector) qui s'exécute en tâche de fond et détruit tous les objets qui ne sont plus référencés (utilisés).  
Un objet n'est plus référencé quand on lui assigne la valeur `null`, ou quand son scope (périmètre de vie) est fini (notion vue plus tard).  
Nous n'avons donc aucune idée du moment où sera détruit l'objet.  
Lorsque que l'objet est détruit, juste avant sa destruction le moteur Java appelle la méthode `finalize`.  
Comme l'appel est aléatoire, il est extrêmement rare et **déconseillé** d'implémenter du code dans le destructeur.

## Static

Le mot clef `static` est une notion **très** importante à comprendre.  
Jusqu'à présent nous avons vu les méthodes et propriétés liées à un objet (instance).  
Cependant, il peut arriver d'avoir un besoin lié à une classe. Dans ce cas on utilise le mot `static` dans la déclaration.  
Un élément déclaré `static` appartient à la classe et non à l'instance.  

Une méthode (ou une propriété) `static` est **commune à toutes les instances**. Elle n'est pas instanciée.  
Une méthode static ne peut pas appeler une méthode (ou une propriété) d'instance sans instancier un objet.  
Par contre une méthode d'instance peut appeller une méthode static.  
Ici on se rapproche du paradigme de programmation procédurale : notion de variable et de fonction.  
Comme nous sommes en Java, il faut limiter l'utilisation de static et programmer le plus possible en objet.

## La classe Animal

La classe Animal au complet :

```java
public class Animal {

    // propriété de la classe
    static int totalAnimal = 0;

    // propriétés de l'instance
    String nom;
    String race;
    int nombreDePattes;

    // constructeur
    public Animal(String nom, String race, int nombreDePattes) {
        this.nom = nom;
        this.race = race;
        this.nombreDePattes = nombreDePattes;
        totalAnimal++;
    }

    // une methode de l'objet
    String formulerMonNom() {
        return "Je m'appelle " + this.nom; // appel de la propriété nom
    }

    // une methode de l'objet
    void parler() {
        System.out.println(this.formulerMonNom()); // appel d'une méthode de l'objet
        System.out.println("Je suis un animal et j'ai " + this.nombreDePattes + " pattes");
    }

    void exprimerSaJoie() {
        switch (this.race) {
            case "chien":
                System.out.println("Ouaf Ouaf");
                break;
            case "chat":
                System.out.println("Miaou");
                break;
            case "oiseau":
                System.out.println("Cui cui");
                break;
            default:
                System.out.println("I'm happy");
                break;
        }
    }

    // une methode de la classe
    static void afficherNombreDAnimaux() {
        System.out.println("**************************");
        System.out.println("Il y a " + totalAnimal + " animaux");
    }

    // main est le point d'entrée du programme
    public static void main(String[] args) {
        Animal animalTiti = new Animal("titi", "oiseau", 2); // creation animal
        // appel de méthodes d'instance
        animalTiti.parler(); 
        animalTiti.exprimerSaJoie();

        Animal animalMinet = new Animal("Gros minet", "chat", 4); // creation animal
        animalMinet.parler();
        animalMinet.exprimerSaJoie();

         // appel d'une méthode de classe (static)
         Animal.afficherNombreDAnimaux();
    }
}
```

En faisant le run du main, nous affichons dans la console :

```txt
Je m'appelle titi
Je suis un animal et j'ai 2 pattes
Cui cui
Je m'appelle Gros minet
Je suis un animal et j'ai 4 pattes
Miaou
**************************
Il y a 2 animaux
```
