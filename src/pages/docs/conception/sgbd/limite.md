---
title: La limite des SGBDR
weight: 3
template: docs
doc_sections: conception
---

Les bases de données relationnelles (SGBDR) permettent d'avoir des données intègres.
Cependant, elles ont quelques faiblesses qui devront se résoudre par programmation.

## Synchronisation

Ou comment éviter une perte de maj lors de la mise à jour d'un enregistrement.  
Une base de données centralise l'information. Plusieurs clients peuvent consulter en même temps la même donnée.
Lors d'une maj de l'enregistrement d'une donnée dans la base, la philosophie "last writer wins" peut avoir ses limites.  
Supposons la séquence suivante :

1. l'utilisateur U1 lit un enregistrement
2. l'utilisateur U2 lit le même enregistrement
3. l'utilisateur U2 modifie cet enregistrement.
4. l'utilisateur U1 modifie aussi cet enregistrement mais après U2.  

Que se passe t'il ? Les modifications de U2 sont perdues sans que quiconque en soit averti.  
Cette situation n'est pas concevable pour l'utilisateur.  
Cette situation pour être résolue en ajoutant un champ qu'on nomme *versionNum*, ou *versionDate* :

* soit un champ numéro de maj qui est incrémenté à chaque enregistrement
* soit une date de maj en TIMESTAMP  

Lors de la maj de l'enregistrement, il suffit de vérifier dans la base si ce champ n'a pas évolué.  

```sql
SELECT nom_table.versionNum FROM nom_table WHERE nom_table.id = 10;
```

Comparez que la valeur lue est la même que celui que vous avez en mémoire.  
S'il est différent, erreur.  
S'il est identique; incrémenter de 1 (par exemple 5 + 1) et faites l'update :

```sql
UPDATE nom_table SET nom_colonne = ?, nom_table.versionNum = 6 WHERE nom_table.id = 10
```

Ou dans la condition de l'UPDATE (WHERE) d'ajouter en plus de l'id, la condition d'égalité sur le champ version.  
Si l'enregistrement dans la base n'a pas le même numéro que la mémoire, la mise à jour ne sera pas faite. Il faudra gérer une exception.  

```sql
UPDATE nom_table SET nom_colonne = ?, nom_table.versionNum = 6 WHERE nom_table.id = 10 AND nom_table.versionNum = 5
```

## Modification de la valeur de la clef unique

Une clef primaire ne peut pas être modifiée. Si l'on veut modifier sa valeur, il faut créer un nouvel enregistrement et supprimer l'ancien. C'est normal, c'est cette clef qui est exportée dans une clef étrangère.  
Imaginez : vous créez dans la base un produit avec une référence. Vous faites une commande avec ce produit et éditez une facture.  
Ensuite, vous changer ensuite la référence du produit. Il sera impossible à l'acheteur de retrouver son produit inscrit sur la facture.  
Donc tout va bien tant qu'on n'utilise pas l'id comme clef primaire.  
Dans le cas d'un id, l'unicité est représentée par la clef fonctionnelle.
Cette clef n'est pas obligatoire et même très souvent oubliée.  
Une fois l'enregistrement créé, on ne devrait pas pouvoir modifier les valeurs de la clef fonctionnelle.  
Ce contrôle est du domaine du développement (java, php).  
