---
title: Try with
weight: 10
template: docs
doc_sections: java
---

L'instruction try avec ressource définit une ressource qui sera automatiquement fermée à la fin du bloc.  
Ceci simplifie l'écriture. Le try est très utile pour les flux, les resources, les connexions à une base de données.  
Dans l'exemple suivant, nous lisons un fichier texte et affichons le contenu dans la console.  

```java
// gestion de l'exception I/O
try {
    // try with
    try (BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/jm/AppData/Local/Temp/monfichier.txt"))) {
        String ligne=null;
        while ((ligne = bufferedReader.readLine()) != null) {
            System.out.println(ligne);
        }
    }
} catch (IOException ioe) {
    ioe.printStackTrace();
}
```
