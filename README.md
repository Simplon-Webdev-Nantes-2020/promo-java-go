# Site statique

## installation en local

1. cloner le repo
1. yarn install
1. gatsby developp

## Ajouter de la documentation

Dans le dossier `src/pages/docs`, il y a un répertoire par thème (java, git, html, etc...)

### Ajout d'une page dans un menu existant

1. création d'un fichier markdown dans src/pages/doc/...
1. Ajouter une entête en se basant sur l'exemple suivant
    ```yml
    ---
    title: Definition
    weight: 1
    template: docs
    ---
    ```
    Le titre est libre. template est toujours à docs. weight est l'ordre d'apparition dans le menu
1. écrivez votre texte en markdown
1. vérifier le résultat
1. si le site s'est planté, sûrement que vous avez mal écrit l'entête

### Ajouter un menu dans la documentation

Il s'agit du menu contextuel, situé à gauche de l'écran.

#### menu de niveau 1

Exemple : java.

* Créer un dossier sous src/pages/docs
* Ajouter un fichier index.md
* Dans le fichier src/data/doc_sections.yml, ajouter votre menu (qui a le même nom que le dossier)
```yml
root_docs_path: /docs
sections:
  - java
  - html
  - git
```

## Ajouter une page

* Dans le fichier site-metadata.json
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