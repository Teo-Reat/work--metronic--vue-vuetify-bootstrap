<template>
  <v-card class="col-12 col-lg-6">
    <v-container>
      <h4>Delivery</h4>
      <v-col cols="12">
        <v-combobox
          :items="cities"
          v-model="city"
          :item-text="'name'"
          single-line
          return-object
          label="Select city"
        ></v-combobox>
      </v-col>
      <v-col cols="12">
        <v-text-field label="Price" single-line></v-text-field>
      </v-col>
      <div class="my-2 px-2">
        <v-btn large color="primary" class="w-100" @click="addDelivery(city)"
          >Add delivery</v-btn
        >
      </div>
      <hr />
      <div>{{ selectedCities }}</div>
    </v-container>
  </v-card>
</template>

<script>
import { GET_CITY_LIST } from "@/core/services/store/store.module";

export default {
  name: "store-test",
  data() {
    return {
      city: "",
      cities: [],
      selectedCities: []
    };
  },
  mounted() {
    this.getCity();
  },

  computed: {},

  methods: {
    getCity() {
      this.$store.dispatch(GET_CITY_LIST).then(data => {
        if (data) {
          this.cities = data
            .map(item => {
              return {
                _id: item._id,
                name: `${item.name.en} | ${item.name.heb}`
              };
            })
            .sort((item1, item2) => {
              return item1.name > item2.name ? 1 : 0;
            });
        }
      });
    },
    addDelivery(val) {
      this.selectedCities.push(val);
    },
    deleteDelivery(val) {
      this.selectedCities.splice(val, 1);
    }
  }
};
</script>

<style scoped></style>
