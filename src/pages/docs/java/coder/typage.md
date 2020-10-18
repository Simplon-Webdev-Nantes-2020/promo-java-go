---
title: Le typage
weight: 5
template: docs
doc_sections: java
---

## Principe

Un type est l'appartenance à une classe, ou à un primitif.
Tout objet, variable, méthode est typé.  
Pour rappel, les primitifs sont des entiers (byte, short, int, long), des décimaux (float, double), des booléens (boolean), des caractères (char) ou vide (void).  
Le type est obligatoire et est indiqué lors de la déclaration.
On parle de typage statique : un élément ne peut pas changer de type au cours de l'exécution.
Lorsque que l'on affecte une variable par une autre, les 2 variables doivent être de même type.
Heureusement, il existe des passerelles pour les affectations de types différents.  
Nous appelons cela la conversion de type.  
Note : nous n'abordons ici que les types de bases qui sont les entiers, les décimaux, les chaines de caractères, les booléens.

## La déclaration

### Le typage explicite

Le type de la variable est indiqué devant l'élément;

```java
String firstName = new String("manu");
String lastName = "lep";
```

### Le type générique (généricité)

Reconnaissable par sa notion en diamant `<>`. Il s'agit de laisser le développeur choisir le type du contenu dans le diamant.

#### La généricité dans les listes

```java
// liste d'entiers
ArrayList<Integer> notes = new ArrayList<>();
```

```java
/**
 * creation d'une phrase a partir d'une liste
 */
StringBuffer phrase = new StringBuffer();
ArrayList<String> mots = new ArrayList<>();

mots.add("Il");
mots.add("neige");
mots.add("dans");
mots.add("les");
mots.add("Alpes");

for (String mot : mots) {
    phrase.append(mot);
    phrase.append(" ");
}
System.out.println(phrase);
```

#### Créer sa propre classe générique

```java
public class Stock<T, S> {
    private T clef;
    private S valeur;

    public Stock(T clef, S valeur){
        this.clef = clef;
        this.valeur = valeur;
    }

    public T getClef() {
        return clef;
    }

    public void setClef(T clef) {
        this.clef = clef;
    }
    public S getValeur() {
        return valeur;
    }
    public void setValeur(S valeur) {
        this.valeur = valeur;
    }

    public String toString() {
        return "(" + this.getClef() + ", " + this.getValeur() + ")";
    }

    public static void main(String[] args) {
       Stock<String, Boolean> soleil = new Stock<String, Boolean>("soleil", true);
       System.out.println("Valeur de soleil : " + soleil);

       Stock<Integer, Character> deux = new Stock<Integer, Character>(2, 'Deux');
       System.out.println("Valeur Deux : " + deux);
    }
}
```

#### le wildcard '?'

Il se peut que vous ne savez pas quel type mettre dans le diamant.
Dans ce cas, utilisez le wildcard '?', ou mieux si vous avez de l'héritage ? extend.

```java
// liste de vehicule (pas de wildcard)
ArrayList<Vehicule> listVehicule = new ArrayList<Vehicule>();

// liste d'objets
ArrayList<?> list;
list = new ArrayList<String>();
list = new ArrayList<Long>);

// liste de voiture et liste voiture electrique
ArrayList<? extends Vehicule> listVoiture = new ArrayList<Voiture>();
ArrayList<? extends Vehicule> listVoitureElec = new ArrayList<VoitureElectrique>();
}
```

### L'inférence de type pour les variables

Java 10 a introduit la notion d'inférence de type pour les variables locales.
Nous utilisons le mot clef `var`, le type de la variable est déduit du contexte.  
Il ne s'agit pas d'un typage dynamique.

```java
var firstName = "manu";
var names = new ArrayList<String>();
```

## La conversion

### l'autoboxing

A chaque primitif (sauf void) correspond une classe associée. Par exemple :

* int : Integer
* float : Float

Le changement de type se fait automatiquement. C'est l'autoboxing.

```java
    int intPrim = 5;
    Integer intObj = 8;

    intObj = intPrim;
    intPrim = intObj;
```

### Le cast

Pour convertir d'un type à un autre, le premier réflexe est d'utiliser le cast.
On va indiquer le type de résultat voulu en mettant le type désiré entre parenthèse.

```java
int i = 205;
float j = (float) i;
```

Ceci est valable pour toutes les classes à l'unique condition que des classes soient très ressemblantes.
On peut caster un entier en décimal, mais on ne peut pas caster un entier en String.  

### Le cast sur l'héritage

```java
public class Animal {
    private String race;
    protected String nom;

    public Animal(String race, String nom) {
        this.race = race;
        this.nom = nom;
    }
    protected String sAnnoncer() {
        return ("je suis le " + this.race + " " + this.nom);
    }
}

public class Chien extends Animal {

    public Chien(String nom) {
        super("chien", nom); // appel du constructeur parent
    }

    public void parler() {
        System.out.println("C'est le chien " + this.nom + " qui parle :"); // appel de la propriété parente
        System.out.println(this.sAnnoncer()); // appel de la méthode du parent
    }
}

public class RunHeritage {
    private static Chien medor;

    public static void main(String[] args) {

        medor = new Chien("Médor");
        medor.parler();

        Animal animal = medor;
        animal.parler();  // ==> erreur de compilation car parler n'appartient pas à Animal
        ((Chien) animal).parler(); // le cast a permis de descendre dans la hiérarchie et d'appeler la méthode

    }
}

```

### Par méthode

Dans les classes de bases, il existe de nombreuses méthodes qui permettent de convertir dans un autre type.  
Quelques exemples : valueOf(), intValue(), floatValue(), doubleValue(), toString().

```java
// méthode statique de la classe String
int i = 150;
String s = new String();
s = String.valueOf(i);
```

```java
// méthode d'instance de la classe Integer
Integer intObj = 85;
Long longObj;
longObj = intObj.longValue();
```
