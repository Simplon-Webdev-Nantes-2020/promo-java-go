---
title: Théorie
weight: 1
template: docs
doc_sections: spring
---

## Introduction

Pour créer un site Web sans passer par un CMS, nous avons plusieurs solutions.

1. Créer le site à partir de pages HTML statiques et ajouter du dynamisme avec CSS et JS
1. Utiliser un framework monolithique qui générera les pages html sur le serveur. C'est le cas de Symphony, Django.
1. Écrire deux serveurs. Un pour la partie back (c'est l'API rest), et un pour la partie front.
Pour la partie front nous retrouvons React, Vue, Angular.
Pour la partie back, nous verrons le serveur Spring.

Pour cela nous allons partir écrire ensemble un serveur REST qui utilise une base de données intégrée H2.
Pour faire le lien avec cette base, nous allons la déclarer dans le paramétrage et surtout utiliser l'ORM JPA/Hibernate.

## Les URL

Pour communiquer avec l'extérieur, nous nous appuyons sur le protocole HTTP.
Nous savons tous ce qu'est une URL, nous connaissons moins la notion de verbe, car le verbe n'est pas visible dans le navigateur.
Pour une API CRUD, nous utilisons quatre verbes : GET, POST, PUT, DELETE.  
GET est le verbe par défaut, celui de la lecture.
DELETE supprime la ressource.
POST crée la ressource.
PUT écrase la ressource, donc dans notre cas, la met à jour.

## Le MVC
