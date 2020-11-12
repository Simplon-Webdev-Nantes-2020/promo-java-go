---
title: JPA/Hibernate
weight: 2
template: docs
doc_sections: spring
---

## Introduction

JPA/Hibernate est un ORM (Object Relational Mapping).
Un ORM va servir d'interface entre le modèle (l'entité) et la base de données.
À une classe correspond une table, et à un attribut correspond un champ.  
Hibernate est un framework, JPA est une API et s'appuie sur Hibernate.
Hibernate est la fwk historique de Java et la plus populaire.
Il en existe d'autre comme 
Pour normaliser tous ces framework, est né la notion de standard : JPA (Java Persistence Api).
JPA est donc une interface définissant un certain nombre de mots-clés et de normes à respecter.
On peut voir JPA comme l'interface et Hibernate comme la classe qui implément cette interface.

## gestion des dates avec Hibernate

Depuis Hibernate 5, utilisez les dates de l'API java 8 java.time.
Voici la correspondance :

| type java | type JDBC |
|-----------|-----------|
| java.time.LocalDateTime | TIMESTAMP
| java.time.LocalDate | DATE
| java.time.LocalTime | TIME
| java.time.Duration | BIGINT
| java.time.Instant | TIMESTAMP
| java.time.OffsetDateTime | TIMESTAMP
| java.time.OffsetTime | TIME
| java.time.ZonedDateTime | TIMESTAMP
