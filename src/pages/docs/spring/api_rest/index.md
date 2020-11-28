---
title: Une api rest
template: docs
doc_sections: spring
---

Nous allons étudier le cas d'une api rest contenant plusieurs classes reliées entre elles.  
Il s'agit de la gestion d'un jukebox simple.  
Voici le diagramme des classes :

![diagramme des classe](jukebox.jpeg)

Nous avons quatre classes, deux relation OneToMany, et une relation ManyToMany.  
La relation ManyToMany entre Playlist et Track devrait donner naissance à une nouvelle classe, si nous voulions donner un ordre de lecture des tracks.
Ce n'est pas la choix que nous faisons.
