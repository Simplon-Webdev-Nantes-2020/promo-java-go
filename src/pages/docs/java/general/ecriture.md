---
title: L'écriture
weight: 2
template: docs
doc_sections: java
---

## Commenter le code

Avant toute chose, il convient de parler des commentaires ! C'est certainement une des choses les plus importantes que l'on écrit lorsque l'on code. Ce sont des lignes de code qui ne seront pas interprétées mais qui donnent des indications primordiales pour les programmeurs qui liront le code (y compris vous dans quelques mois / années).

```java
// Voici comment j'écris un commentaire en java :
// en démarrant ma ligne de code par //
// C'est vraiment très important de documenter son code en mettant des bons
// commentaires pour les futurs développeur•euse•s
// J'espère que vous le ferez !
```

On peut aussi regrouper plusieurs lignes de commentaires ainsi :

```java
/*
Je peux dire n'importe quoi, le compilateur ne le lira pas
par contre les autres développeurs, si :)
*/
```

> Question : quelle est votre priorité en tant que développeur?

* [ ] que votre code fonctionne?
* [x] que votre code soit maintenable? (eh oui!)

## Écriture des mots, les mots libres et les mots réservés

Java est un langage composé de mots. Un mot peut avoir avoir une signification dans une langue humaine, ou pas.  
Par exemple, je peux utiliser le mot `maVoiture`, mais aussi `vlkgfdc`.  
Écrire un mot qui n'a pas de signification pour un être humain n'aide pas à la compréhension du code.
Il est donc important de respecter les conventions de nommage.
Pour le nom des variables, les noms des classes, etc.., on utilise la convention camelCase.
Les classes doivent commencer par une majuscule, et les variables par une minuscule.
On n'utilise jamais d'accent.

![convention](convention.png)

Cependant certains mots ne sont pas libres. Par exemple, nous ne pouvons pas nommer notre variable `int`.  
C'est ce que l'on appelle un mot réservé. En voici la [liste](https://fr.wikibooks.org/wiki/Programmation_Java/Liste_des_mots_r%C3%A9serv%C3%A9s).
