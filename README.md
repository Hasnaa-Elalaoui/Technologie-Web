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

## Fabriqué avec

* [Vue.js](https://vuejs.org/) - Framework HTML/CSS/JavaScript (front-end)
* [node.js](https://nodejs.org/en/) - JavaScript (back-end)
* [Vue Material](https://www.creative-tim.com/vuematerial/) - Librairie graphique
* [Vuetify](https://vuetifyjs.com/en/) - Librairie graphique


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
