---
title: Les boucles
weight: 7
template: docs
doc_sections: java
---

Voici les 4 types de boucle que vous aurez l'occasion d'utiliser en java.

## for (iteration contrôlée par paramètres)

```java
int[] tableau = {1, 2, 3, 4, 5};
int somme = 0;
for (int i = 0 ; i < tableau.length ; i = i + 1)
{
    somme = somme + tableau[i];
}
System.out.println(" somme = "  + somme);
```

## Foreach (très pratique et plus simple que la précédente)

```java
int[] tableau = {1, 2, 3, 4, 5};
int somme = 0;
for (int val : tableau)
{
    somme+=val;
}
System.out.println(" somme = "  + somme);
```

## While (iteration de zéro à n fois)

```java
int[] tableau = {1, 2, 3, 4, 5};
int somme = 0;
int i = 0;
while ( i < tableau.length ) // test en entrée
{
    somme = somme + tableau [i];
    i = i + 1;
}
// affichage dans la console :
System.out.println(" somme = "  + somme);
```

## Do … while (iteration de 1 à n fois)

```java
int[]tableau = {1, 2, 3, 4, 5};
int somme = 0;
int i = 0;
do
{
    somme = somme + tableau [i];
    i = i + 1; // ou i++
}
while ( i < tableau.length ); // test en sortie

System.out.println("somme = "  + somme);
```
