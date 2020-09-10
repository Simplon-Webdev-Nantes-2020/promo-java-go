---
title: Les types de données
weight: 3
template: docs
doc_sections: java
---

## Les types primitifs
Les types primitifs sont les seuls représentations de données qui ne sont pas des objets.  
Donc il n'y a pas d'instanciation (new) à faire.  

### Les entiers
* `byte` : de -128 à 127, soit 1 octet
* `short` : -32 768 32 767.2, soit 2 octets
* `int` : de -2 147 483 648 à 2 147 483 647, soit 4 octets
* `long` : de -9 223 372 036 854 775 808 à 9 223 372 036 854 775 807, soit 8 octets.  

La RAM étant conséquente aujourd'hui byte et short sont peu utilisés.  
Note : Lors d'un calcul, si la capacité est dépassée, l'entier redémarre au début de la plage sans indiquer d'erreur.  

### Les décimaux
Appelé aussi  nombres flottants à cause du déplacement de la virgule. 
* `float` : de -1.40239846E-45 à 3.40282347E38 , soit 4 octets
* `double` : de 4.9406564584124654E-324 à 1.797693134862316E308, soit 8 octets

### le caractère
Le caractère est représenté par un seul caractère sur 2 octets.  
Représenté par le mot clef `char`.  
Note : une chaîne de caractères n'est pas un primitif.  

### le booléen
Il a 2 valeurs uniquement : `true` et `false`.  
Représenté par le mot clef `boolean`.  

### le type vide
`void` est utilisé pour informer qu'une méthode ne renvoie pas de résultat.  

### documentation
[doc détaillée](http://anisfrikha.developpez.com/tutoriel/java/types-primitifs/)

## La constante
La constante est une propriété qui ne change pas de valeur.  
Il n'y a pas de constante en Java.  
Pour contourner le problème on utilise `static final`.  
``` java
private static final float PI = 3.1416f;
```

## L'énumération
Une autre façon de déclarer des constantes les énumérations. Il s'agit du n-uplet contenant des identifiants.  
Les énumérations sont très pratiques pour ajouter une valeur au sémantique au code.  
Mot clef : `enum`.  
``` java
private static final enum Note{DO, RE, MI, FA, SOL, LA, SI};
```

## La chaîne de caractères
Une chaîne de caractères est une suite de caractères. Il faut utiliser un objet pour stocker la chaîne.  
Deux structures sont particulièrement bien adaptée : `String` et `StringBuffer`.

### String
`String` sert à stocker une chaîne de caractères non modifiable.  
La taille de la chaîne est déterminée lors de sa première affectation et donc la JVM alloue une place en mémoire.  
Si la valeur de la chaîne change, en fait la JVM affecte une nouvelle zone en mémoire. Ce qui est coûteux.  
La `String` est donc plus appropriée pour stocker une valeur qui ne change pas.  

### StringBuffer
Si le contenu de la chaîne évolue, il faut utiliser le `StringBuffer`.  
Il alloue dynamiquement la mémoire.

### StringTokenizer
Le `StringTokenizer` est utilisé pour stocker une phrase, c'est à dire une suite de mots.  
Le délimitateur peut être spécifié ou par défaut (espace, return, tab).  

### documentation
[doc détaillée](http://jca.developpez.com/tutoriel/java/string/#LI)

## Les dates
En Java, la date est stockée au format numérique. Il s'agit du nombre de millisecondes depuis le 01/01/1970.  
A partir du moment où c'est un entier, il est facile de comparer des dates et de calculer des plages.  
Et pourtant l'utilisation des dates est loin d'être simple en Java.  
Le gros problème rencontré est l'affichage de cette date. L'affichage est une chaîne de caractères qui contient diverses informations : année, mois, jour, heure, minute, seconde, milliseconde. Ces informations ne sont pas toutes affichées et diffèrent d'un pays à un autre. 
Le deuxième problème est le transfert de sa valeur dans un autre logiciel, fichier ou base de données. Nous passons par une chaîne de caractères. Pourquoi ? parce que tout le monde ne stocke pas cette date en entier (ni en décompte depuis le 01/01/1970).  
Au cours de ses versions, Java a sorti plusieurs API pour gérer les dates. La multiplicité des classes et leur imperfection n'a pas simplifié les choses.  
Aujourd'hui, il faut utiliser la [nouvelle API `Date` and `Time`](http://soat.developpez.com/tutoriels/java/time-date-java8/).    
Et voici un tuto de [l'utilisation des dates](https://www.jmdoudoux.fr/java/dej/chap-utilisation_dates.htm) au cours du temps.  

## Les tableaux
Un tableau est une structure de données contenant un groupe d'éléments, tous du même type.  
Un tableau est de longueur finie.
Pour définir une tableau, nous utilisons les crochets `[]`.  
Les tableaux peuvent être de une ou plusieurs dimensions. Au delà de 2, il est préférable d'utiliser une autre structure.   
Pour accéder à un élément du tableau, nous utilisons l'indice. Le premier indice commence à 0.   
Si nous tentons d'accéder en dehors de ses limites, la JVM lève l'exception `ArrayIndexOutOfBoundsException`.  
Pour cette raison de taille finie le tableau est souvent délaissé au profit d'autrse structures.  

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
# le null
Tout objet instancié (créé avec `new`) contient une adresse pointant sur une zone mémoire.  
Mais qu'en est-il d'un objet non instancié ? Il a pour valeur `null`.  
Un objet qui a pour valeur null n'a pas de vie, donc on ne peut pas lui appliquer une méthode.  
Dans ce cas nous aurons la célèbre erreur `NullPointerException `.  
Quelques solutions pour éviter l'erreur :
* tester si objet est `null` avant de l'utiliser (`monObj == null`)
* [catcher l'exception par un `try catch`](exception.md)
* utiliser les [annotations `@NotNull` et `@Nullable`](https://blog.octo.com/comment-ne-plus-avoir-de-nullpointerexception-en-java/).  

## Le transtypage
### Par cast
Il est parfois utile de convertir une variable en un autre type. Par exemple de convertir un entier en décimal. 
Pour cela on utilise le cast. 
Il s'agit de créer une nouvelle variable dans le type désiré et d'affecter la valeur en indiquant le type entre parenthèse. 
```java
	int i = 205;
	float j = (float)i;
```
Ceci est valable aussi pour les classes. 
Bien entendu, on ne peut caster que des objets qui se ressemblent.  

## Par méthodes
Dans les classes de bases, il existe de nombreuses méthodes qui permettent de convertir dans un autre type. 
Quelques exemples : valueOf(), intValue(), floatValue(), doubleValue(), toString().  
```java
	int i = 150;
	String s = new String();
	s = String.valueOf(i);
```

## Autoboxing
Depuis java 5, il y a une simplification d'utilisation des types primitifs et de leur classe associée.  
Ainsi pour passer de int à Integer, il n'est plus nécessaire de transtyper. 
C'est l'autoboxing.

## Doc
Quelques [exemples](http://progjava.blogspot.fr/2011/03/le-transtypage-en-java.html).  


