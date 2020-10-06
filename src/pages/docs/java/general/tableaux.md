---
title: Les Tableaux
weight: 7
template: docs
doc_sections: java
---

## Le tableau

Un tableau est une structure de données contenant un groupe d'éléments, tous du même type.
Un tableau est de longueur finie.  
Pour définir un tableau, nous utilisons les crochets [].  
Notez bien : pour créer un tableau nous devons connaître le nombre d'éléments et n'avons pas le besoin de l'agrandir.  
Pour accéder à un élément du tableau, nous utilisons un indice. Le premier indice commence à 0.
Si nous tentons d'accéder en dehors de ses limites, la JVM lève l'exception (une erreur) `ArrayIndexOutOfBoundsException`.  
Pour cette raison de taille finie, le tableau est souvent délaissé au profit de l'ArrayList, structure plus souples d'utilisation.  
Les tableaux peuvent être de une ou plusieurs dimensions. Au delà de 2, il est préférable d'utiliser une autre structure.  

### Déclaration

```java
// déclaration et initialisation d'un tableau d'entiers
int tableauEntier[] = {0,1,2,3,4,5,6,7,8,9};

// déclaration et initialisation d'un tableau de String
String tableauChaine[] = {"Jean", "Bon", "Beurre", "sncf"};

// déclaration et initialisation d'un tableau à 2 dimensions
int premiersNombres[][] = { {0,2,4,6,8},{1,3,5,7,9} };

// déclaration d'un tableau d'une longueur 6 sans valeur.
int tableauEntier2[] = new int[6];
```

### Parcours d'un tableau

```java
public static void testTableau() {

    // parcours d'un tableau à une dimension
    String tableauChaine[] = {"Jean", "Bon", "Beurre", "sncf"};
    for (int i = 0; i < tableauChaine.length; i++) {
        System.out.println(tableauChaine[i]);
    }

    // parcours d'un tableau à 2 dimensions
    int premiersNombres[][] = { {0,2,4,6,8},{1,3,5,7,9} };
    for (int i = 0; i < premiersNombres.length; i++) {
        for (int j = 0; j < premiersNombres[i].length; j++) {
            System.out.println(premiersNombres[i] [j]);
        }
    }
}
```

### Remplir un tableau

```java
public static void remplirTableau() {
    int tableauEntier2[] = new int[6];
    tableauEntier2[0] = 52;
    tableauEntier2[1] = 14;
    tableauEntier2[2] = 0;
    tableauEntier2[3] = -9;
    tableauEntier2[4] = 12;
    tableauEntier2[5] = 14;
}
```

### Copier un tableau

```java
public static String[] copierTableau(String[] liste) {

    // instanciation du tableau de sortie
    int lg = liste.length.
    String listeRetour[] = new String[lg];

    // copie de chaque element
    for (int i = 0; i < liste.length; i++) {
        listeRetour[i] = liste[i];
    }
    return listeRetour;
}
```

### Les ressources

[Développons en Java](https://www.jmdoudoux.fr/java/dej/chap-syntaxe.htm#syntaxe-9)

## L'ArrayList

Il s'agit de tableaux dynamiques, c'est à dire d'un array sans limite de capacité.  
Son nom de code : `ArrayList`. On va l'utiliser lorsque l'on ne connaît pas la capacité du tableau.  
Voici un exemple d'utilisation :

``` java
public static void testListe () {
    ArrayList<String> listePersonne = new ArrayList<>();
    ArrayList<String> listeHomme = new ArrayList<>();
    ArrayList<String> listeFemme = new ArrayList<>();

    //constitution liste de femmes
    listeFemme.add("Marie");
    listeFemme.add("Anne");
    afficherListe("Femme",listeFemme);

    //constitution liste d'hommes
    listeHomme.add("Jean");
    listeHomme.add("Paul");
    listeHomme.add("Pierre");
    afficherListe("Homme",listeHomme);

    //fusion des 2 listes
    listePersonne.addAll(listeHomme);
    listePersonne.addAll(listeFemme);

    //supression d'un élément
    listePersonne.remove("Jean");

    //liste finale
    afficherListe("Tous",listePersonne);
}

private static void  afficherListe(String nomListe, List<String> liste) {
    int i = 0;
    System.out.println("\nListe " + nomListe + " : " + liste.size() + " individus");
    for (String personne : liste) {
        System.out.format("élément %2d %s \n", ++i, personne);
    }
}
```
