/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template src="./user.html"></template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import CreateUser from "@/view/pages/user/user-create/user-create.vue";
import KTCodePreview from "@/view/content/CodePreview.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { GET_USER_LIST } from "@/core/services/store/user.module";
import { bus } from "@/main";

export default {
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
      },
      code4: {
        search: "",
        headers: [
          {
            text: "Name",
            align: "left",
            sortable: false,
            value: "name"
          },
          { text: "Email", value: "email" },
          { text: "Phone", value: "phone" },
          { text: "Country", value: "country" }
        ],
        desserts: []
      }
    };
  },
  components: {
    KTCodePreview,
    CreateUser
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "" },
      { title: "User" }
    ]);
    this.$store
      .dispatch(GET_USER_LIST)
      // bind user to model
      .then(data =>
        data.map(user => {
          this.code4.desserts.push({
            name: user.fullName,
            email: user.email,
            phone: user.mobile,
            country: user.country,
            _id: user._id
          });
        })
      );
    bus.$on("userCreated", dat => {
      this.code4.desserts = [];
      dat;
      this.$store
        .dispatch(GET_USER_LIST)
        // bind user to model
        .then(data => {
          this.code4.desserts = [];
          data.map(user => {
            this.code4.desserts.push({
              name: user.fullName,
              email: user.email,
              phone: user.mobile,
              country: user.country,
              _id: user._id
            });
            this.hideModal();
          });
        });
    });
  },
  methods: {
    userDetail: function(row) {
      this.$router.push({ name: "user_profile", params: { id: row._id } });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    }
  }
};
</script>
