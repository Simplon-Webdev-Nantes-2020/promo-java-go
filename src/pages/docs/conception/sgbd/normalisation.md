---
title: Normalisation
weight: 2
template: docs
doc_sections: conception
---

Une base de données relationnelle contient des tables qui sont liées entre elles.
Chaque table contient des données qui sont stockées dans des enregistrements (lignes).
Chaque donnée d'une ligne est stockée dans une colonne. La colonne a une entête et un type.
On peut comparer une table à un feuille d'un tableau excel.  
Pour agencer cela correctement, il existe un certain nombre de règles. On appelle cela les formes normales.  
Il existe 6 niveaux de forme normale.  
Une base de données relationnelle doit être au minimum en 3ème forme normale.  

## Règles de normalisation

Voici les 3 règles qui ont abouti aux 3 premières formes normales.  

### Atomicité

Il n'y a pas de tableau, ni de liste dans un champ.  
Par exemple, il est interdit de mettre un nom suivi du prénom dans le même champ.
On doit dans ce cas, créer un champ nom et un champ prénom.  
De même, il est interdit de mettre un tableau dans un champ (même sous forme de liste).

#### Information centralisée

Les informations sur une entité sont sur un seul enregistrement de la table.  
Il est interdit de disperser les informations sur plusieurs enregistrements (lignes).  

### Information unique

L'information est représentée une seule fois dans la base.  
Il est interdit d'avoir des doublons dans la table. Pour cela il faut ajouter une contrainte d'unicité (clef unique ou fonctionnelle).  
De même il est interdit de dupliquer l'information dans une autre table.  
Par exemple la nom d'un fournisseur ne peut pas être dans une table produit, seul y figure son id.  

## Définition mathématique

Ces 3 règles donnent en langage mathématique les 3 formes normales.  
Les formes normales sont difficiles de lecture, mais elles peuvent être évoquées.
Ce qui compte réellement sont les 3 règles énoncées précédemment.  
Note : la définition des FN a été écrite avant l'utilisation systématique des id, il faut comprendre par clef primaire la clef fonctionnelle.  

### La 1ère forme normale

Une relation est en 1ère forme normale si elle ne contient que des "valeurs atomiques", c'est-à-dire pas de "groupes répétitifs".  
Un champ contient une valeur au plus : pas de tableau, ni de liste.

### La 2ème forme normale

Une relation est en 2ème forme normale si elle est déjà en 1ère forme normale,
et si tout attribut n’appartenant pas à la clé (primaire) dépend complètement de cette clef.  
Un champ non clé primaire ne doit pas dépendre d'une partie de la clé primaire. Il doit en dépendre entièrement.

### La 3ème forme normale

Un champ non clé primaire ne doit pas dépendre d'un autre champ non clé primaire.  
Dans ce cas, on peut décomposer la table en deux tables afin d'éviter une redondance d'informations dans la base.
