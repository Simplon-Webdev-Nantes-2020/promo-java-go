---
title: Les thread
weight: 20
template: docs
doc_sections: java
---

Les thread permettent de faire du parallélisme, c'est à dire des traitements en parallèle.  
Un thread est une unité d'exécution qui fonctionne en autonomie en parallèle d'autres thread.  
Les thread sont parties intégrantes de l'exécutable : il n'y a qu'une seule JVM lancée (un seul processus).
Ce ne sont pas deux programmes exécutés en même temps. Ils sont autonomes dans la JVM et partagent la même mémoire. Leur temps d'exécution est indépendant.  
Par défaut lorsque vous exécutez un programme Java, vous lancez un thread.  
Ensuite ce thread peut lancer un ou plusieurs autres thread (thread enfant).  
Les thread peuvent communiquer entre eux via des structures synchronisées (synchronized).  
Un thread peut attendre la fin d'exécution thread enfant.  
Vous trouverez toutes les informations nécessaires sur le blog [Java le soir](http://blog.paumard.org/cours/java-api/chap05-concurrent-premier-thread.html)  
