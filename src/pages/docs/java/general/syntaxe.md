---
title: La syntaxe
weight: 4
template: docs
doc_sections: java
---

## La grammaire
Comme tout langage, java est basé sur une grammaire. L'écriture du code est très proche du C et C++.  
Toutefois, l'écriture du code est simplifié.  
Voici les grands principes :  
* c'est un langage objet et tout est basé sur la notion de classe,
* il est impossible d'écrire du code en dehors d'une classe,
* il existe une classe qui contient une méthode main(). Cette classe est le point d'entrée lors de l'exécution du code.
* On dit souvent que c'est un C++ épuré
    * des concepts subtils comme les pointeurs ont été supprimées,
    * Une classe est décrite dans un seul fichier (pas de fichier .h, ni .cpp)  
    * la déclaration des méthodes (fonction en objet) est mieux encadrée
* l'appel à d'autres classes est fait l'instruction import.  
* Comme dans beaucoup de langages, il y a 
    * des mots clefs
    * des variables, des collections.  
    * des instructions
    * des instructions conditionnelles
    * des itérations
    * des fonctions
    * des exceptions.

## La norme d'écriture 
Le code informatique est écrit pour la machine et surtout pour l'homme. Ce code sera relu par vous même ou par une tierce personne.  
Or l'écriture est proche d'une écriture mathématique. Pour cela, on va essayer de fluidifier au maximum la lecture du code.  
On va se rapprocher le plus possible d'un langue naturelle (français, anglais). 
La langue utilisée dépend du contexte et de l'équipe avec laquelle on travaille.  
Pour l'internationalisation et l'opensource, l'anglais est de rigueur.  
Il faut écrire le code comme un récit, de façon à ce que le lecteur se pose le moins de questions possibles.  

Pour cela, on utilise plusieurs techniques : 
* On écrit en camelCase
* Une classe est un mot commun
* une propriété est un mot commun
* une méthode est un verbe ou un groupe verbal à l'infinitif
* le contenu d'une méthode doit être court.
* si un calcul est complexe, on en fait une méthode avec un nom explicite
* Les paramètres d'une méthode doivent être justifiés. Voir s'il n'y a pas moyen de passer par une propriété.
* On utilise des mots significatifs pour les variables et propriétés. 
* on utilise l'indentation pour la lisibilité des blocs
* on met des commentaires si nécessaire
* si le code est significatif, il est inutile de mettre un commentaire
* on utilise le refactoring
* on n'indique pas une modification de code existant, git est là pour ça.

## Les mots réservés, les opérateurs
Voici 
* [une liste de mots réservés](http://jmdoudoux.developpez.com/cours/developpons/java/chap-syntaxe.php#syntaxe-2) 
* [et une autre documentation](http://thierry-leriche-dessirier.developpez.com/tutoriels/java/mots-cles-java/)

## Les commentaires
Les commentaires sont primordiaux pour documenter du code. Ils complètent le code écrit.  
Mais n'oubliez pas que si vous écrivez bien, il y aura peu de commentaires.  
Pourquoi limite-on le commentaire ?
* il n'est pas lu par la machine
* Il n'est pas automatiquement mis à jour par un refactoring
* risque de décalage entre le commentaire et le code
* Un développeur qui lit un commentaire peut perdre le fil du raisonnement
* Un commentaire, c'est comme un sous-titrage d'un film en VO. C'est mieux si on comprend sans.

Trois façons de commenter :
* `//` commente une fin de ligne
* `/* */` commente un paragraphe
* `/** */` commente une méthode et sert à générer le javadoc.  

## La méthode (fonction)
Comme pour la propriété, la fonction n'existe plus en objet.  
En Java, on n'utilise donc pas la mot `function`.  
Le principe de la méthode est le même que celui de la fonction, sauf qu'elle est attachée à un objet ou une classe.
```java
	public int compter(int nb1, int nb2, int nb3) {
		return nb1 + nb2 + nb3;
	}
```
On appelle une méthode, par le nom de l'objet, suivi d'un point, suivi du nom de la méthode, suivi de parenthèses. 
```java
monObjet.maMethode()
```
Note : une méthode requiert notre attention `main`. C'est le point d'entrée d'un programme. 
Nous en reparlerons en abordant l'objet.  

## Les paramètres d'une méthode
Les paramètres passés lors d'un appel de méthode sont passés par valeur.  
C'est à dire que le paramètre est dupliqué dans une nouvelle zone mémoire.  
La valeur de ce paramètre peut être modifiée, mais la méthode appelante ne prendra jamais connaissance de cette nouvelle valeur.  

Par contre si ce paramètre est un objet, c'est le pointeur qui est dupliqué et non la valeur de l'objet. 
Donc la modification d'un objet sera visible par la méthode appelante. On peut assimiler cela par un passage par référence.  
Attention toutefois, l'objet doit être instancié avant l'appel (ceci n'est valable pour la valeur de retour).  

## La propriété
La propriété est ce qui constitue un objet. C'est une donnée.  
Cette donnée est stockée dans une variable particulière que l'on déclare en début de classe.  
La déclaration de la propriété est identique à une variable.  
On appelle cette propriété par le nom de l'objet, suivi d'un point, suivi du nom de la propriété.
```java
monObjet.maPropriete
```

## Les variables
En java, il n'existe pas de variable globale.
On retrouvera les variables uniquement dans une méthode.  
C'est une donnée intermédiaire servant à des calculs. Sa portée ne peut pas dépasser la méthode.  
Pour qu'une donnée ait une durée de vie plus longue, il faut utiliser la propriété.  

## Les instructions
Une instruction est une ligne de code qui est composé d'une suite de mots et se termine par un `;`.  
Elle permet une affection, un appel de méthode.

### Deux jeux d' instructions intéressantes pour débuter la programmation :
#### sortie sur la console
```java 
System.out.println("hello world"); //sortie sur la console
``` 
#### lecture de l'entrée clavier
``` java 
Scanner sc = new Scanner(System.in);
System.out.println("Veuillez saisir un mot :");
String str = sc.nextLine();
System.out.println("Vous avez saisi : " + str);
sc.close();
``` 

## Les blocs de code
Les blocs de codes sont un regroupement d'instructions. On peut comparer cela à un paragraphe.  
Un bloc est délimité par des accolades `{ }`.  

## Les structures de contrôle
Nous faisons ici un rapide tour d'horizon des structures de contrôle.  

### Condition (if else)  
Pour faire des conditions complexe, utilisez `&&`, `||` et le `()`.  
```java
if (nombre < 0) {
  System.out.println("le nombre est négatif");
}
else {
  System.out.println("le nombre est positif")
}
```

### Condition multiple (switch)
```java
int note = 10; //On imagine que la note maximale est 20

switch (note)
{
  case 0:
    System.out.println("Ouch !");
    break;
  case 10:
    System.out.println("Vous avez juste la moyenne.");
    break;
  case 20:
    System.out.println("Parfait !");
    break;
  default:
    System.out.println("Il faut davantage travailler.");
}
```
### La condition ternaire
```java
int max = (x < y) ? y : x ; 
```
## Les boucles
### Tant que (while)
```java
	public static void boucle2() {
		int compteur = 10;
		while (compteur < 20) {
			System.out.print("valeur du compteur : " + compteur);
			compteur++;
			System.out.print("\n");
		} 
	}
```

### répéter jusqu'à (do while)
```java
	public static void boucle1() {
		int compteur = 10;
		do {
			System.out.print("valeur du compteur : " + compteur);
			compteur++;
			System.out.print("\n");
		} while (compteur < 20);
	}
```

### pour (for)
```java
	public static void boucle3() {
		int tableauChiffre[] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
		for (int i = 0; i < tableauChiffre.length; i++) {
			System.out.println(tableauChiffre[i]);
		}
	}
```

### parcours d'une collection (foreach)
```java
		List<String> liste;
		for (String personne : liste) {
			System.out.format("élément %2d %s \n", ++i, personne);
		}
```

### les débranchements
A utiliser avec parcimonie.  
* break : permet de quitter immédiatement une boucle ou un branchement.
* continue : s'utilise dans une boucle pour passer directement à l'itération suivante.
* return : sort de la méthode.
