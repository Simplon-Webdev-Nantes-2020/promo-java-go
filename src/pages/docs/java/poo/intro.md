---
title:  La notion d'objet
weight: 3
template: docs
doc_sections: java
---

## La classe

Java est basé sur la notion de classe. Rien ne peut être écrit en dehors d'une classe.

* Une classe définit un ensemble d'entités, d'objets.  
* C'est un modèle, une description.  
* Elle définit la structure et le comportement.  
* La classe est statique. Une fois compilée, elle ne peut pas muter, donc changer de comportement.  
* Le développeur devra modifier le code pour faire évoluer la classe.
* Si cette classe n'est pas modifiable il faudra créer une nouvelle classe héritant de la première.
* Une classe contient des objets qu'on appelle des instances. Elle contient de 0 à n objets.  
* La création d’un objet se fait obligatoirement à partir d'une classe.

## Les trois fondamentaux de la programmation objet

### L'héritage

Une classe est décrite par des propriétés et des méthodes. Chaque classe a ses spécificités.  
Le but de l'héritage est de regrouper les propriétés et les méthodes communes à plusieurs classes dans une nouvelle classe (la classe parente), puis d'hériter de cette classe.  
On parle aussi de généralisation.  

### L'encapsulation

L'idée d'encapsulation est apparue dès de début de la POO.  
Le but est de protéger l'objet en ne montrant que les méthodes de manipulation.  
On cache les propriétés et les méthodes internes au fonctionnement de l'objet.  
On rend visible uniquement les méthodes qui doivent être vues de l'extérieur.  
On parle de **visibilité**.  

### Le polymorphisme

**poly** comme plusieurs et **morphisme** comme forme.  
Le polymorphisme traite de la capacité de l'objet à posséder plusieurs formes.  
Cette notion intervient sur le comportement de l'objet, donc les méthodes.  
Le comportement de l'objet devient donc modifiable.

## Quelques autres concepts

* relations entre les classes (composition, association, agrégation)
* l'héritage simple et multiple 
* l'abstraction
* la généricité
* la méta-programmation.

## Quelques avantages la POO

* Représentation de l'existant
* Structuration
* Clarification
* Une protection du code grâce à l'encapsulation
* Une facilité d'ajouter de nouveaux objets qui interagissent avec l'existant.
* Réutilisation de code existant plus avancé qu'en procédural.
* Écriture d'applications complexes
* Un apprentissage par palier

## Quelques inconvénients de la POO

* Une première approche difficile
* Un apprentissage conséquent
* Des possibilités énormes qui entraînent une complexité du code
* Des langages verbeux (Java en particulier)
* Inutile pour une application très simple
* Des applications plus difficile à tester
