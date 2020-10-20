---
title:  L'abstraction
weight: 21
template: docs
doc_sections: java
---

L'abstraction est le fait de décrire quelque chose sans le définir par du contenu.  
Elle n'a d'utilité que si cette classe a des enfants.  
L'abstraction indique à la classe enfant ce qu'elle doit faire.  
Mais elle ne dit pas comment.  

## La classe abstraite

Une classe abstraite (abstract) est une classe qui ne peut être instanciée.  
C'est une classe qui est étendue (elle est parente).  

## La méthode abstraite

Une méthode abstraite appartient forcément à une classe abstraite.  
Cette méthode est vide. Elle ne contient que la signature.  
Cette  méthode abstraite devra être implémentée dans la classe enfant.

## Exemple

Voici un exemple pour mieux comprendre :

``` java
public abstract class Animal {

    //propriétés de l'objet
    protected String nom;

    //constructeur
    public Animal(String nom) {
        super(); //appel du constructeur parent
        this.nom = nom;
    }

    //une méthode de l'objet
    protected String formulerMonNom() {
        return "Je m'appelle " + this.nom; //appel de la propriété nom
    }

    //une méthode abstraite
    public abstract void parler();
}
```

``` Java
public class Chien extends Animal {

    public Chien(String nom) {
        super(nom); //appel du constructeur parent
    }

    @Override
    public void parler() {
        System.out.println("je suis le chien " + this.nom + ", et je dis WOUF WOUF");
    }

}
```

``` Java
public class RunCheptel {

    private static Animal personne;
    private static Animal rex;
    private static Animal medor;

    private static void faireParler(Animal animal) {
        animal.parler();
    }

    public static void main(String[] args) {

        // impossible car classe abstraite
        // personne = new Animal("Sans nom");
        // faireParler(personne); //Je suis un animal

        rex = new Chien("Rex");
        faireParler(rex); // je suis le chien Rex, et je dis WOUF WOUF

        medor = new Chien("Médor");
        faireParler(medor); // je suis le chien Médor, et je dis WOUF WOUF

    }
}
```

