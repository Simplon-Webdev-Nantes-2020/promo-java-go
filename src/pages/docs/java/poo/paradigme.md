---
title:  Les paradigmes
weight: 1
template: docs
doc_sections: java
---

La programmation est une automatisation de tâches pour résoudre un problème humain.  
Un paradigme est une façon de voir les choses, c'est un modèle.
Il existe plusieurs façons de traiter les solutions. On appelle cela un paradigme de programmation.  
Parmi les nombreux paradigmes, on peut en extraire trois :

* la programmation procédurale
* la Programmation Orientée Objet (POO).
* la programmation fonctionnelle

Ces trois paradigmes peuvent être mélangés dans un même langage.
Par exemple, Javascript utilise les trois, Java utilise la POO et le fonctionnel.

### La programmation procédurale

Dans la programmation procédurale, vous avez les notions suivantes :

* les variables
* les instructions et les blocs d'instructions
* les structures conditionnelles : if, while, for.
* les fonctions ou procédures.  

Les variables stockent les données. Les instructions sont les traitements sur les données.
Ces traitements sont conditionnés, ou répétitifs.
S'il sont appellés plusieurs fois, nous les regroupons dans une fonction, ce qui évite la duplication de code.  
La programmation procédurale place en son centre les données et leur état à un instant t.

### La programmation objet

Avec la programmation objet, nous ajoutons un niveau d'abstraction supplémentaire à la programmation procédurale.  
Au dessus du mode procédural, nous ajoutons la notion d'objet.  
C'est une sorte de structure qui englobe tout ce qui est énuméré ci-dessus.  
Le traitement et la donnée sont étroitement liés.  
Lorsque que l'on va coder en objet, on va d'abord faire abstraction de la machine. On pense tout simplement objet, et un objet est une représentation de son environnement.  
**Pour coder objet, il faut penser objet.**  

### la programmation fonctionnelle

La programmation objet est basé sur l'état à un instant t, or cet état évolue avec le temps.  
C'est donc naturellement dans la gestion des flux et des événements que la programmation fonctionnelles sera utilisée.  
Elle est basée sur le fait qu'un traitement donnera toujours le même résultat quelque soit son environnement extérieur, et ne modifiera pas cet environnement.  
Un chapitre sera consacré à ce paradigme.
