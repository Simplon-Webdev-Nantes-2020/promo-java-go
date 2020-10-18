---
title: Le clonage
weight: 18
template: docs
doc_sections: java
---

Toute donnée est stockée dans la JVM dans une zone mémoire.  
Les primitives sont les seules variables qui ne sont pas Objet, donc pas de `new` à faire.
Ils sont stockés dans une zone mémoire réservée.  
Par contre les objets requièrent une allocation de mémoire. Donc lorsque nous faisons un `new`, la JVM accorde un espace mémoire.
Cet espace est repéré par une adresse (un chiffre), appelée aussi pointeur.  
  
Si vous lisez ce code :  

``` Java
Oiseau titi = new Oiseau();  
Oiseau maitreCorbeau = titi;
```

Vous voyez 2 adresses qui pointent sur la même zone mémoire, **DONC un seul objet !!!**.  

Le clonage est le fait de dupliquer un objet en mémoire. Il est très peu utilisé en Java. Mais dans certains cas il peut être bien utile de dupliquer un objet.  
S'il est peu utilisé, l'exercice de clonage est riche en enseignement.  
Il permet de mieux comprendre l'allocation de mémoire.  

Pour copier l'objet en mémoire, il faut :

* connaître la zone mémoire, grâce à l'adresse
* créer un nouvel objet vide : `new`
* copier chaque attribut primitif dans la nouvelle zone mémoire
* si l'attribut est un objet, il faut le cloner.  
  
Heureusement Java nous aide dans le clonage. 
Pour cela la classe doit implémenter l'interface `cloneable` et posséder la méthode `clone`.
Seuls les champs Object seront à dupliquer. Les primitifs sont dupliqués automatiquement.  

Voici un exemple de clonage :  

```java
public class Voiture extends Vehicule implements Cloneable {

    private Moteur moteur;
    private long nombreDePorte;

    public Voiture(String couleur, long nombreDePlace, long puissance, String carburation, long nombreDePorte) {
        super(couleur, nombreDePlace);
        this.nombreDePorte = nombreDePorte;
        this.moteur = new Moteur(puissance,carburation);
    }

    @Override
    protected Voiture clone() {
        Voiture clone = null;
        try {
            clone = (Voiture)super.clone();
            clone.moteur = this.moteur.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return clone;
    }
}

```
