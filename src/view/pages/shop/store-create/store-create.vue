<template>
  <v-card>
    <!--    Modal window-->
    <div>
      <b-modal ref="some-modal" hide-footer title="Warning!">
        <div class="d-block text-center">
          <h3 v-if="!deliveryPrice">You must add price</h3>
          <h3 v-else>You must select another city</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Ok, I understood</b-button>
      </b-modal>
    </div>
    <v-form @submit.stop.prevent="onSubmit">
      <v-toolbar color="" dark flat>
        <template v-slot:extension>
          <v-tabs v-model="currentItem" fixed-tabs slider-color="white">
            <v-tab v-for="item in items" :key="item" :href="'#tab-' + item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <!--      Tabs-->
      <v-tabs-items v-model="currentItem">
        <v-tab-item v-for="item in items" :key="item" :value="'tab-' + item">
          <!--          First form-->
          <v-card v-if="currentItem === 'tab-Base form'" flat>
            <v-container class="px-12 py-16">
              <h2>Base form</h2>
              <v-row>
                <!--                Name English field-->
                <v-col cols="12" sm="6" lg="4">
                  <v-text-field
                      label="Name English"
                      single-line
                      v-model="form.name.en"
                  ></v-text-field>
                </v-col>

                <!--                Addres English field-->
                <v-col cols="12" sm="6" lg="8">
                  <v-text-field
                      label="Address English"
                      single-line
                      v-model="form.address.en"
                  ></v-text-field>
                </v-col>

                <!--                Name Hebrew field-->
                <v-col cols="12" sm="6" lg="4">
                  <v-text-field
                      label="Name Hebrew"
                      single-line
                      v-model="form.name.heb"
                  ></v-text-field>
                </v-col>

                <!--                Addres Hebrew field-->
                <v-col cols="12" sm="6" lg="8">
                  <v-text-field
                      label="Address Hebrew"
                      single-line
                      v-model="form.address.heb"
                  ></v-text-field>
                </v-col>

                <!--                Description textarea field-->
                <v-textarea
                    name="input-7-1"
                    filled
                    label="Description. A few words about store"
                    auto-grow
                    v-model="form.description"
                ></v-textarea>

                <!--                  Worktime select-->
                <div class="row">
                  <v-col class="d-flex" cols="12" sm="4">
                    <b-card no-body class="overflow-hidden p-4">
                      <b-row>
                        <h4 class="col-9">Week hours</h4>
                        <v-checkbox
                            v-model="form.weekHours.active"
                            label="active"
                            class="col-3 mt-0"
                        ></v-checkbox>
                        <h6 class="col-12">Open</h6>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="hours"
                              label="hours"
                              dense
                              v-model="form.weekHours.open.hour"
                          ></v-select>
                        </b-col>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="minutes"
                              label="minutes"
                              dense
                              v-model="form.weekHours.open.minute"
                          ></v-select>
                        </b-col>
                        <h6 class="col-12">Close</h6>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="hours"
                              label="hours"
                              dense
                              v-model="form.weekHours.close.hour"
                          ></v-select>
                        </b-col>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="minutes"
                              label="minutes"
                              dense
                              v-model="form.weekHours.close.minute"
                          ></v-select>
                        </b-col>
                      </b-row>
                    </b-card>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="4">
                    <b-card no-body class="overflow-hidden p-4">
                      <b-row>
                        <h4 class="col-9">Weekend hours</h4>
                        <v-checkbox
                            v-model="form.weekEndHours.active"
                            label="active"
                            class="col-3 mt-0"
                        ></v-checkbox>
                        <h6 class="col-12">Open</h6>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="hours"
                              label="hours"
                              dense
                              v-model="form.weekEndHours.open.hour"
                          ></v-select>
                        </b-col>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="minutes"
                              label="minutes"
                              dense
                              v-model="form.weekEndHours.open.minute"
                          ></v-select>
                        </b-col>
                        <h6 class="col-12">Close</h6>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="hours"
                              label="hours"
                              dense
                              v-model="form.weekEndHours.close.hour"
                          ></v-select>
                        </b-col>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="minutes"
                              label="minutes"
                              dense
                              v-model="form.weekEndHours.close.minute"
                          ></v-select>
                        </b-col>
                      </b-row>
                    </b-card>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="4">
                    <b-card no-body class="overflow-hidden p-4">
                      <b-row>
                        <h4 class="col-9">Shabat hours</h4>
                        <v-checkbox
                            v-model="form.shabatHours.active"
                            label="active"
                            class="col-3 mt-0"
                        ></v-checkbox>
                        <h6 class="col-12">Open</h6>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="hours"
                              label="hours"
                              dense
                              v-model="form.shabatHours.open.hour"
                          ></v-select>
                        </b-col>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="minutes"
                              label="minutes"
                              dense
                              v-model="form.shabatHours.open.minute"
                          ></v-select>
                        </b-col>
                        <h6 class="col-12">Close</h6>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="hours"
                              label="hours"
                              dense
                              v-model="form.shabatHours.close.hour"
                          ></v-select>
                        </b-col>
                        <b-col class="d-flex" cols="6">
                          <v-select
                              :items="minutes"
                              label="minutes"
                              dense
                              v-model="form.shabatHours.close.minute"
                          ></v-select>
                        </b-col>
                      </b-row>
                    </b-card>
                  </v-col>
                </div>

                <!--                  Payment type and delivery type field-->
                <div class="row justify-content-between p-4 pl-0">
                  <v-col cols="12" sm="6" lg="3">
                    <v-select
                        v-model="form.payments"
                        :items="payment"
                        item-text="name"
                        item-value="id"
                        :menu-props="{ maxHeight: '400' }"
                        label="Payment type"
                        multiple
                        hint="Select available payment methods."
                        persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" lg="3">
                    <v-select
                        v-model="form.deliveryTypes"
                        :items="delivery"
                        item-text="name"
                        item-value="id"
                        :menu-props="{ maxHeight: '400' }"
                        label="Delivery type"
                        multiple
                        hint="Select available delivery methods."
                        persistent-hint
                    ></v-select>
                  </v-col>

                  <!--                    Location-->
                  <div class="row col-12 col-lg-4">
                    <v-card>
                      <h4 class="col-12">Shop location</h4>
                      <v-row class="px-4">
                        <v-col cols="6">
                          <v-text-field
                              label="Latitude"
                              single-line
                              v-model="form.storeLocation.lat"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                              label="Longitude"
                              single-line
                              v-model="form.storeLocation.lng"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card>
                  </div>
                </div>

                <!--                  Contact information field-->
                <v-card class="p-4 my-8">
                  <div class="row">
                    <h4 class="col-12">Contact information</h4>
                    <v-col cols="12" sm="6" lg="3">
                      <v-text-field label="Phone" single-line></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="3">
                      <v-text-field label="Mobile" single-line></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="3">
                      <v-text-field label="Email" single-line></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="3">
                      <v-text-field label="Fax" single-line></v-text-field>
                    </v-col>
                  </div>
                </v-card>

                <!--                  Admin information field-->
                <v-col cols="12">
                  <v-checkbox
                      v-model="form.active"
                      label="active"
                      class="col-6 mt-0"
                  ></v-checkbox>
                  <v-checkbox
                      v-model="form.adminActive"
                      label="admin active"
                      class="col-6 mt-0"
                  ></v-checkbox>
                </v-col>
                <v-row>
                  <v-col col="12" sm="6">
                    <v-textarea
                        name="message"
                        filled
                        label="Message"
                        auto-grow
                        v-model="form.message"
                    ></v-textarea>
                  </v-col>
                  <v-col col="12" sm="6">
                    <v-textarea
                        name="message-admin"
                        filled
                        label="Admin message"
                        auto-grow
                        v-model="form.adminMessage"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
          </v-card>

          <!--          Second form-->
          <v-card v-if="currentItem === 'tab-Delivery'" flat>
            <v-container class="px-12 py-16">
              <h2 class="pb-2">Delivery</h2>
              <div class="row">
                <v-card class="col-12 col-lg-4">
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
                    <v-text-field label="Price" single-line v-model="deliveryPrice"></v-text-field>
                  </v-col>
                  <div class="my-2 px-2">
                    <v-btn large color="primary" class="w-100" @click.prevent="addDelivery(city)"
                    >Add delivery
                    </v-btn
                    >
                  </div>
                </v-card>
                <v-container class="col-12 col-lg-8">
                  <v-row>
                    <div v-for="(city, key) in form.delivery" :key="key" class="col-6 col-lg-2">
                      <v-card class="p-2 h-100">
                        <div class="font-weight-bold font-size-lg">{{ getCityName(city.city)[0] }}</div>
                        <div>{{ getCityName(city.city)[1] }}</div>
                        <div>Price: {{ city.price }}</div>
                        <b-button class="mt-3" variant="outline-danger" block @click="deleteDelivery(key)">Delete
                        </b-button>
                      </v-card>
                    </div>
                  </v-row>
                </v-container>

              </div>
            </v-container>
          </v-card>

          <!--          Third form-->
          <v-card v-if="currentItem === 'tab-Form++'" flat>
            <v-container class="px-12 py-16">
              <h2>Form++</h2>
            </v-container>
          </v-card>

          <!--          Fourth form-->
          <v-card v-if="currentItem === 'tab-Form+++'" flat>
            <v-container class="px-12 py-16">
              <h2>Form+++</h2>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <div class="container">
        <div class="mb-2 px-8">
          <v-btn
              large
              color="primary"
              class="ml-auto d-block"
              v-on:click="onSubmit"
          >
            Accept
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import {
  CREATE_STORE,
  GET_CITY_LIST
} from "@/core/services/store/store.module";
import Swal from "sweetalert2";
import {bus} from "@/main";

export default {
  name: "shop-create",

  data() {
    return {
      form: {
        name: {
          en: "Life is a scurvy gibbet.",
          heb: "Mainlands rise with madness at the dark la marsa beach!"
        },
        address: {
          en: "Aye, pestilence!",
          heb: "Punishment ho! burn to be raided."
        },
        description:
            "Lubbers are the scallywags of the scurvy faith.The plank screams urchin like a weird jack.Ho-ho-ho! power of malaria.Malaria, booty, and punishment.Suns stutter from pestilences like wet sons.",
        storeLocation: {
          lat: "11.111",
          lng: "22.222"
        },
        weekHours: {
          open: {
            hour: "",
            minute: ""
          },
          close: {
            hour: "",
            minute: ""
          },
          active: false
        },
        weekEndHours: {
          open: {
            hour: "",
            minute: ""
          },
          close: {
            hour: "",
            minute: ""
          },
          active: false
        },
        shabatHours: {
          open: {
            hour: "",
            minute: ""
          },
          close: {
            hour: "",
            minute: ""
          },
          active: true
        },
        payments: [],
        delivery: [],
        deliveryTypes: [],
        city: "",
        tel: "+79999999999",
        mail: "r@me.re",
        mobile: "+79999999999",
        fax: "",
        active: false,
        adminActive: false,
        adminMessage: null,
        message: null
      },
      payment: [
        {
          id: '0',
          name: 'phone'
        },
        {
          id: '1',
          name: 'credit card'
        },
        {
          id: '2',
          name: 'error'
        }
      ],
      delivery: [
        {
          id: '0',
          name: 'delivery'
        },
        {
          id: '1',
          name: 'pickup'
        },
        {
          id: '2',
          name: 'fast delivery'
        }
      ],
      currentItem: "tab-Base form",
      items: ["Base form", "Delivery", "Form++", "Form+++"],
      city: '',
      cities: [],
      deliveryPrice: '',
      hours: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      minutes: [
        0,
        5,
        10,
        15,
        20,
        25,
        30,
        35,
        40,
        45,
        50,
        55
      ],
      checkModal: false
    };
  },

  mounted() {
    this.getCity();
  },

  computed: {},
  methods: {
    addItem(item) {
      const removed = this.items.splice(0, 1);
      this.items.push(...removed);
      this.$nextTick(() => {
        this.currentItem = "tab-" + item;
      });
    },
    submit: function (e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      });
    },
    onSubmit() {
      this.$store
          .dispatch(CREATE_STORE, this.form)
          .then(data => {
            data;
            Swal.fire({
              title: "",
              text: "The application has been successfully submitted!",
              icon: "success",
              confirmButtonClass: "btn btn-secondary"
            });
            bus.$emit("storeCreated", {});
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              title: "",
              text: error.message,
              icon: "warning",
              confirmButtonClass: "btn btn-danger"
            });
          });
    },
    getCity() {
      this.$store.dispatch(GET_CITY_LIST).then(data => {
        if (data) {
          this.cities = data
              .map(item => {
                return {
                  _id: item._id,
                  name: `${item.name.heb} | ${item.name.en}`
                };
              })
              .sort((item1, item2) => {
                return item1.name > item2.name ? 1 : 0;
              });
        }
      });
    },
    addDelivery(val) {
      let delivery = {
        city: val._id,
        price: this.deliveryPrice
      }
      if (this.checkDuplicate(delivery)) this.showModal()
      if (!this.deliveryPrice) this.showModal()
      if (!this.checkDuplicate(delivery) && this.deliveryPrice) {
        this.form.delivery.push(delivery)
        this.city = ''
        this.deliveryPrice = ''
      }
    },
    checkDuplicate(delivery) {
      return this.form.delivery.find(city => city.city === delivery.city)
    },
    deleteDelivery(val) {
      this.form.delivery.splice(val, 1);
    },
    showModal() {
      this.$refs['some-modal'].show()
    },
    hideModal() {
      this.$refs['some-modal'].hide()
    },
    getCityName(id) {
      return (this.cities.find(city => city._id === id).name).split(' | ');
    }
  }
};
</script>
