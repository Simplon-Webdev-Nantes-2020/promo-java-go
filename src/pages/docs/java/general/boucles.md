---
title: Les boucles
weight: 6
template: docs
doc_sections: java
---

Voici les 4 types de boucle que vous aurez l'occasion d'utiliser en Java.

## for

C'est une boucle qu'on utilise lorsque l'on connaît le nombre d'itérations.
Elle est tout particulièrement adaptée au parcours d'un tableau.

```java
// On fait la somme des éléments d'un tableau
int[] tableau = {1, 2, 3, 4, 5};
int somme = 0;
for (int i = 0 ; i < tableau.length ; i = i + 1)
{
    // i est la position de l'élément dans le tableau
    int nombre = tableau[i];
    somme = somme + nombre;
}
System.out.println("somme = "  + somme); //somme = 15
```

## Foreach

Le foreach est une simplification de l'écriture précédente.
Cette boucle est très pratique et plus simple que la précédente.
Cependant, vous ne connaissez pas l'indice de l'élément.

```java
int[] tableau = {1, 2, 3, 4, 5};
int somme = 0;
for (int nombre : tableau)
{
    // absence de i
    somme += nombre; //autre écriture pour faire la somme
}
System.out.println("somme = "  + somme); //somme = 15
```

## While

C'est une iteration de zéro à n fois.
La condition est évaluée dès l'entrée. On peut ne pas exécuter le bloc d'instructions.

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

## Do … while

C'est une iteration de 1 à n fois. 
La condition est évaluée en fin de bloc.
On exécutera au moins une fois le bloc d'instructions.

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
