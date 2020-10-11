---
title:  L'encapsulation
weight: 16
template: docs
doc_sections: java
---

## L'encapsulation et la POO

L'idée d'encapsulation est apparue dès de début de la POO.  
Les classes communiquent entre elles, ceci signifie qu'une classe (A) va utiliser une autre classe (B).
Cependant la classe B veut garder une partie de son code secrete : c'est du code écrit que pour elle et qui ne doit pas être partagé. On va protéger ce code avec une **visibilité**.  
On cache les propriétés et les méthodes internes au fonctionnement de l'objet.
On rend visible uniquement les méthodes qui doivent être vues de l'extérieur.  
Cette façon de faire est devenue une norme de développement en POO.  
Les 3 mots clefs que l'on retrouve dans un langage objet sont `private`, `protected`, `public`.  

* `private` : visibilité restreinte à la classe
* `public` : visibilité de tous
* `protected` : visibilité restreinte à la classe et aux descendants.

## La protection des propriétés

On empêche tout accès direct à un attribut (propriété) en le mettant en private.
Seule la classe a cet accès.
Et donc pour accèder à l'attribut depuis l'extérieur, on crée des méthodes spéciales qu'on apelle des accesseurs/modificateurs (getter/setter). Ceci ajouter du code, mais permet un meilleur contrôle de l'accès.
Si la classe a des descendants (héritage), l'attribut peut passer en protected.

## La visibilité en Java

Les éléments qui ont une visibilité sont : la classe, la propriété, la méthode.  
La visibilité est indiquée devant l'élement que l'on veut protégé en utilisant les mots clef `public`, `protected`, `private`.
En Java, les concepteurs ont ajouté la visibilité par défaut, c'est à dire qu'on n'indique rien devant l'élément.

La visibilité est :

* `public` : l'élément est vu de tous.
* `private` : l'élement est caché. Il appartient exclusivement à la classe.
* friendly (default) : On n'indique rien. Toutes les classes du package ont une vue sur cet élément.
* `protected` : L'élément est visible de tous ses descendants (héritage) et de toutes les classes du package. Note : dans les autres langages objets, protected se limite à l'héritage.

## Quelques avantages de l'encapsulation

* Une classe peut être très complexe. L'encapsulation simplifie sa visibilité extérieure et son utilisation.
* Le développeur reste maître de la classe qu'il a écrite. Ce qui est en private est refactorisable sans effet de bord.
* L'encapsulation est un atout pour la rétro-compatibilité.

## Recommandations

Lorsque l'on débute, on ne sait pas toujours protéger son code.
Protégez votre code avec la visibilité la plus faible, puis agrandissez ou diminuer progressivement la portée en fonction des besoins.  
Ce qui donne :

* la classe en public,
* les attributs en private,
* les getter/setter en protected
* les méthodes en private ou protected (ceci dépend du test unitaire associé).  

## Exemples

```java
public class Personne {
    protected String nom;
    protected String prenom;
    protected int age;
    protected boolean enCours;
 
    public Personne(String nom, String prenom, int age, boolean enCours) {
        super();
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.enCours = enCours;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getPrenom() {
        return prenom;
    }
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public boolean isEnCours() {
        return enCours;
    }
    public void setEnCours(boolean enCours) {
        this.enCours = enCours;
    }
}
```

``` Java
public class Client extends Personne {

    private int numeroClient;

    public Client(String nom, String prenom, int age, boolean enCours) {
        super(nom, prenom, age, enCours);

    }

    @Override
    public String toString() {
        return "Client [numeroClient=" + numeroClient + ", nom=" + nom + ", prenom=" + prenom + ", age=" + age
                + ", enCours=" + enCours + "]";
    }

    public int getNumeroClient() {
        return numeroClient;
    }

    public void setNumeroClient(int numeroClient) {
        this.numeroClient = numeroClient;
    }

}
```

``` Java
public class App {
    public static void main(String[] args) {
        Client client = new Client("Dupont", "Jean", 52, true);
        client.setNumeroClient(56842);
        System.out.println(client;
    }
}
```
