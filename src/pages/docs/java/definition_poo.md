---
title: Définition de la POO
weight: 2
template: docs
---

## Le paradigme
Il existe plusieurs façons d'approcher la programmation. On appelle cela un paradigme de programmation.    
Ici, nous allons aborder la programmation objet.  
Jusqu'à présent nous avons étudié la programmation procédurale, avec les notions suivantes :
* les variables
* les instructions et les blocs d'instructions
* les structures conditionnelles : if, while, for.
* les fonctions.  

Avec la programmation objet, nous ajoutons un niveau d'abstraction supplémentaire à l'élaboration de code. 
Au dessus du mode procédural, nous ajoutons la notion d'objet. 
C'est une sorte de structure qui englobe tout ce qui est énuméré ci-dessus.  
Et cette structure a une vie :
* elle naît
* elle meurt
* elle est composée de propriétés
* elle a des comportements.

Lorsque que l'on va coder en objet, on va d'abord faire abstraction de la machine. On pense tout simplement objet, et un objet est une représentation de son environnement.  
**Pour coder objet, il faut penser objet.**  

## Définition 
Comment définir la Programmation orientée objet ?
* un objet est un composant,
* un objet représente un concept, une entité, une chose concrète
* pour représenter un objet, on utilise un modèle,
* un objet possède une structure :
    * ce sont ses propriétés, ou attributs,
    * les propriétés décrivent ses caractéristiques, ce qui le compose, 
    * les propriétés sont des variables propres à un objet,
    * les propriétés ont une valeur (comme une variable),
    * cette valeur peut être :
        * nulle, 
        * un booléen
        * un numérique
        * un caractère
        * une chaîne de caractères
        * un objet
    * les valeurs sont propres à un objet
* un objet a un comportement :
    * ce sont ses méthodes,
    * les méthodes décrivent une action, un état, donc un verbe,
    * les méthodes ont pour équivalence les fonctions dans la programmation procédurale,
    * le comportement est le même pour tous les objets regroupés dans le même modèle,
* On utilise les objets :
    * dès qu'on a un besoin,
    * sur une durée limitée,
    * sans limite de nombre (si ce n'est la capacité de la mémoire),
    * à partir d'un modèle,
* les objets interagissent entre eux,
* un objet peut hériter des caractéristiques d'un parent,
* un objet a une vie :
    * il naît,
    * il meurt,
* pour concevoir des objets, on utilise un langage de modélisation : UML, et tout particulièrement le diagramme des classes,
* Il existe 2 façons de coder en objet :
    * Description par prototypage ,
    * Description par classe.

## La classe
Une classe définit un ensemble d'entités, d'objets.  
C'est un modèle, une description.  
Elle définit la structure et le comportement.  
La classe est statique. Une fois compilée, elle ne peut pas muter, donc changer de comportement.  
Le développeur devra modifier le code pour faire évoluer la classe. 
Si cette classe n'est pas modifiable il faudra créer une nouvelle classe héritant de la première.   
Une classe contient des objets qu'on appelle des instances. Elle contient de 0 à n objets.  
La création d’un objet se fait obligatoirement à partir d'une classe.

## Les trois fondamentaux de la programmation objet
### L'héritage
Une classe est décrite par des propriétés et des méthodes. Chaque classe a ses spécificités.  
Le but de l'héritage est de regrouper les propriétés et les méthodes communes à plusieurs classes dans une nouvelle classe (la classe parente) 
puis d'hériter de cette classe.  
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

## Un peu d'histoire
* Simula
	* En 1962, Ole-Johan Dahl et Kristen Nygaard crée le langage **Simula I**. Il regroupe données et procédures. 
	* En 1967, sortie de **Simula 67**. Il formalise les concepts d'objet et de classe. Un programme devient une collection d'objets actifs et autonomes.
* En 1972, Alan Kay, Dan Ingals, Ted Kaehler, Adele Goldberg crée le **Smalltalk**. C'est à ce moment que  Alan Kay introduit le paradigme de POO.
* En 1983, Bjarne Stroustrup crée le **C++**, extension du langage C et s'inspirant de Simula.
* En 1994,  James Gosling, crée le langage **Java**, reprise des principes du C++ en simplifiant l'écriture et surtout ajout de la notion de machine virtuelle.
* Autres langages
	* 1989 : Python
	* 1995 : Delphi
	* 1995 : Ruby
	* 2002 : C#
	* 2004 : PHP 5
