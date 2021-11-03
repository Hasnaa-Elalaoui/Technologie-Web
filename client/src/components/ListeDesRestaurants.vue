<template>
<!-- Début bannière -->
  <div>
    <div>
      <div class="d-flex justify-center ma-3">
        <v-card class="d-flex flex-column" outlined width="90%">
          <div class="text-overline ma-5">
            FILTRES
          </div>
          <div>
            <div class="ml-5" style="width: 60%">
              <p class="mb-3">Recherche par nom :</p>
              <div >
                <v-text-field @input="chercherRestaurant()" v-model="nomRestauRecherche" outlined clearable/>
              </div>
            </div>
            <!-- Slider -->
            <p class="ml-5">
              Nombre de restaurants par page:
              <input @change="getRestaurantsFromServer()" type="range" min="2" max="1000"
                v-model="pageSize" />{{ pageSize }}
            </p>
            
            <v-dialog v-model="dialog" width="450">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="ma-4" color="primary" dark v-bind="attrs" v-on="on">
                      Ajouter un restaurant
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Ajouter un restaurant
                    </v-card-title>

                    <v-card-text class="mt-3">
                      Veuillez renseigner les champs nécessaires à la création d'un restaurant
                    </v-card-text>
                    <div class="d-flex flex-column ma-4 justify-center align-items-center">
                      <label>
                        <p class="mb-3">Nom :</p>
                        <v-text-field v-model="nom" label="Saisir le nom du restaurant" outlined clearable>
                        </v-text-field>
                      </label>
                      <label>
                        <p class="mb-3">Cuisine :</p>
                        <v-text-field v-model="cuisine" label="Saisir la cuisine" outlined clearable>
                        </v-text-field>
                      </label>
                    </div>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red lighten-2" text @click="dialog = false">
                        Annuler
                      </v-btn>

                      <v-btn color="primary" text @click="dialog = false"
                        v-on:submit.prevent="ajouterRestaurant(event)">
                        Ajouter
                      </v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>
                
          </div>
          <div class="d-flex justify-end mr-5">
            <div class="d-flex flex-column">
              <v-card-subtitle style="text-align: right;">Nombre de restaurants : {{ nbRestaurantsTotal }}
              </v-card-subtitle>
              <v-card-subtitle style="text-align: right;">Nombre total de pages : {{ nbPagesTotal }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </div>

      <div class="d-flex flex-column justify-self-center mt-8" width="90%">
        <v-card class="d-flex flex-row justify-center align-items-center" flat>

          <md-button class="md-primary md-dense" :disabled="page === 0" v-on:click="pagePrecedente()">
            <md-icon>west</md-icon>
          </md-button>
          <div class="align-self-center">Page courante : {{ page }}</div>
          <md-button class="md-primary md-dense" :disabled="page === nbPagesTotal" v-on:click="pageSuivante()">
            <md-icon>east</md-icon>
          </md-button>
        </v-card>

        <v-card class="mx-auto" outlined width="90%">
          <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">

            <md-table-row>
              <md-table-head>Nom</md-table-head>
              <md-table-head>Cuisine</md-table-head>
              <md-table-head>Ville</md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}</md-table-cell>
              <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{item.cuisine}}</md-table-cell>
              <md-table-cell md-label="Ville" md-sort-by="borough">{{item.borough}}</md-table-cell>
              <md-table-cell md-label="Action">
                <router-link :to="{ path: 'RestaurantDetail', query: { id: item._id }}">
                  <md-button class="md-raised">
                    Détail d'un restaurant
                  </md-button>
                </router-link>
              </md-table-cell>
            </md-table-row>

            <md-table-empty-state md-label="Aucun résultat trouvé"
              :md-description="`Ce nom '${nomRestauRecherche}' ne correspond à aucun résultat. Essayez un autre nom ou créez le restaurant associé.`">
              <div class="d-flex justify-self-center">

                <v-dialog v-model="dialog" width="450">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="nom = nomRestauRecherche">
                      Ajouter un restaurant
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Ajouter un restaurant
                    </v-card-title>

                    <v-card-text class="mt-3">
                      Veuillez renseigner les champs nécessaires à la création d'un restaurant
                    </v-card-text>
                    <div class="d-flex flex-column ma-4 justify-center align-items-center">
                      <label>
                        <p class="mb-3">Nom :</p>
                        <v-text-field v-model="nom" label="Saisir le nom du restaurant" outlined clearable>
                        </v-text-field>
                      </label>
                      <label>
                        <p class="mb-3">Cuisine :</p>
                        <v-text-field v-model="cuisine" label="Saisir la cuisine" outlined clearable>
                        </v-text-field>
                      </label>
                      <label>
                        <p class="mb-3">Ville :</p>
                        <v-text-field v-model="ville" label="Saisir la ville" outlined clearable>
                        </v-text-field>
                      </label>
                    </div>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red lighten-2" text @click="dialog = false">
                        Annuler
                      </v-btn>

                      <v-btn color="primary" text @click="dialog = false"
                        v-on:submit.prevent="ajouterRestaurant(event)">
                        Ajouter
                      </v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </md-table-empty-state>
          </md-table>
        </v-card>
      </div>
    </div>
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
        ville:"",
        nbRestaurantsTotal: 0,
        page: 0,
        pageSize: 10,
        nbPagesTotal: 0,
        nomRestauRecherche: "",
        drawer: false,
        dialog: false,
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
        if(this.nomRestauRecherche != null) url += "&name=" + this.nomRestauRecherche;
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
      getDetailRestaurant(r) {
        let url = "http://localhost:8080/api/RestaurantDetail?id=" + r._id;
        fetch(url, {
            method: "GET",
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

  .title {
    font-size: 2%;
  }

  .recherche {
    margin-left: -120px;
  }

  /* .search-container{
  margin-top: 2%;
} */

  .search-button {
    margin-top: 0%;
  }

  .ajoutResto {
    display: inline-block;
  }

  .espaceAjoutResto {
    margin-right: 1%;
  }

  .ajouterRestau{
    flex:20%;
    overflow: hidden;
  }
</style>
