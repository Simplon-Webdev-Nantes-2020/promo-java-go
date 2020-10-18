---
title: Les exceptions
weight: 7
template: docs
doc_sections: java
---

## Définition

Une exception est une erreur qui se produit durant l'exécution du code.  
Une exception non traitée conduit le plus souvent à l'arrêt du programme.  
Heureusement, il est possible de capturer une exception dès qu'elle se produit et de définir le comportement adéquate, et ainsi empêcher l'arrêt du programme.  

## La capture

On capture une exception par l'instruction `try catch finally`.  
Pour cela, on englobe les instructions avec ce try.
Si une exception survient dans une instruction, le déroulement du code s'arrête et nous passons directement dans le bloc catch sans exécuter cette instruction ni les instructions suivantes.  
Il existe autant de catch qu'il y a d'exceptions. Comme les exceptions sont hiérarchisées (héritage) l'ordre d'écriture des catch est important.  
On peut regrouper plusieurs exceptions dans le même catch : `catch(IOException | SQLException ex)`.  
Le bloc finally est un bloc qui sera toujours exécuté, qu'il y ai exception à pas.  
Voici un exemple pour comprendre :

```java
/**
 * division de 2 nombres lus au clavier
 */
Scanner sc = null;
String str1, str2;
int nb1, nb2;

float resultat = 0;  // le résultat est 0 par défaut

try {
    // lecture des nombres au clavier
    sc = new Scanner(System.in);
    System.out.println("dividende :");
    str1 = sc.nextLine();
    System.out.println("diviseur :");
    str2 = sc.nextLine();

    // conversion en entier
    nb1 = Integer.parseInt(str1);
    nb2 = Integer.parseInt(str2);

    // divison
    resultat = nb1 / nb2;

// exception déclenchée quand la string ne contient pas de chiffre
// le résultat est 0 car c'est une exception généré par Integer.parseInt
} catch (NumberFormatException e) {
    System.out.println("une des valeurs n'est pas numérique !");

// exception déclenchée par une division par zéro
// le résultat est 0 car la division n'a pas pu se faire
} catch (ArithmeticException e) {
    System.out.println("Division par zéro !");

// fermeture de l'input stream
// c'est tout le temps exécuté (exception ou pas)
} finally {
    sc.close();
}
```

## La propagation

Lorsque une exception n'est pas traitée dans le code, elle est remontée (ou levée) à la méthode appelante.
On appelle cela la propagation.
On remonte une exception à la méthode appelante par les instructions `throws` et `throw`.  

* `throws` est positionné juste après les paramètres de la méthode.
Ici on liste toutes les exceptions que la méthode peut lever.
C'est très utile pour la méthode appelante.
* `throw` est utilisé dans un bloc d'instructions. Il indique ce moment, qu'il faut lever cette exception.

```java
public static float diviser(Integer nb1, Integer nb2) throws ArithmeticException, ApplicativeException {
    float resultat = 0;

    if (nb2==null) || (nb2==null)
        throw new ApplicativeException("Number null");

    resultat = nb1 / nb2;  // l'ArithmeticException peut survenir ici
    return resultat;
}
```

## Exemple complet avec catch et throws

```java
package fr.manulep.java_for_beginner.exception;

import java.util.Scanner;

public class RunException {

    public static float diviserDeuxNombre() throws Exception {
        Scanner sc = null;
        String str1, str2;
        int nb1, nb2;
        float resultat = 0;
        try {
            // lecture des nombres
            sc = new Scanner(System.in);
            System.out.println("dividende :");
            str1 = sc.nextLine();
            System.out.println("diviseur :");
            str2 = sc.nextLine();

            // conversion en entier
            nb1 = Integer.parseInt(str1);
            nb2 = Integer.parseInt(str2);

            //divison
            resultat = nb1 / nb2;

        } catch (NumberFormatException e) { //exception déclenchée quand la string ne contient pas de chiffre
            System.out.println("une des valeurs n'est pas numérique !");
            throw new Exception("non numérique");
        } catch (ArithmeticException e) { //exception déclenchée par une division par zéro
            System.out.println("Division par zéro !");
        } finally { // tout le temps exécuté
            sc.close(); // fermeture de l'input stream

        }
        return resultat;

    }

    public static void main(String[] args) {
        float divison ;
        try {
            divison = diviserDeuxNombre();
            System.out.println("le résultat de la divison est : " + divison);
        } catch (Exception e) {
            //e.printStackTrace();
            System.out.println("erreur de calcul");
        }
    }
}
```

## Les différents types d'exceptions

### Les 3 familles d'exception

* `Error` : cette exception entraîne l'arrêt du programme. C'est une erreur grave qui empêche le bon fonctionnement de la JVM.
Il ne faut pas lever. Heureusement elle est très exceptionnelle. Un exemple : la JVM n'a plus assez de mémoire pour allouer des objets.
* `Exception` : Ce sont les exemples vu plus haut. Le compilateur nous les indique. C'est à nous développeurs d'écrire le code adéquate. Ce sont des exceptions **explicites**.
* `RuntimeException` : Elle arrive lors de l'exécution du code. Ce sont des exceptions **implicites**. Si on n'indique rien, aucune alerte lors de la compilation. L'erreur pourra se produire lors de l'exécution. Il est cependant possible de lever (throws) ou capturer (catch) ces exceptions.

### Les 3 types d'exception

L'exception est une classe. Donc nous pouvons hériter de cette classe. L'API Java fourni un panel d'exceptions.  
Pourquoi autant d'exceptions ?  
Une exception intervient lors de l'exécution du code.
Il est donc important de bien cibler la cause, soit pour écrire du code adéquate, soit pour identifier la ligne de code fautive lors de l'exécution.  
Si l'API ne vous fournit pas ce que vous voulez, il est tout à fait possible de définir sa propre exception.  
Vous avez donc 3 types d'exception :

#### Les exceptions techniques matérielle

Elles sont déclenchées lorsque que l'on fait appel à un tiers comme une base de données, un fichier.
Par exemple, une coupure réseau vous empêche d'accéder au serveur de la base de données.  
Deux exemples :

* SQLException : la mise à jour dans la base de données ne peut se faire.
* IOException : la lecture du fichier est interrompue car le fichier est abîmé.

#### Les exceptions techniques de la JVM

Ces exceptions ne devraient jamais arriver, mais l'erreur est humaine.
Cela provient d'un mauvais code, d'un état non prévu, d'effets de bord, ...
Aussi faut-il les prévoir.  
Quand on écrit du code on a 3 possibilités pour gérer les erreurs :

* On a une confiance absolue sur ce qui est déjà écrit. Il n'y aura pas d'exception.
Et si exception, elle sera traitée au plus haut niveau (mais pas chez vous).
* On n'a aucune confiance, on teste tout objet avant de l'utiliser. Cette méthode alourdit énormément le code avec l'écriture de if.
* On fait une confiance relative de ce qui est déjà écrit.
On considère que l'on est dans de bonnes conditions pour effectuer l'action, mais on ajoute une section si jamais une exception intervient. C'est le try catch.

#### Les exceptions applicatives

Ce sont les exceptions spécifiques à votre application.
Vous êtes obligé d'écrire votre propre code.  
Par exemple, vous faites un système d'arrosage automatique, mais il n'a pas plu depuis 3 mois et les réserves d'eau sont vides.

## Quelques conseils de gestion des exceptions

* Une exception est par définition exceptionnelle, il est donc inutile de tester chaque instruction.
* On ne capture (catch) que les exceptions que l'on sait traiter, sinon on les lève (throws).
* Écrire dans un log un message générique sans indiquer la ligne de code n'est pas suffisant pour permettre de remonter à la source de l'erreur et apporter une correction.
* Dans un catch, `e.printStackTrace()` + `logger` n'est pas suffisant, il faut aussi avertir l'utilisateur.
* On n'écrit pas un bloc catch sans rien
* Ne réinventez pas la roue, il existe sûrement une exception standard qui répond à votre besoin.
* Si vous lever une nouvelle exception (`throw new`), ne perdez pas les informations de l'exception en cours.
