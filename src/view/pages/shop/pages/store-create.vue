<template>
  <v-card>
    <!--    Form for shop create-->
    <storeForm @submit="onSubmit" :value="form"></storeForm>

  </v-card>
</template>

<script>
import {CREATE_STORE} from "@/core/services/store/store.module";
import Swal from "sweetalert2";
import storeForm from '@/view/pages/shop/components/store-form'

export default {
  name: "shop-create",

  components: {
    storeForm,
  },

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
        description: '',
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
          active: true
        },
        payments: [],
        delivery: [],
        deliveryTypes: [],
        city: '',
        tel: '',
        mail: '',
        mobile: '',
        fax: '',
        active: false,
        adminActive: false,
        adminMessage: null,
        message: null
      }
    }
  },

  methods: {
    submit: function (e) {
      e.preventDefault();
      Swal.fire({
        title: '',
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      });
    },
    onSubmit(form) {
      this.$store
          .dispatch(CREATE_STORE, form)
          .then(data => {
            data;
            Swal.fire({
              title: '',
              text: "The application has been successfully submitted!",
              icon: "success",
              confirmButtonClass: "btn btn-secondary"
            });
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              title: '',
              text: error.message,
              icon: "warning",
              confirmButtonClass: "btn btn-danger"
            });
          });
    },
  }
};
</script>
