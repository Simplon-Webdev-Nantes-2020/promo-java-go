---
title: Configuration
weight: 1
template: docs
doc_sections: spring
---

### le XML

Les fichiers XML sont utilisé pour l'IOC,c'est à dire la relation entre la classe et l'interface.  
Très utilisé autrefois, il alourdit énormément la compréhension du code.
Son avantage : centralisation des informations, car il existe un seul fichier où sont recensés toutes les paires classe/interface.  
Aujourd'hui la programmation XML est obsolète.

### L'annotation

Elle a remplacé le XML. Ces métadonnées sont simples et très efficaces.  
On place une annotation juste avant une classe, une méthode ou un attribut.
Cette annotation détermine le comportement de l'élément qui suit.  
Les avantages :

* Une annotation agit comme une étiquette
* On connaît de suite l'information puisque l'annotation est accolée à l'élément (contrairement au paramétrage XML)

Les inconvénients :

* Dispersion de l'information dans tout le code
* Diverses normes qui se côtoient : JSR, Spring, Hibernate, ...

### Les fichiers properties

On utilise 2 formats : properties et yaml (json n'est pas utilisé).
Ils sont indépendants de la programmation. Ils contiennent des informations techniques.
Les fichiers properties sont utilisés pour :

* le paramétrage technique (url de SGBD, variable d'ENV)
* les options d'exécution du logiciel
* les fichiers de traduction
