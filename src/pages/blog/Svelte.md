---
title: Svelte
excerpt: >-
   Svelte c'est super.
author: Joseph Allain
date: "2020-11-09"
image: images/blog/Svelte.jpg
thumb_image: images/blog/Svelte.jpg
template: post
---

## C'est quoi ?

Svelte.js, c'est un _framework_ front-end qui fonctionne par compilation grâce à des _module bundlers_.

Le [site officiel](https://svelte.dev/) de Svelte propose beaucoup de tutos, ainsi qu'une documentation riche permettant de prendre en main rapidement son utilisation.

**Lexique :**

_**Framework front end:&nbsp;**_
_Cadre de travail, de développement, qui permet de créer des applications web en particulier. Ils proposent une bibliothèque de fonctionnalités._
_Ils permettent de gagner du temps, et de coder de manière efficace grâce à leurs outils._
_On peut citer React, framework le plus utilisé sur le marché._

_La plupart des frameworks javascript intègrent leurs outils dans le code qui va être exécuté par le navigateur, alors qu'un projet svelte va être compilé en javascript brut, pour être plus rapidement exécuté_

_**Module bundler:&nbsp;**
Outil qui permet de fusionner intelligement des fichiers et les dépendances dont il a besoin, pour n'avoir qu'un fichier en sortie._

## Et donc ?

### Modularité

Un fichier `.svelte`, peut contenir du HTML, du javascript, et du css (voire même sass, à ajouter dans les rêgles de compilation).

```html
<script>
	//ici du js
</script>

<style>
	/* ici le css */
</style>

<!-- Ici le html -->
```

Imaginez un gros projet web, avec un fichier css de plusieurs centaines de lignes, et pareil pour le javascript, avec des noms de variables et de div à rallonges, bref, la jungle.
Ce genre de projet bénéficierait d'une gestion plus modulaire de ses composants. La fonction première de Svelte est de pouvoir créer ce genre de composants, par exemple un composant "Bouton" qu'on peut réutiliser pour chaque bouton de la page.

Notre fichier `Bouton.svelte` ne contiendra que le js correspondant à la logique du bouton, et le css pour styliser le bouton.

Cet exemple n'en est qu'un parmis tant d'autres ; Un composant svelte peut contenir d'autres composants, qui eux même contiennent d'autres composants.. On peut ainsi hiérarchiser un projet facilement et proprement.

### Réactivité et logique

```html
<script>
	let nom = "Bob";
</script>

<style>
	/* css */
</style>

{#if nom}
<h1>Salut, {nom} !</h1>
{:else}
<h1>Salut !</h1>
{/if}
```

## Exemples plus poussé

Voici des exemples plus avancés que j'ai conçu pour montrer une infime partie des possibilités de Svelte en action.

Pour en savoir plus sur Svelte, n'hésitez pas à regarder le site officiel, bourré d'exemples et de tutoriels !

**Projet voyage :**

[Repo Github](https://github.com/Gazzia29/Svelte-Exemple-Voyage)

[Site en live](https://svelte-exemple-voyage.jallain.vercel.app/)

**Projet compteur :**

[Repo Github](https://github.com/Gazzia29/Svelte-Exemple-Compteur)

[Site en live](https://svelte-exemple-compteur.jallain.vercel.app/)
