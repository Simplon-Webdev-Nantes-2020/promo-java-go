# Blog de la promo 3 java Simplon-Nantes

C'est un site gatsby.js et donc par défaut c'est du nodeJs.

## installation en local

1. fork puis clone du repo
1. yarn install

### Exécution en local

#### Serveur de travail

Pour lancer un serveur local et visualiser vos modifications :  
`yarn run develop`

Cette commande crée un exécutable qui prend en compte les modifications en temps réel.  
Vous pouvez voir votre site sur localhost:8000.  
Trois choses à savoir :

* La construction est longue
* le plugin gatsby-plugin-manifest (qui sert pour le PWA) est très long. Le mieux est de le mettre en commentaire (sans push) dans gatsby-config.js
* Un markdown sans entête fait planter le serveur

#### Serveur statique

Ici, on va générer le site static donc les fichiers dans le dossier public.
Les 2 commandes suivantes sont facultatives :  

`yarn run build`  
`yarn run serve`  
Le serveur est actif sur le port 9000

## Mise en ligne du site

C'est la branche master qui est reliée avec l'hébergeur.
Le site est installé chez netlify.
Vous faites un push sur master (ou validez une pull request), quelques minutes plus tard, les modifications sont en ligne.

## Workflow de mise à jour du site

Le dépot github est protégé. Faites un fork puis un clone.  
Travaillez sur la branche preview.
Quand votre article est fini, vous pushez cette branche.  
L'administrateur, vérifie l'article sur le preview, puis si c'est ok le fusionne sur le master.

## Ajouter un article de blog

1. créer un nouvel article dans le dossier `src/pages/blog`
1. renseigner l'entête du markdown

    ```yml
    ---
    title: C'est le titre de l'article
    excerpt: >-
    C'est un résumé court
    author: 9a porte son nom
    date: date de l'article
    image: image de l'article
    thumb_image: image affichée dans la liste des articles
    template: post
    ---
    ```

1. positionner les images dans le dossier `static/images/blog`

## Ajouter des liens ressources

Dans le dossier `src/pages/docs/ressource`.

1. création d'un fichier markdown si existant
1. Ajouter une entête en se basant sur l'exemple suivant

    ```yml
    ---
    title: Définition
    weight: 1
    template: docs
    doc_sections: ressource
    ---
    ```

    Le titre est libre. template est toujours à docs. weight est l'ordre d'apparition dans le menu. doc_section est toujours ressource
1. écrivez votre texte en markdown
1. Ajouter des images le même dossier que l'article
1. Aidez-vous du site exemple [libris](https://themes.stackbit.com/demos/libris/blue/style-guide/)
1. vérifier le résultat
1. si le site s'est planté, sûrement que vous avez mal écrit l'entête
