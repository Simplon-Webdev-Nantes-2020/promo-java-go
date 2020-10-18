---
title: Les annotations
weight: 15
template: docs
doc_sections: java
---

Les annotations Java sont utilisées pour fournir des méta-données pour votre code Java.  
Étant des méta-données, les annotations Java n'influent pas directement sur l'exécution de votre code.  
Elles sont une alternative aux fichiers de configuration XML (notion qui sera abordée avec Spring).  
On repère une annotation par le symbole `@`.  
Une annotation s'applique à une classe, propriété ou méthode.  
Une annotation est un objet (tout est objet en java).  Elle se déclare comme suit :

```java
public @interface Contrainte {
    int minLength;
    int maxLength;
}
```

```java
@Contrainte(minLength=3, maxlength=5)
public void setName(){
//...
}
```

Quelques annotations standards :  
@Overrides  
@Deprecated  
@Documented  
@Inhereted  
@Retention  
@Target  
@SuppressWarning  
