---
title: Tag
weight: 20
template: docs
doc_sections: env
---

Le tag est une annotation faite sur un commit, principalement utilisé pour marquer les versions du logiciel.

## Créer un tag

La création d’un tag demande un nom de tag et un commentaire.  
Nous avons les tags anotés (-a), les tags signés (-s) et les tags légers.  

* git tag [-a|-s] nomtag [-m ‘comment’] [shaCommit]
* git tag -a v1.4 -m 'my version 1.4'
* git tag -s v1.4 -m 'my version 1.4'
* git tag v1.4
* git tag -s v1.2 -m 'my version 1.2' f524c45

## afficher les tags

* lister tous les tags  
`git tag`
* lister une partie des tags  
`git tag -l 'v1.4.2.*'`
* afficher le contenu d'un tag  
`git show nomTag`

## Partager les commits

Par défaut les tags ne sont pas poussés sur le serveur. Vous pouvez pousser un tag ou tous les tags.

* `git push origin monTag`
* `git push origin --tags`

## Supprimer un tag

Pour supprimer un tag : `git tag --delete monTag`.  
Pour supprimer un tag sur le remote, ajouter cette commande : `git push --delete origin monTag`
