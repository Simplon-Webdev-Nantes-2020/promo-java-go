---
title: Voccabulaire
weight: 90
template: docs
doc_sections: env
---

Les références de base

### HEAD

C’est le pointeur sur le dernier commit (la dernière version validée).
HEAD~n
HEAD~1 est le commit précédent HEAD
HEAD~3 est à la troisième position
HEAD^
Équivalent de HEAD~1

### ORIGIN_HEAD

Vous faites une opération dangereuse (comme re-structurer l'arborescence des commit). Celle-ci se passe mal
ORIGIN_HEAD est le dernier emplacement de HEAD avant cette opération.
Il s’agit d’un fichier (.git/ORIGIN_HEAD) contenant un numéro de commit.

### master

C’est la branche principale du repo. Aujourd'hui, Github a renommé cette branche en main

### Origin

C’est le nom du repo distant. Dès que l’on clone un dépôt distant sur son git local, le remote est nommé origin par défaut.

### Remote

C'est le dépot distant, celui qui est correspond à `origin`.