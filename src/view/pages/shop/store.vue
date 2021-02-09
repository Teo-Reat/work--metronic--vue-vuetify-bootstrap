<template>
  <div class="row">
    <div class="col-md-12">
      <v-card class="p-8">
        <router-link
            :to="{ name: 'store_create' }"
            class="card-link"
        >
          Create
        </router-link>
        <router-link
            :to="{ name: 'store_test' }"
            class="card-link"
        >
          Test
        </router-link>
        <b-card
          v-for="shop in storeList"
          :key="shop._id"
          :title="shop.name.en"
          :sub-title="shop.name.heb"
          no-body
          class="overflow-hidden my-8"
        >
          <b-row no-gutters>
            <b-col md="4">
              <b-card-body :title="shop.name.en + ' | ' + shop.name.heb">
                <b-card-text>
                  {{ shop.address.en }} | {{ shop.address.heb }}
                </b-card-text>
                <router-link
                  :to="{
                    name: 'shop_detail',
                    params: { id: shop._id, shop: shop }
                  }"
                  class="card-link"
                >
                  Detail
                </router-link>
              </b-card-body>
            </b-col>
            <b-col md="8" style="display: flex; justify-content: flex-end">
              <b-card-img
                v-if="shop.pic[0]"
                :src="
                  'https://backend.hashve.co.il/assets/store/' + shop.pic[0]
                "
                class="rounded-0"
                style="max-height: 180px; width: 30%; object-fit: cover"
              ></b-card-img>
              <b-card-img
                v-if="shop.pic[1]"
                :src="
                  'https://backend.hashve.co.il/assets/store/' + shop.pic[1]
                "
                class="rounded-0"
                style="max-height: 180px; width: 30%; object-fit: cover"
              ></b-card-img>
              <b-card-img
                v-if="shop.pic[2]"
                :src="
                  'https://backend.hashve.co.il/assets/store/' + shop.pic[2]
                "
                class="rounded-0"
                style="max-height: 180px; width: 30%; object-fit: cover"
              ></b-card-img>
            </b-col>
          </b-row>
        </b-card>
      </v-card>
    </div>
  </div>
</template>

<script>
import { GET_STORE_LIST } from "@/core/services/store/store.module";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "shop",

  data: () => {
    return {
      storeList: []
    };
  },

  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "" },
      { title: "Shops" }
    ]);
    this.$store
      .dispatch(GET_STORE_LIST)
      .then(data => (this.storeList = data));
  }
};
</script>

<style scoped></style>
