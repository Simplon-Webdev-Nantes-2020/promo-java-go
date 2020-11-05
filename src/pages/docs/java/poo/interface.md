---
title:  L'interface
weight: 36
template: docs
doc_sections: java
---

## Définition

> La notion d'interface est primordiale en Java.
> S'il fallait classer l'importance des notions, il faut placer les interfaces en second (le premier étant la classe).  

Une interface est une classe abstraite qui ne contient que des méthodes abstraites.
Elle ne contient pas d'instance.
Elle peut contenir des constantes, mais pas de propriété.  
Le mot clef pour déclarer une interface est `Interface`.  
Quand une classe implémente une interface (on ne parle pas d'héritage), on utilise le mot clef `implements`. Cette classe doit définir les méthodes indiquées dans l'interface.  
**Une interface signifie à une classe comment se présenter, mais pas comment se comporter.**  

## Exemple

### Interface

```java
/**
 * Interface Instrument de musique
 * On sait que l'on peut jouer, ajuster, et faireUneNote
 */
public interface InstrumentDeMusique {
    enum Note {
        DO, RE, MI, FA, SOL, LA, SI
    }; // static & final par defaut

    void jouer(); // automatiquement public

    void ajuster();

    void faireUneNote(Note note);
}
```

### Implémentation

``` Java
/**
 * Le violon est un instrument de musique
 *
 */
public class Violon implements InstrumentDeMusique {

    @Override
    public void jouer() {
        System.out.println("Le violon vibre");
        for (final Note note : Note.values()) {
            this.faireUneNote(note);
        }

    }

    @Override
    public void ajuster() {
        System.out.println("Violon.ajuster");
        this.faireUneNote(Note.LA);
        System.out.println("je vérifie la justesse de la note LA");
    }

    @Override
    public void faireUneNote(Note note) {
        System.out.println(note);
    }
}
```

### Instanciation

Une interface ne contient pas d'instance. Il faut donc créer les instances avec la classe.  
Ainsi lors d'une instanciation, on fait référence à l'interface et à la classe.  

```java
InstrumentDeMusique violon = new Violon();
```

### Explication du code

L'interface `InstrumentMusique` est le contrat. Un instrument de musique doit jouer, ajuster, et faire une note.
Mais on ne sait pas comment.  
Violon est une classe définissant un instrument de musique.
C'est ici que l'on va décrire comment on joue du violon.  
Lors de l'instanciation, on crée un objet de type *interface* à partir de la classe.

## Utilisation

L'utilisation de l'interface répond à plusieurs besoins.

### La généralisation

L'héritage d'une classe sert à propager verticalement les propriétés et méthodes.
Ce sont les enfants qui héritent du comportement.
Plus on hérite, et plus on se spécialise.  
L'implémentation d'interfaces sert à propager horizontalement le comportement.
On généralise.  

### Sécurisation et évolutivité

L'interface est un contrat qui permet d'écrire du code plus propre.  
Lorsque l'on crée une classe, on se pose les questions :

* elle est composée de quoi ?
* et que fait-elle ?

On répond à la deuxième question par l'interface. A ce moment, on ne sait pas comment la classe va se comporter.
Par contre on sait comment on va réagir avec elle.  
On peut faire le parallèle avec le TDD. Le TDD définit le fonctionnement de la méthode par le test.
L'interface définit le fonctionnement de la classe par un contrat de comportement.  

#### Utiliser au maximum les interfaces

A partir du moment où on utilise les interfaces, les classes deviennent secondaires.  
Ainsi dans tout le programme, quand on écrit du code, on utilise une interface à la place de la classe.  
Le seul moment où on appelle la classe, c'est lors de l'instanciation (new).  
En faisant cela, nous enlevons les dépendances fortes entre les classes. Et c'est une bonne chose.  
Bien entendu, nous sommes toujours obligés d'écrire la classe (bien qu'avec le fwk Spring les choses changent).  

#### Sécurité du code

Si dans tout son code, on a utilisé le type *interface* à la place du type *classe*, il est très facile d'ajouter une nouvelle classe implémentant l'interface sans modifier tout notre programme.  
Le seul code à écrire est :

* création de la classe,
* appel de cette classe lors de l'instanciation (new),
* et... c'est tout.

Cette nouvelle façon de faire permet de réécrire entièrement une classe, sans changer toute l'écriture du programme.  
C'est un gain de temps d'écriture, mais surtout de sécurité.  
Moins on modifie de lignes de code, moins il y aura de bug.

### L'héritage multiple

Une autre utilisation de l'interface est l'héritage multiple.  
En Java, une classe ne peut pas hériter de plusieurs classes (contrairement au C++).  
Prenons l'exemple de la chauve-souris.
Notez que cet exemple est simplifié pour la compréhension de l'héritage multiple.  
La chauve-souris hérite la la classe Mammifère.
Mais elle vole, donc elle hérite aussi de la classe Oiseau.  
Or c'est impossible en java. On ne peut hériter que d'une seule classe.
La solution, on la trouve dans les interfaces, parce qu'on peut implémenter plusieurs interfaces.  
Dans notre cas, on crée l'interface Mammifere avec le comportement allaiter, et l'interface Oiseau avec le comportement voler.
Chauve-souris implémente Mammifere et Oiseau.

## Evolution des interfaces depuis Java 8

> Ce qui suit est écrit dans un but informatif. Plus java évolue, et plus il se complexifie. Lors d'un apprentissage, il faut rester humble.
> Cependant, au fil des tutos, vous pourriez trouver ces notions.

A partir de Java 8, la notion d'interface a évolué significativement.
Jusqu'à présent, nous avons vu que l'interface ne possédait que des méthodes abstraites (`public abstract` par défaut).
Le code était écrit dans les classes.  
C'est terminé.  
Une interface peut contenir des méthodes concrètes.

## Méthode par défaut

On peut définir une méthode par défaut. Cette méthode est repérée par le mot clef `default`.
Il s'agit d'écrire du code dans la méthode de l'interface.  
Une classe qui implémente cette interface est libre d'utiliser cette méthode, ou de fournir sa propre implémentation.

### Méthode privée

Une interface peut contenir des méthodes privées implémentées (donc du code).

### Méthode statique

La méthode statique est identique à celle que l'on trouve dans les classes.
Cette méthode peut être publique ou privée.

### Interface fonctionnelle

Une interface fonctionnelle est une interface qui ne possède qu'une méthode abstraite.
Cela ne l'empêche pas de posséder les autres méthodes.  
Il faut la repérer avec l'annotation `@FunctionalInterface`.  
Cette interface va servir pour la programmation fonctionnelle.
