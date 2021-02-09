<template src="./user-create.html"></template>
<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-2.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
import { CREATE_USER } from "@/core/services/store/user.module";

import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
import { bus } from "@/main";

export default {
  mixins: [validationMixin],
  name: "CreateUser",
  data() {
    return {
      form: {
        fullName: this.user?.fullName,
        email: this.user?.email,
        mobile: this.user?.mobile,
        birthday: this.user?.birthday,
        active: this.user?.active,
        id: this.user?._id,
        password: "",
        rePassword: ""
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      mobile: {
        required
      },
      active: {
        required
      },
      birthday: {
        required
      }
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Users", route: "/" },
      { title: "Account" }
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
      //   const { $error } = this.$v.form[name];
      //   return $error ? $error : null;
    },

    // submit form user account infos
    onSubmit() {
      this.$store
        .dispatch(CREATE_USER, this.form)
        // bind user to model
        .then(data => {
          data;
          // init accountForm
          Swal.fire({
            title: "",
            text: "User created ",
            icon: "success",
            confirmButtonClass: "btn btn-secondary"
          });
          bus.$emit("userCreated", {});
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
