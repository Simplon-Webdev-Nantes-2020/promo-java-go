---
title: Les tests
weight: 6
template: docs
doc_sections: spring
---

## Les tests unitaires

A venir.

## Les tests d'intégration avec Postman

Curl est un outil en ligne de commande très répandu qui permet de transférer les données et tester les requêtes.  
Il existe aussi un outil plus complet qui est Postman. Postman est un outil incontournable pour tester une api rest.
Il existe une version plugin pour navigateur et une version client à installer sur son poste de dev.
Postman est très facile à prendre en main et on peut rapidement faire des tests unitaires.  
Ce qui est puissant avec Postman, c'est la possibilité de faire des tests d'intégration.  
Pour faire des tests d'intégrations il faut :

* créer un environnement d'exécution
* écrire des requêtes en utilisant des variables
* écrire des tests
* écrire un scénario

### Stratégie

Postman nous offre un environnement très intuitif pour écrire des tests. Il a aussi des exemples et une documentation très pratique.
Pour exécuter la série de tests, il existe dans l'UI un bouton *runner*.  
Je vous conseille d'écrire vos tests dès l'écriture d'un contrôleur Spring, et de lancer votre batterie de tests avant de pousser votre code sur github.

### Environnement

Un Environnement est un ensemble de clef/valeur. Les valeurs ont une valeur initiale et évoluent au cours de l'exécution.
On peut créer autant d'environnements que l'on veut.  
Lorsque l'on demande à Postman d'exécuter les requêtes, on commence par sélectionner notre environnement.  
Voici un extrait de l'environnement crée pour le projet :

```json
{
    "id": "c240247b-4cff-4261-ac0d-1b7e7252d120",
    "name": "localhost base h2",
    "values": [
        {
            "key": "base_url",
            "value": "localhost:8080/jukebox",
            "enabled": true
        },
        {
            "key": "artist_id",
            "value": "1",
            "enabled": true
        },
        {
            "key": "new_artist_id",
            "value": "8",
            "enabled": true
        },
        ...
    ],
    "_postman_variable_scope": "environment",
    "_postman_exported_at": "2020-11-27T15:24:19.777Z",
    "_postman_exported_using": "Postman/7.36.0"
}
```

### Écritures des requêtes

Nous faisons des GET/POST/PUT/DELETE, en renseignant l'url et le body.
Ce qui change, est l'utilisation de variables, reconnaissable par les moustaches {{ }}.
Voici une requête GET :

```json
"request": {
    "method": "GET",
    "header": [],
    "url": {
        "raw": "{{base_url}}/artists/{{artist_id}}",
        "host": [
            "{{base_url}}"
        ],
        "path": [
            "artists",
            "{{artist_id}}"
        ]
    }
}
```

et une requête POST

```json
"request": {
    "method": "POST",
    "header": [
        {
            "key": "Content-Type",
            "value": "application/json"
        }
    ],
    "body": {
        "mode": "raw",
        "raw": "{\n    \"id\": 0,\n    \"name\": \"AC/DC\",\n    \"bio\": \"La famille Young quitte Glasgow en Ecosse et émigre à Sydney en Australie en 1963. Le fils cadet de sept frères George, guitariste et auteur compositeur y fonde The Easybeats avec le Hollandais Harry Vanda....\",\n    \"fanNumber\": 7252046\n}",
        "options": {
            "raw": {}
        }
    },
    "url": {
        "raw": "{{base_url}}/artists",
        "host": [
            "{{base_url}}"
        ],
        "path": [
            "artists"
        ]
    }
}
```

### Écriture des tests

Les tests sont exécutés au retour de la requête. Ils permettent de vérifier le résultat attendu.
Ils sont écrits en js avec la librairie d'assertion *chai*.
*chai* permet l'écriture de tests unitaires d'une application js.
Le fait d'utiliser des variables d'environnement permet de faire des tests d'intégration.  
Pour récupérer une variable d'environnement, on utilise la commande `pm.environment.get`.
C'est la commande `pm.environment.set` pour la mise à jour.

Voici un exemple de test vérifiant la réponse d'un GET artist

```json
"script": {
    "id": "d3714843-3a8c-48e9-a1e2-8e9df8f9f5d1",
    "exec": [
        "pm.test(\"response json should contain one collection\", function () {\r",
        "    pm.expect(pm.response.json()).to.have.property('id');\r",
        "    pm.expect(pm.response.json()).to.have.property('name');\r",
        "    pm.expect(pm.response.json()).to.have.property('bio');\r",
        "    pm.expect(pm.response.json()).to.have.property('fanNumber');\r",
        "});\r",
        "\r",
        "pm.test(\"test id\", function () {\r",
        "    var jsonData = pm.response.json();\r",
        "    pm.expect(jsonData.id).greaterThan(0);\r",
        "});\r",
        "\r",
        "if (pm.environment.get(\"artist_id\") == 1)\r",
        "    pm.test(\"test values\", function () {\r",
        "        var jsonData = pm.response.json();\r",
        "        pm.expect(jsonData.id).eql(1);\r",
        "        pm.expect(jsonData.name).eql('Celtic woman');\r",
        "        pm.expect(jsonData.bio).not.eql(null);\r",
        "        pm.expect(jsonData.fanNumber).eql(31760);\r",
        "    });\r",
        ""
    ],
    "type": "text/javascript"
}

```

### Le scénario

Un test unitaire est un test indépendant qui vérifie la bonne exécution d'une fonctionnalité (ici une requête).  
Un test d'intégration est un ensemble de tests lié entre eux. Il permet de vérifier un ensemble de fonctionnalités.
C'est un scénario.  
Par exemple, on va tester la création d'un artiste, puis la création de son album, ensuite la lecture de ses album et pour finir la suppression de l'artiste.
