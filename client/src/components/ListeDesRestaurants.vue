<template>
<!-- Début bannière -->
  <div>
    <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="../assets/restaurant-interieur.jpeg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.3), rgba(25,32,72,.4)" 
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Menu </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      <v-app-bar-title class="title">Bienvenue au Paradis du Restaurant</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="search-container">
        
          <v-text-field class="recherche"
            v-model="nomRestauRecherche"
            label="Recherche"
            clearable
            @input="chercherRestaurant()"
            type="text"
          ></v-text-field>
    
        <v-icon class="search-button">mdi-magnify</v-icon>
      </v-btn>


      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="220"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
  </v-card>
  <!-- Fin bannière -->

<!-- Début ajout restaurant -->
<div class="ajoutRestau">
    <form v-on:submit.prevent="ajouterRestaurant(event)">
      <label class="espaceAjoutResto">
        Nom :
        <v-text-field
          class="ajoutRestoTextField"
          v-model="nom"
          label="Saisir le nom du restaurant"
          outlined
          clearable
        ></v-text-field>
      </label>
      <label class="espaceAjoutResto">
        Cuisine :
        <v-text-field
          class="ajoutRestoTextField"
          v-model="cuisine"
          label="Saisir la cuisine"
          outlined
          clearable
        ></v-text-field>
      </label>

      <md-button class="md-raised"> Ajouter </md-button>
    </form>
    </div>
    <!-- Fin ajout restaurant -->

    <h1>Nombre de restaurants : {{ nbRestaurantsTotal }}</h1>
    
    <!-- En commentaire car la recherche du haut de page marche (apparement)<p>
      Chercher par nom :
      <input
        @input="chercherRestaurant()"
        type="text"
        v-model="nomRestauRecherche"
      />
    </p> -->
    <p>Nombre total de pages : {{ nbPagesTotal }}</p>
    <!-- Slider -->
    <p>
      Nombre de restaurants par page:
      <input
        @change="getRestaurantsFromServer()"
        type="range"
        min="2"
        max="1000"
        v-model="pageSize"
      />{{ pageSize }}
    </p>
    <md-button
      class="md-raised"
      :disabled="page === 0"
      v-on:click="pagePrecedente()"
    >
      Précédent</md-button
    >&nbsp;&nbsp;
    <md-button
      class="md-raised"
      :disabled="page === nbPagesTotal"
      v-on:click="pageSuivante()"
    >
      Suivant
    </md-button>
    &nbsp; Page courante : {{ page }}
    <br />
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Cuisine</md-table-head>
      </md-table-row>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell md-label="Ville" md-sort-by="borough">{{
          item.borough
        }}</md-table-cell>
        <md-table-cell md-label="Action">
          <router-link :to="'/restaurant/' + item._id"

            ><md-button class="md-raised">
              Détail d'un restaurant</md-button
            ></router-link
          >
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "ListeDesRestaurants",

  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pageSize: 10,
      nbPagesTotal: 0,
      nomRestauRecherche: "",

      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;
      url += "&name=" + this.nomRestauRecherche;
      console.log(url);
      fetch(url)
        .then((responseJSON) => {
          //arrow function
          // la réponse est en JSON, on la convertit avec la ligne suivante
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pageSize
            );
            console.log(this.restaurants);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;
      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraîchit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      //event.preventDefault();

      /* this.restaurants.push(
                {
                    name: this.nom,
                    cuisine: this.cuisine
                }
            ); */
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré l'évènement
      let form = event.target;

      //Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraîchit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.nom = "";
      this.cuisine = "";
    },
    chercherRestaurant: _.debounce(function () {
      // Appelée que si on n'a pas tapé de touches pendant un certain délai
      this.getRestaurantsFromServer();
    }, 300),

    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  background-color: yellow;
}

.title{
  font-size: 2%;
}

.recherche{
  margin-left: -120px;
}

/* .search-container{
  margin-top: 2%;
} */

.search-button{
  margin-top: 0%;
}
.ajoutRestoTextField {
  display: inline-block;
}
.espaceAjoutResto {
  margin-right: 1%;
}

.ajoutRestau{margin-top: 2%; margin-left: 1%;}
</style>
