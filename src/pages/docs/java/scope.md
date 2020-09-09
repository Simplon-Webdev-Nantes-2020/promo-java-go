---
title: La portée (scope)
weight: 4
template: docs
---
Toute variable, objet, méthode ont un identifiant unique.  
La portée de l'identifiant est limité par son périmètre.  
Je m'explique :  
Une variable définie dans une méthode a une portée limitée à la méthode.  
Il est impossible de faire appel à cet identifiant en dehors de la méthode.  
Et l'identifiant est par définition unique.  
Si l'on veut agrandir la portée de la variable, il faut déclarer la variable sur un niveau supérieur.  
Les principales portées sont :
* le bloc
* la méthode
* la classe

Dans une classe, pour faire référence à l'instance en cours (objet), on utilise le mot clef `this`.  
Si on veut faire appel à des propriétés ou méthodes du parent, on utilise le mot clef `super`.  
Pour faire appel à une méthode dans une classe distincte, on précède l'identifiant du nom de la classe.   
Par exemple `Math.random(); `
