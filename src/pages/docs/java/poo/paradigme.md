---
title:  Les paradigmes
weight: 1
template: docs
doc_sections: java
---

La programmation est une automatisation de tâches pour résoudre un problème humain.  
Un paradigme est une façon de voir les choses, c'est un modèle.
Il existe plusieurs façons de traiter les solutions. On appelle cela un paradigme de programmation.  
Dans les nombreux paradigmes, on peut en ressortir trois :

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
En programmation procédurale place en son centre les données et leur état à un instant t.

### La programmation objet

Avec la programmation objet, nous ajoutons un niveau d'abstraction supplémentaire à la programmation procédurale.  
Au dessus du mode procédural, nous ajoutons la notion d'objet.  
C'est une sorte de structure qui englobe tout ce qui est énuméré ci-dessus.  
Le traitement et la donnée sont étroitement liés.  
Lorsque que l'on va coder en objet, on va d'abord faire abstraction de la machine. On pense tout simplement objet, et un objet est une représentation de son environnement.  
**Pour coder objet, il faut penser objet.**  

### la programmation fonctionnelle

La programmation objet est basé sur l'état à un instant t.
Or cet état évolue avec le temps et donc le résultat évolue en fonction de cet état.
Ceci peut entraîner des effets de bords et des bugs. Il est aussi plus difficile de tester un état changeant.  
La programmation fonctionnelle aborde le traitement différemment.
D'abord réservée aux matheux, elle est de plus en plus présente pour résoudre des problèmes liés aux événements, en particulier les interfaces utilisateurs.  

Elle est centrée sur la fonction (et non sur la donnée). Elle est basée sur 4 grands principes :

* La fonction pure : sa seule fonction est de prendre des données en entrée et retourner un résultat.
Quel que soit le moment, le résultat reste identique pour des arguments (paramètres d'entrée) identiques.
* L'immutabilité : on ne change pas l'état d'un paramètre. Si on passe un objet en paramètre, ce dernier est identique à la fin de la fonction
* L'expressivité : utilisation de fonction d'ordre supérieur, c'est à dire mettre une fonction en paramètre
* composabilité : empilement successif d'appel de fonctions pour donner un unique résultat

Vous aurez des exemples dans cet [article](https://blog.ippon.fr/2013/01/24/introduction-a-la-programmation-fonctionnelle/).  
En Java, on utilisera peu la programmation fonctionnelle car elle sépare la donnée du traitement.
