---
title: Les variables
weight: 3
template: docs
doc_sections: java
---

## Stocker les valeurs

Les variables en java permettent de stocker des données en mémoire pour pouvoir les utiliser ensuite. Les variables sont typées (type nombre, mot, ...) et sont créées en deux phases :

* déclaration
* initialisation

```java
int unNombre; // on déclare que le type de la variable est 'int'
unNombre = 17;
```

On peut rassembler ces deux phases en une seule instruction :

```java
int unNombre = 17;
```

Une fois qu'une variable est déclarée, on ne peut pas changer son type. On peut cependant lui affecter de nouvelles valeurs.

```java
int unNombre = 17;
unNombre = 13; // ok
unNombre = "abc"; // no!
```

```java
int unNombre = 17; // primitives en minuscules
char initiale = 'b';
double monSouvenirDePi = 3.1415;
boolean simplonAMontreuil = true;

String unMotOuUnTexte = "hey jude, don't make it bad"; // String n'est pas un type primitif : commence par une majuscule
```

Pour afficher le contenu d'une variable, on utilise `System.out.println` :

```java
int unNombre = 17;
int unAutre = 23;
int total = unNombre + unAutre;
System.out.println(total);
```

## Les nombres

Deux grand types de nombre nous seront utiles : les `int` qui représentent les nombres entiers et les `double` qui représentent les nombres décimaux.

```java
int monAge = 30;
int ageMatusalem = 1_042; // le tiret du bas peut être utilisé pour rendre visuellement les nb plus faciles à lire

// Ma taille en cm
double taille = 184.5;
```

> Remarque : il existe d'autres types de nombres entiers : byte, short, long et d'autres types de décimaux : float. Mais ils sont utilisés plutôt pour des questions d’optimisation de programme.

On peut **caster** (=convertir) des types en d'autres, mais attention au résultat :

```java
int a = 10.0; // a = 10, rien à faire
a = (int)3.14; // a = 3, il faut faire le cast
```

## Les caractères

Ce type de données ne permet de stocker qu'un seul caractère : chiffre, lettre, symbole.

```java
char initialeMajuscule = 'J';
char dernierLettre = 'n';
char unNombreOuBien = '1';  // c'est bien le caractère 1, et pas un nombre sur lequel on peut faire des opérations
```

## Les chaînes de caractères

Afin de stocker du texte (un prénom, un nom, une phrase, ...) nous utiliserons les `String` qui représentent les chaînes de caractères.
Notez que `String` commence par une majuscule.

```java
String prenom1 = "Josselin";
String prenom2 = "Philippe";
String starP3 = "Jean Michel Doudoux"
```

On peut utiliser un certain nombre de caractères spéciaux qui n’apparaîtront pas en les **échappant** avec un backslash :

```java
String menu = "Faites votre choix :\n1-Pour démarrer\n2-Pour quitter";
System.out.println(menu);
```

Qui s'affichera ainsi :

```texte
Faites votre choix :
1-Pour démarrer
2-Pour quitter
```

## Les booléens

Le type de données élémentaire à connaître qui est à la base de l'informatique d'aujourd'hui est le booléen. Il s'agit d'un type de données qui n'a que deux valeurs possibles : `true`ou `false`. Cela correspond au `0` et au `1` du binaire (le yi et le yang de l'informaticien). Nous l'utiliserons beaucoup lorsque nous aborderons les conditions.

```java
// Une vérité
boolean jeTravailleASimplon = true;

// Un mensonge
boolean jeSuisPlusRicheQueBillGates = false;
```

## Le type vide

`void` est utilisé pour informer qu'une méthode/fonction ne renvoie pas de résultat.

## Le type null

`null` est utilisé pour indiquer qu'un objet n'existe pas. Il est `null`.

## Le tableau

Un tableau est une structure de données contenant un groupe d'éléments, tous du même type.
Un tableau est de longueur finie. Pour définir un tableau, nous utilisons les crochets [].  
Les tableaux peuvent être de une ou plusieurs dimensions. Au delà de 2, il est préférable d'utiliser une autre structure.  
Pour accéder à un élément du tableau, nous utilisons l'indice. Le premier indice commence à 0.
Si nous tentons d'accéder en dehors de ses limites, la JVM lève l'exception (erreur) `ArrayIndexOutOfBoundsException`.
Pour cette raison de taille finie le tableau est souvent délaissé au profit d'autres structures plus souples d'utilisation.

```java
public static void testTableau() {
    int tableauEntier[] = {0,1,2,3,4,5,6,7,8,9};
    String tableauChaine[] = {"Jean", "Bon", "Beurre", "sncf"};
    int tableauEntier2[] = new int[6];
    int premiersNombres[][] = { {0,2,4,6,8},{1,3,5,7,9} };

    for (int i = 0; i < tableauChaine.length; i++) {
        System.out.println(tableauChaine[i]);
    }

    for (int i = 0; i < premiersNombres.length; i++) {
        for (int j = 0; j < premiersNombres[i].length; j++) {
            System.out.println(premiersNombres[i] [j]);
        }
    }
}
```
