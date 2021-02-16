<template>
  <v-card>
    <!--    Form for shop create-->
    <storeForm @submit="onSubmit" :value="form"></storeForm>

  </v-card>
</template>

<script>
import {GET_STORE, UPDATE_STORE_INFO} from "@/core/services/store/store.module";
import Swal from "sweetalert2";
import storeForm from '@/view/pages/shop/components/store-form'
import {Store} from "@/core/models/Store.model";

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

  mounted() {
    this.$store.dispatch(GET_STORE, this.$route.params.id)
        .then(data => (this.form = data));
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
    onSubmit() {
      this.form.id = this.form._id;
      this.$store
          .dispatch(UPDATE_STORE_INFO, this.form)
          // bind store to model
          .then(data => {
            this.store = new Store(data);
            // init accountForm
            Swal.fire({
              title: "",
              text: "Store details updated",
              icon: "success",
              confirmButtonClass: "btn btn-secondary"
            });
          })
          .catch(error => {
            //catch the error here
            console.log(error);
            Swal.fire({
              title: "",
              text: error.message,
              icon: "warning",
              confirmButtonClass: "btn btn-danger"
            });
          });
    },
  }
};
</script>
