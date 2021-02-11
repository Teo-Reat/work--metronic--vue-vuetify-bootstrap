<template src="./user-profile.html"></template>
<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-2.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
import {
  GET_USER,
  UPDATE_USER_ACCOUNT_INFO,
  UPDATE_USER_CHANGE_PASSWORD,
  UPDATE_USER_CHANGE_STORES
} from "@/core/services/store/user.module";
import { GET_STORE_LIST } from "@/core/services/store/store.module";
import { User } from "@/core/models/User.model";
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Account",
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        mobile: "",
        birthday: new Date(),
        active: false,
        id: ""
      },
      form: {
        fullName: this.user?.fullName,
        email: this.user?.email,
        mobile: this.user?.mobile,
        birthday: this.user?.birthday,
        active: this.user?.active,
        id: this.user?._id
      },
      formPassword: {
        password: "",
        newPassword: "",
        email: this.user?.email
      },
      formStores: {
        stores: [],
        store: [],
        id: this.user?._id
      },
      stores: [],
      stores2: [],
      selectedStore: [],
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

    // Get user informations
    this.$store.dispatch(GET_USER, this.$route.params.id).then(data => {
      this.user = new User(data);
      this.initAccountForm();
      this.initPasswordForm();
      this.initStoresForm();
    });

    // Get list of stores
    this.$store.dispatch(GET_STORE_LIST).then(data => {
    this.stores = data;
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

    //init accountForm
    initAccountForm() {
      (this.form.fullName = this.user.fullName),
        (this.form.email = this.user.email),
        (this.form.mobile = this.user.mobile),
        (this.form.active = this.user.active),
        (this.form.birthday = this.$date(
          new Date(this.user.birthday),
          "yyyy-MM-dd"
        ));
      this.form.id = this.user._id;
      console.log(this.form);
      console.log(this.user);
    },
    // initialisation form password
    initPasswordForm() {
      (this.formPassword.password = ""),
        (this.formPassword.newPassword = ""),
        (this.formPassword.email = this.user.email);
    },
    initStoresForm() {
      this.formStores.stores = this.user.stores;

      this.formStores.stores;
    },

    // submit form user account infos
    onSubmit() {
      this.form.id = this.user._id;
      this.$store
        .dispatch(UPDATE_USER_ACCOUNT_INFO, this.form)
        // bind user to model
        .then(data => {
          this.user = new User(data);
          this.initAccountForm();
          // init accountForm
          Swal.fire({
            title: "",
            text: "User account details updated",
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
    // -- end submit form user account --

    // submit form stores
    onSubmitFormStores() {
      this.formStores.id = this.user._id;
     // this.formStores.stores = this.formStores.stores.map(store => store._id);
      this.$store
        .dispatch(UPDATE_USER_CHANGE_STORES, this.formStores)
        .then(data => {
          this.user = new User(data);
          this.initStoresForm();

          Swal.fire({
            title: "",
            text: "User  stores updated",
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
    // -- end submit form stores --

    // submit form change password
    onSubmitFormPassword() {
      this.$store
        .dispatch(UPDATE_USER_CHANGE_PASSWORD, this.formPassword)
        // bind user to model
        .then(data => {
          this.user = new User(data);
          this.initPasswordForm();

          // init accountForm
          Swal.fire({
            title: "",
            text: "User Password changed",
            icon: "success",
            confirmButtonClass: "btn btn-secondary"
          });
        })
        .catch(error => {
          //catch the error here
          console.log(error);
          Swal.fire({
            title: "Change Password error",
            text: error.message,
            icon: "warning",
            confirmButtonClass: "btn btn-danger"
          });
        });
    }
    // -- end submit form password --
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
