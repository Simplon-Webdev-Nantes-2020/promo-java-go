---
title: Déplacement
weight: 15
template: docs
doc_sections: env
---

Déplacer le HEAD
checkout et reset

## checkout

`git checkout cible`  
Le checkout permet de déplacer le HEAD sur sur référence.
Pour se déplacer sur un commit, on indique le sha1 du commit.
Pour se déplacer sur une branche (dont master) c’est le nom de la branche ; dans ce cas on se positionne sur le dernier commit de la branche.

## reset

Le reset réinitialise votre environnement de travail.
Il déplace le HEAD et la branche pointée par le HEAD, sur le commit désigné.  
Donc les derniers commit sont détachés de cette branche. Si vous n’avez pas noté ces commit, vous les retrouver dans le journal (reflog).  
Git conserve 90 jours ces commits détachés.  

Par exemple git reset HEAD~ va vous positionner sur l’avant dernier commit.

Il existe 3 types de réinitialisation : soft, mixed, hard :

* Le soft met à jour le repo, mais pas le stage, ni le working
* le mixed met à jour le repo et le stage
* le hard met tout à jour. Ici vous perdez les modifications qui n’ont pas été commités.

## Le remisage

Si vous avez des modifications en cours, vous ne pouvez pas faire de checkout.  
Stash permet de remiser le travail en cours et ainsi être libre pour aller sur une autre branche (ou commit).  
Ensuite vous pouvez récupérer la remise sur n’importe quelle branche. Git indique les conflits lors de la récup.  
Lors d’un stash, git met de côté toutes les modifs qui sont en working et en stage, puis re-bascule les fichiers en l’état original.
Attention ! un nouveau fichier qui n’est dans le stage n’est pas pris en compte.  

Les commandes pour

* remiser  
`git stash`
* lister les remises  
`git stash list`
* récupérer dernière remise  
`git stash apply`
* récupérer une remise (n est un nombre)  
`git stash apply stash@{n}`
* récupérer une remise et mettre à jour l’index (staging)  
`git stash apply --index`
* supprimer une remise  
`git stash drop`
* appliquer et supprimer une remise (apply + drop)  
`git stash pop`
