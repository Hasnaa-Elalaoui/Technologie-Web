<template>
  <div>
    <form v-on:submit.prevent="ajouterRestaurant(event)">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form>

    <h1>Nombre de restaurants : {{ nbRestaurantsTotal }}</h1>
    <p>
      Chercher par nom :
      <input
        @input="chercherRestaurant()"
        type="text"
        v-model="nomRestauRecherche"
      />
    </p>
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
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" >
      <md-table-row >
        <md-table-head>Nom</md-table-head>
        <md-table-head>Cuisine</md-table-head>
      </md-table-row>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
        <md-table-cell md-label="Action" >
            <router-link :to="'/restaurant/'+item._id">[Détail d'un restaurant]</router-link>
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
</style>
