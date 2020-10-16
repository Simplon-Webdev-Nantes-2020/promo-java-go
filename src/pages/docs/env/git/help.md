---
title: Help
weight: 2
template: docs
doc_sections: env
---

Au secours mon git ne fonctionne plus

## Github a renommé master

Github a renommer la branche `master` en `main`.
Tout va bien si vous créer un nouveau dépot et faites un clone de ce repo.  
Mais parfois, vous tout cela se complique si vous avez déjà un repo local, et que vous avez fait un `git init`.  
Le plus simple est de créer un repo vide sur github. Voici la démarche :

```sh
git init
git add --all
git commit -m "first commit"
git branch -m master main
git remote add origin urlDuRepo
git push -u origin main
```

Si vous créer un dépot avec un READ.ME et un .gitignore, la procédure est légèrement différente.

```sh
git init
git add --all
git commit -m "first commit"
git branch -m master main
git remote add origin urlDuRepo
git pull origin main --allow-unrelated-histories
```

## Démarche de création d'un projet Maven suite au changement de branche par défaut

1. Pour l'artifactId de Maven (nom du projet), utilisez le même nom de repo Github
1. Créer votre dépot sur Github
1. Faites un `git clone` en local
1. Créer le projet Maven, en indiquant le dossier parent au nom du projet (le dossier qui contient le repo local git)
1. Maven vous indique que le dossier existe déjà. Il complète les fichiers.
1. il n'y a pas conflit avec Github et vous êtes sur la branche `main`
