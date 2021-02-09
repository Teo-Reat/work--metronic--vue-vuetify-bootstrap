<template src="./customer-create.html"></template>
<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-2.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
import {
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER
} from "@/core/services/store/customer.module";

import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
import { bus } from "@/main";
import { Customer } from "@/core/models/Customer.model";

export default {
  mixins: [validationMixin],
  name: "CreateCustomer",
  props: {
    customer: Customer
  },
  data() {
    return {
      form: {
        fullName: this.customer?.fullName,
        email: this.customer?.email,
        phone: this.customer?.phone,
        source: this.customer?.sourceUrl,
        sourceUrl: this.customer?.sourceUrl,
        _id: this.customer?._id
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      source: {
        required
      },
      fullName: {
        required
      },
      sourceUrl: {
        required
      }
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Customer", route: "/" },
      { title: "Edit" }
    ]);

    // Initialize form wizard
    const wizard = new KTWizard("kt_wizard_v2", {
      startStep: 1, // initial active step number
      clickableSteps: true // allow step clicking
    });

    // // Validation before going to next page
    // wizard.on("beforeNext", function(/*wizardObj*/) {
    //   // validate the form and use below function to stop the wizard's step
    //   // wizardObj.stop();
    // });

    // Change event
    wizard.on("change", function(/*wizardObj*/) {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });

    bus.$on("openFormEditCustomer", customer => {
      this.form = {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        source: customer.source,
        sourceUrl: customer.sourceUrl,
        _id: customer._id
      };
    });
    this.form.fullName = this.customer.fullName;
    this.form.email = this.customer.email;
    this.form.phone = this.customer.phone;
    this.form.source = this.customer.source;
    this.form.sourceUrl = this.customer.sourceUrl;
    this.form._id = this.customer._id;
  },
  methods: {
    submit: function(e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      });
    },

    // form user methods
    validateState(name) {
      console.log(name);
    },

    // submit form user account infos
    onSubmit() {
      let actionType = CREATE_CUSTOMER;
      if (this.form._id) {
        actionType = UPDATE_CUSTOMER;
      }
      this.$store
        .dispatch(actionType, this.form)
        .then(data => {
          data;

          Swal.fire({
            title: "",
            text: "Customer created ",
            icon: "success",
            confirmButtonClass: "btn btn-secondary"
          });
          bus.$emit("customerCreated", {});
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
    }
    // -- end submit form user account --
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
