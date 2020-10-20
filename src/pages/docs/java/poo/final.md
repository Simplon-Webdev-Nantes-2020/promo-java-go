---
title:  Final
weight: 31
template: docs
doc_sections: java
---

Le mot `final` indique que l'élément ne pourra plus être modifié.

## La variable final

Une variable `final` est une variable qui ne peut pas changer de valeur.  

## La constante

Si la variable est une primitive et qu'on lui affecte une valeur lors de la déclaration, il s'agit d'une constante.
Dans ce cas, on écrit le nom de la variable en majuscule.  
Par exemple : `float PI = 3.14f;`

## L'objet

Un objet a la valeur `null` lors de sa déclaration.
La création d'une instance par le mot clef `new` affecte une référence à la variable.
On peut faire plusieurs `new` ; dans ce cas la valeur de la référence change.  
Un objet `final` ne peut pas changer de référence.
Une fois son affectation par un `new`, il est impossible de faire un second `new`.
Cependant, son contenu peut changer.  

## La méthode finale

Une méthode `final` ne peut pas être redéfinie dans une classe fille.  
La classe fille peut utiliser cette méthode, mais ne peut pas la modifier (override).  
L'override est vue dans le chapitre sur le polymorphisme simple.

## La classe finale

Une classe `final` est une classe qui ne peut être étendue (pas d'héritage).  
On interdit à tout développeur d'hériter de cette classe.  

## Exemple

Ici, c'est le nombre de colliers qui est protégé. En JS on utilise le mot clef `const`

```java
public class Chat extends Animal {
    private final int nombreCollier;

    public Chat(String nom, int nombreCollier) {
        super(nom); //appel du constructeur parent
        this.nombreCollier = nombreCollier;
    }

    @Override
    public void parler() {
        System.out.println("je suis un chat " + this.nom + ", et je dis MIAOUOUOU");
        System.out.println("je possède " + this.nombreCollier + " colliers");
//        this.nombreCollier = 3;  //interdit car final
    }

}
```
