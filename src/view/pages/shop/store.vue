<template>
  <v-card class="p-8">
    <v-btn
        :to="{ name: 'store_create' }"
        depressed
        color="primary"
    >
      Create
    </v-btn>
    <v-btn
        :to="{ name: 'store_test' }"
        depressed
        color="primary"
        class="ml-2"
    >
      Test
    </v-btn>
    <b-card
        v-for="shop in storeList"
        :key="shop._id"
        :title="shop.name ? shop.name.en : ' - '"
        :sub-title="shop.name ? shop.name.heb : ' - '"
        no-body
        class="overflow-hidden my-8"
    >
      <b-row no-gutters>
        <b-col md="4">
          <template v-if="shop.name">
            <b-card-body :title="shop.name.en + ' | ' + shop.name.heb">
              <b-card-text>
                {{ shop.address.en }} | {{ shop.address.heb }}
              </b-card-text>
              <v-btn
                  :to="{
                      name: 'shop_detail',
                      params: { id: shop._id, shop: shop }
                    }"
                  depressed
                  color="primary"
                  class="ml-2"
              >
                Detail
              </v-btn>
            </b-card-body>
          </template>
        </b-col>
        <b-col md="8" style="display: flex; justify-content: flex-end">
          <b-card-img
              v-if="shop.pic[0]"
              :src="`https://backend.hashve.co.il/assets/store/${shop.pic[0]}`"
              class="rounded-0"
              style="max-height: 180px; width: 30%; object-fit: cover"
          ></b-card-img>
          <b-card-img
              v-if="shop.pic[1]"
              :src="`https://backend.hashve.co.il/assets/store/${shop.pic[1]}`"
              class="rounded-0"
              style="max-height: 180px; width: 30%; object-fit: cover"
          ></b-card-img>
          <b-card-img
              v-if="shop.pic[2]"
              :src="`https://backend.hashve.co.il/assets/store/${shop.pic[2]}`"
              class="rounded-0"
              style="max-height: 180px; width: 30%; object-fit: cover"
          ></b-card-img>
        </b-col>
      </b-row>
    </b-card>
  </v-card>
</template>

<script>
import {GET_STORE_LIST} from "@/core/services/store/store.module";
import {SET_BREADCRUMB} from "@/core/services/store/breadcrumbs.module";

export default {
  name: "shop",

  data: () => {
    return {
      storeList: null
    };
  },

  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {title: "Dashboard", route: ""},
      {title: "Shops"}
    ]);
    this.$store.dispatch(GET_STORE_LIST).then(data => (this.storeList = data));
  },
};
</script>

<style scoped></style>
