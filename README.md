# Revue Restaurants

Ce projet a été réalisé dans le cadre d'un devoir scolaire. Il a pour but de modéliser un site web permettant de visualiser une liste de restaurants. 
Chaque restaurant comporte des détails le concernant ainsi que sa localisation GPS sur une carte.

## Pour commencer

Afin d'avoir accès au code du projet et de pouvoir l'exécuter, il suffit de l'importer via la fonctionnalité "clone" de github.  

### Pré-requis

Afin de pouvoir exécuter le projet, il faut d'abord installer la plateforme logicielle node.js puis le gestionnaires de paquets node.js : npm.
Liens vers les documentations officielles : 
* https://nodejs.org/en/
* https://www.npmjs.com/ 

### Installation

Après avoir importé le projet localement, exécutez la commande ``npm install`` à la racine du projet puis dans chacun des dossiers (client et serveur).

## Démarrage

Tout d'abord, lancez le serveur en vous plaçant à la racine du dossier "serveur" et en exécutant la commande ``node serverCrudWithMongo.js``.

Ensuite, ouvrez un nouveau terminal puis lancez le client en vous plaçant à la racine du dossier "client" en exécutant la commande ``npm run serve`` .

Finalement, le terminal vous renseignera ainsi le lien local à ouvrir depuis le navigateur de votre choix. 

## Description de la solution

Ce projet comporte 2 pages : 
* L'accueil ou page principale: </br>
Définie par le composant ListeDesRestaurants, cette page a pour but d'afficher une liste de restaurants récupérés depuis la base de données. Grâce à la md-table de la librairie graphique Material Design, cet affichage se veut ergonomique et concis à travers un tableau comportant le nom du restaurant, son type de cuisine, la ville où il se situe ainsi qu'un bouton "Détail d'un restaurant" menant vers la seconde page.</br>
Cette page d'accueil comporte également un champ de recherche ainsi que des informations sur l'affichage (nombre de pages, nombre de restaurants par page, etc..). Lorsque l'utilisateur tentera de rechercher le nom d'un restaurant ne figurant pas dans la base de donnée, un message s'affichera le redirigeant vers l'ajout d'un nouveau restaurant s'il le souhaite. <br/>
* Le détail d'un restaurant : </br>
Définie par le composant Restaurant, cette page a pour but d'afficher des informations supplémentaires comme la note attribuée, les horaires de réservation disponible ainsi qu'un formulaire à remplir pour la réservation. Via la v-card de la librairie graphique Vuetify, une image choisie aléatoirement à partir d'une librairie va apparaître pour compléter l'affichage du restaurant. </br>
Finalement, une carte est affichée permettant aux utilisateurs de s'orienter et d'identifier l'endroit exact où se situe le restaurant. Cette carte est affichée grâce à la librairie leaflet qui se base sur l'api OpenStreetMap. 

## Problèmes rencontrés

L'ajout d'un nouveau restaurant n'est plus possible dans cette version du projet. En effet, bien que la requête POST renvoie un statut 200 OK (voir image 1 ci-dessous), le restaurant ne semble pas être ajouté au serveur. Lorsqu'une recherche est effectuée sur le nom de ce nouveau restaurant, aucun résultat n'est retourné par le serveur (voir image 2 ci-dessous). 
![Alt text](./RequetePost.png?raw=true "Image 1 : Résultat de la requête POST")
![Alt text](./RequeteSearch.png?raw=true "Image 2 : Résultat de la requête GET")

## Fabriqué avec

* [Vue.js](https://vuejs.org/) - Framework HTML/CSS/JavaScript (front-end)
* [node.js](https://nodejs.org/en/) - JavaScript (back-end)
* [Vue Material](https://www.creative-tim.com/vuematerial/) - Librairie graphique
* [Vuetify](https://vuetifyjs.com/en/) - Librairie graphique

## YouTube 

Voici le lien YouTube vers la vidéo de présentation du projet : https://youtu.be/45TRuKGLwWU 

## Auteurs

* **Hasnaa Elalaoui** _alias_ [Hasnaa-Elalaoui](https://github.com/Hasnaa-Elalaoui)
* **Axel Jean--Petez** _alias_ [zetep0](https://github.com/zetep0)

## Bibliographie

En plus des liens de documentation officielle mentionnés ci-dessus, nous avons eu recours à d'autres ressources : 
* Pour instancier et paramétrer les coordonnées de la carte : <br/>
https://www.nicolaskempf.fr/creez-vos-cartes-interactives-avec-vuejs-et-leaflet/ <br/>
https://vue2-leaflet.netlify.app/quickstart/#hello-map <br/>
https://stackoverflow.com/questions/6878761/javascript-how-to-create-random-longitude-and-latitudes <br/>
* Pour la tentative de déploiement du site sur Github Pages : <br/>
https://medium.com/swlh/deploy-vue-app-to-github-pages-2ada48d7397e <br/>
* Pour résoudre la majorité des bugs rencontrés : <br/>
https://stackoverflow.com/ <br/>
* Pour la réalisation du README : <br/>
https://gist.github.com/JulienRAVIA/1cc6589cbf880d380a5bb574baa38811
