<template>
    <div v-if="restaurant">
        <div class="ma-3">
            <router-link :to="'/restaurants/'">
                <v-btn class="mx-2" fab dark small color="primary">
                    <v-icon dark>mdi-home</v-icon>
                </v-btn>
            </router-link>
        </div>
        <div class="card-container">
            <v-card :loading="loading" width="50%" height="100%" outlined flat>

                <v-img height="250" src="https://source.unsplash.com/collection/190727" max-height="20%"></v-img>

                <v-card-title>{{restaurant.name}}</v-card-title>

                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <v-rating :value=getRandomInt(max) color="amber" dense half-increments readonly size="14">
                        </v-rating>

                        <div class="grey--text ms-4">
                            {{this.note}} (413)
                        </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                        {{restaurant.cuisine}}
                    </div>

                    <div>
                        La meilleure spécialité {{restaurant.cuisine}} de {{restaurant.borough}}
                    </div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-title>Horaires de réservation disponibles</v-card-title>

                <v-card-text>
                    <v-chip-group v-model="selection" active-class="primary accent-4 white--text" column>
                        <v-chip>18:30</v-chip>
                        <v-chip>19:30</v-chip>
                        <v-chip>20:00</v-chip>
                        <v-chip>21:00</v-chip>
                    </v-chip-group>
                </v-card-text>

                <v-card-actions>
                    <v-dialog v-model="dialog" persistent max-width="800px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                Réserver
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Réservation</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>

                                        <v-col cols="12" sm="5" md="6">
                                            <v-text-field label="Nom*" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="Prénom*" persistent-hint required>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field label="Email"></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field label="Téléphone*" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" sm="6">
                                            <v-select :items="['1', '2', '3', '4', '5', '6', '7', '8']"
                                                label="Nombre de personnes*" required>
                                            </v-select>
                                        </v-col>

                                    </v-row>
                                </v-container>
                                <small>*champs obligatoires</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="dialog = false">
                                    Annuler
                                </v-btn>

                                <div class="text-center">
                                    <v-dialog v-model="dialog2" width="500">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="blue darken-1" text @click="dialog = false; dialog2 = true"
                                                v-bind="attrs" v-on="on">
                                                Réserver
                                            </v-btn>
                                        </template>

                                        <v-card>
                                            <v-card-title class="text-h5 grey lighten-2">
                                                Confirmation de la réservaction
                                            </v-card-title>

                                            <v-card-text>
                                                Votre réservation a été enregistrée. Vous recevrez un SMS de
                                                confirmation sur le
                                                numéro renseigné dans les prochaines minutes.
                                            </v-card-text>

                                            <v-divider></v-divider>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="primary" text @click="dialog2 = false">
                                                    Fermer
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </div>

                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card-actions>
            </v-card>
            <div class="my-map"><Map /></div>
        </div>
    </div>

</template>

<script>
    import Map from './Map.vue'
    export default {
        name: 'Restaurant',
        props: {},
        components: {
            Map
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        data: function () {
            return {
                restaurant: null,
                drawer: false,
                loading: false,
                selection: 1,
                dialog: false,
                max: 5,
                note: 1,
                dialog2: false,
            }
        },
        methods: {
            reserve() {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
            getRandomInt(max) {
                this.note = Math.floor(Math.random() * max);
                if (this.note == 0) this.note++;
                return this.note;
            },
        },
        mounted() {
            console.log("ID = " + this.id);
            let url = "http://localhost:8080/api/restaurants/" + this.id;
            fetch(url)
                .then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data.restaurant.name)
                    this.restaurant = data.restaurant;
                }).catch(err => {
                    console.log(err)
                    this.$router.push('/')
                })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .my-map {
        height: 600px;
        width: 436px;
    }

    .card-container {
        width: 100vw;
        min-width: 100vw;
        margin: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>