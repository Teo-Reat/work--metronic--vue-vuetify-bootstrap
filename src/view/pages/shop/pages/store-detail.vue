<template>
  <v-card v-if="shop">
    <div class="row">
      <div class="col-md-6">
        <b-card :title="shop.name.en" :sub-title="shop.name.heb">
          <b-card-text v-if="shop.description">{{ shop.description }}</b-card-text>
          <v-row>
            <b-card-text class="col-12 col-sm-6">
              <b-list-group>
                <b-list-group-item>
                  Work time: {{
                    addZero(shop.weekHours.open.hour)
                  }}:{{ addZero(shop.weekHours.close.minute) }} - {{
                    addZero(shop.weekHours.close.hour)
                  }}:{{ addZero(shop.weekHours.close.minute) }}
                </b-list-group-item>
                <b-list-group-item>
                  Work weekend time: {{
                    addZero(shop.weekEndHours.open.hour)
                  }}:{{ addZero(shop.weekEndHours.close.minute) }} - {{
                    addZero(shop.weekEndHours.close.hour)
                  }}:{{ addZero(shop.weekEndHours.close.minute) }}
                </b-list-group-item>
                <b-list-group-item>
                  Shabat time: {{
                    addZero(shop.shabatHours.open.hour)
                  }}:{{ addZero(shop.shabatHours.close.minute) }} - {{
                    addZero(shop.shabatHours.close.hour)
                  }}:{{ addZero(shop.shabatHours.close.minute) }}
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
            <b-card-text class="col-12 col-sm-6">
              <b-list-group>
                <b-list-group-item>Phone: {{ shop.tel }}</b-list-group-item>
                <b-list-group-item>Email: {{ shop.mail }}</b-list-group-item>
                <b-list-group-item>Mobile: {{ shop.mobile }}</b-list-group-item>
                <b-list-group-item>Fax: {{ shop.fax }}</b-list-group-item>
              </b-list-group>
            </b-card-text>
          </v-row>
          <b-card-text>
            <v-btn
                to="/shops"
                depressed
                color="primary"
            >
              Back
            </v-btn>
            <v-btn
                :to="{ name: 'shop_edit', params: { id: shop._id} }"
                depressed
                color="primary"
                class="ml-2"
            >
              Edit
            </v-btn>
          </b-card-text>
        </b-card>
      </div>
      <div class="col-md-6">
        <b-carousel
            id="carousel-1"
            v-if="shop.pic"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
        >
          <b-carousel-slide
              v-for="(image, key) in shop.pic"
              :key="key"
              caption=""
              text=""
              :img-src="`https://backend.hashve.co.il/assets/store/${image}`"
              style="max-width: 100%; object-fit: cover; max-height: 400px"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </v-card>
</template>

<script>
import {GET_STORE_LIST} from "@/core/services/store/store.module";

export default {
  name: "store-detail",
  data() {
    return {
      shop: null,
      slide: 0,
      sliding: null
    };
  },
  mounted() {
    this.getShop();
  },

  computed: {},

  methods: {
    getShop() {
      if (this.$route.params.shop) {
        this.shop = this.$route.params.shop;
      } else {
        this.$store
            .dispatch(GET_STORE_LIST)
            .then(
                data =>
                    (this.shop = data.find(e => e._id === this.$route.params.id))
            );
      }
    },
    addZero(int) {
      if (int < 10) return int = '0' + int
      return '' + int
    }
  }
};
</script>
