# Site statique

## installation en local

1. cloner le repo
1. yarn install
1. gatsby developp

## Ajouter de la documentation

Dans le dossier `src/pages/docs`, il y a un répertoire par thème (java, git, html, etc...). On parle ici de doc_sessions.

### Ajout d'une page dans un thème existant

Prenons l'exemple du thème java.  
Recherchez le fichier `src/data/doc_sections.yml`. Dans `java.sections`, vous trouverez le sous-thème (java, spring, builder, ...).  
A chaque sous-thème correspond un dossier dans même nom. Vous placerez la page dans ce dossier.

1. création d'un fichier markdown dans src/pages/doc/java/...
1. Ajouter une entête en se basant sur l'exemple suivant

    ```yml
    ---
    title: Définition
    weight: 1
    template: docs
    doc_sections: java
    ---
    ```

    Le titre est libre. template est toujours à docs. weight est l'ordre d'apparition dans le menu. doc_section est le thème principal.
1. écrivez votre texte en markdown
1. Ajouter des images comme dans un markdown classique
1. vérifier le résultat
1. si le site s'est planté, sûrement que vous avez mal écrit l'entête

### Ajouter un menu dans la documentation

Il s'agit du menu contextuel, situé à gauche de l'écran.

#### menu de niveau 1

Exemple : java.

* Créer le dossier `java` sous src/pages/docs
* Ajouter un fichier index.md
* Dans le fichier src/data/doc_sections.yml, ajouter votre menu à 2 endroits

```yml
root_docs_path: /docs
sections:
  - java
  - html
  - git
```

```yml
java:
  root_docs_path: /docs/java
  sections:
    - general
    - spring
```

#### menu de niveau 2

1. Ajouter un dossier sous le niveau 1 `../java/spring`
1. Ajouter un fichier index.md
1. Écrire les tutos dans ce dossier

## Ajouter un menu au site (navbar en haut à droite de la page)

* Dans le fichier site-metadata.json
* propriétés header.nav_links

```json
        "nav_links": [
            {
                "label": "Une page simple",
                "url": "/page_simple",
                "style": "link",
                "has_subnav": false
            },
            {
                "label": "Deux pages",
                "url": "#",
                "style": "link",
                "has_subnav": true,
                "subnav_links": [
                    {
                        "label": "page 1",
                        "url": "/page1",
                        "style": "link"
                    },
                    {
                        "label": "page2",
                        "url": "/page2",
                        "style": "link"
                    }
                ]
            },
        ]
```
