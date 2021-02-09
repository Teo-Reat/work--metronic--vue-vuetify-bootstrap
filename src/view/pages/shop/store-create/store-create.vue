<template>
  <v-card>
    <v-form @submit.stop.prevent="onSubmit">
      <v-toolbar
          color="deep-purple accent-4"
          dark
          flat
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Page title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs
              v-model="currentItem"
              fixed-tabs
              slider-color="white"
          >
            <v-tab
                v-for="item in items"
                :key="item"
                :href="'#tab-' + item"
            >
              {{ item }}
            </v-tab>

          </v-tabs>
        </template>
      </v-toolbar>

      <!--      Tabs-->
      <v-tabs-items v-model="currentItem">
        <v-tab-item
            v-for="item in items"
            :key="item"
            :value="'tab-' + item"
        >

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
                <v-container fluid>
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
                          <v-checkbox v-model="form.weekHours.active"
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
                          <v-checkbox v-model="form.weekEndHours.active"
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
                          <v-checkbox v-model="form.shabatHours.active"
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

                  <!--                  Payment and delivery multiselect-->
                  <div class="row">
                    <v-col cols="12" sm="6">
                      <v-select
                          v-model="form.payments"
                          :items="payment"
                          :menu-props="{ maxHeight: '400' }"
                          label="Payment type"
                          multiple
                          hint="Select available payment methods."
                          persistent-hint
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                          v-model="form.deliveryTypes"
                          :items="delivery"
                          :menu-props="{ maxHeight: '400' }"
                          label="Delivery type"
                          multiple
                          hint="Select available delivery methods."
                          persistent-hint
                      ></v-select>
                    </v-col>
                  </div>

                  <!--                  Contact information field-->
                  <v-card class="p-4 my-8">
                    <div class="row">
                      <h4 class="col-12">Contact information</h4>
                      <v-col cols="12" sm="6" lg="3">
                        <v-text-field
                            label="Phone"
                            single-line
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" lg="3">
                        <v-text-field
                            label="Mobile"
                            single-line
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" lg="3">
                        <v-text-field
                            label="Email"
                            single-line
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" lg="3">
                        <v-text-field
                            label="Fax"
                            single-line
                        ></v-text-field>
                      </v-col>
                    </div>
                  </v-card>

                  <!--                  Admin information field-->
                  <div class="row">
                    <v-checkbox v-model="form.active"
                                label="active"
                                class="col-6 mt-0"
                    ></v-checkbox>
                    <v-checkbox v-model="form.adminActive"
                                label="admin active"
                                class="col-6 mt-0"
                    ></v-checkbox>
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
                  </div>
                </v-container>
              </v-row>
            </v-container>
          </v-card>

          <!--          Second form-->
          <v-card v-if="currentItem === 'tab-Form+'" flat>
            <v-container class="px-12 py-16">
              <h2>Form+</h2>
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
          <v-btn large color="primary" class="ml-auto d-block" v-on:click="onSubmit">
            Accept
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import {CREATE_STORE} from "@/core/services/store/store.module";
import Swal from "sweetalert2";
import {bus} from "@/main";

export default {
  name: "shop-create",

  data() {
    return {
      form: {
        name: {
          en: '',
          heb: ''
        },
        address: {
          en: '',
          heb: ''
        },
        description: null,
        storeLocation: {
          lat: '',
          lng: ''
        },
        weekHours: {
          open: {
            hour: '',
            minute: ''
          },
          close: {
            hour: '',
            minute: ''
          },
          active: false
        },
        weekEndHours: {
          open: {
            hour: '',
            minute: ''
          },
          close: {
            hour: '',
            minute: ''
          },
          active: false
        },
        shabatHours: {
          open: {
            hour: '',
            minute: ''
          },
          close: {
            hour: '',
            minute: ''
          },
          active: false
        },
        payments: [],
        deliveryTypes: [],
        tel: '',
        mail: '',
        mobile: '',
        fax: '',
        active: false,
        adminActive: false,
        adminMessage: null,
        message: null,


      },
      payment: ['phone', 'credit card', 'error'],
      delivery: ['delivery', 'pickup', 'fast delivery'],
      currentItem: 'tab-Base form',
      items: ['Base form', 'Form+', 'Form++', 'Form+++',],
      hours: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
      ],
      minutes: [
        '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55',
      ]
    }
  },

  computed: {},

  methods: {
    addItem(item) {
      const removed = this.items.splice(0, 1)
      this.items.push(...removed)
      this.$nextTick(() => {
        this.currentItem = 'tab-' + item
      })
    },
    submit: function (e) {
      e.preventDefault()
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      })
    },
    onSubmit() {
      this.$store
          .dispatch(CREATE_STORE, this.form)
          .then(data => {
            data
            Swal.fire({
              title: "",
              text: "The application has been successfully submitted!",
              icon: "success",
              confirmButtonClass: "btn btn-secondary"
            })
            bus.$emit("storeCreated", {})
          })
          .catch(error => {
            console.log(error)
            Swal.fire({
              title: "",
              text: error.message,
              icon: "warning",
              confirmButtonClass: "btn btn-danger"
            });
          })
    }
  },
}
</script>

<style scoped>

</style>
