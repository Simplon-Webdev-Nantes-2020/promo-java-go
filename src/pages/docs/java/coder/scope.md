---
title: Le scope et l'import
weight: 1
template: docs
doc_sections: java
---

## Le périmètre

Toute variable, objet, méthode ont un identifiant unique.
Ainsi on ne peut pas nommer 2 variables par le même mot.  
Heureusement, la portée de l'identifiant est limité par un périmètre (scope).  
Je m'explique :  
Une variable définie dans une méthode a une portée limitée à la méthode.  
Il est impossible de faire appel à cet identifiant en dehors de la méthode.  
Si l'on veut agrandir la portée de la variable, il faut déclarer la variable sur un niveau supérieur.  
Les principales portées sont :

* le bloc
* la méthode
* la classe

Par contre, il est possible de réutiliser le même identifiant dans une autre portée. ce sera un autre objet qui aura simplement le même nom.

## Référence à une instance

Dans une classe, pour faire référence à l'instance en cours (objet), on utilise le mot clef `this`.  
`this` peut être utiliser dans toute méthode d'instance.  
Si on veut faire appel à des propriétés ou méthodes du parent de l'objet, on utilise le mot clef `super`.  

## Référence à une classe

Une classe peut faire référence à une autre classe.
Si cette classe n'est pas dans le package, il faut faire un `import` du package où elle se situe en début de fichier.  
Ensuite cette classe est reconnue dans tout le fichier.  

Pour faire appel à une méthode static dans une classe distincte, on précède l'identifiant du nom de la classe.  
Par exemple ` Math.random(); `  
Si on veut faire appel à ses méthodes static sans mettre le nom de la classe à chaque appel, on fait un `import static`.
