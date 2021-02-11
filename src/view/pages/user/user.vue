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
        //         html: `<v-card>
        //   <v-card-title>
        //     List of user
        //     <v-spacer></v-spacer>
        //     <v-text-field
        //       v-model="search"
        //       append-icon="search"
        //       label="Search"
        //       single-line
        //       hide-details
        //     ></v-text-field>
        //   </v-card-title>
        //   <v-data-table
        //     :headers="headers"
        //     :items="desserts"
        //     :search="search"
        //   ></v-data-table>
        // </v-card>`,
        //         js: ` export default {
        //   data () {
        //     return {
        //       search: '',
        //       headers: [
        //         {
        //           text: 'Dessert (100g serving)',
        //           align: 'left',
        //           sortable: false,
        //           value: 'name',
        //         },
        //         { text: 'Calories', value: 'calories' },
        //         { text: 'Fat (g)', value: 'fat' },
        //         { text: 'Carbs (g)', value: 'carbs' },
        //         { text: 'Protein (g)', value: 'protein' },
        //         { text: 'Iron (%)', value: 'iron' },
        //       ],
        //       desserts: [
        //         {
        //           name: 'Frozen Yogurt',
        //           calories: 159,
        //           fat: 6.0,
        //           carbs: 24,
        //           protein: 4.0,
        //           iron: '1%',
        //         },
        //         {
        //           name: 'Ice cream sandwich',
        //           calories: 237,
        //           fat: 9.0,
        //           carbs: 37,
        //           protein: 4.3,
        //           iron: '1%',
        //         },
        //         {
        //           name: 'Eclair',
        //           calories: 262,
        //           fat: 16.0,
        //           carbs: 23,
        //           protein: 6.0,
        //           iron: '7%',
        //         },
        //         {
        //           name: 'Cupcake',
        //           calories: 305,
        //           fat: 3.7,
        //           carbs: 67,
        //           protein: 4.3,
        //           iron: '8%',
        //         },
        //         {
        //           name: 'Gingerbread',
        //           calories: 356,
        //           fat: 16.0,
        //           carbs: 49,
        //           protein: 3.9,
        //           iron: '16%',
        //         },
        //         {
        //           name: 'Jelly bean',
        //           calories: 375,
        //           fat: 0.0,
        //           carbs: 94,
        //           protein: 0.0,
        //           iron: '0%',
        //         },
        //         {
        //           name: 'Lollipop',
        //           calories: 392,
        //           fat: 0.2,
        //           carbs: 98,
        //           protein: 0,
        //           iron: '2%',
        //         },
        //         {
        //           name: 'Honeycomb',
        //           calories: 408,
        //           fat: 3.2,
        //           carbs: 87,
        //           protein: 6.5,
        //           iron: '45%',
        //         },
        //         {
        //           name: 'Donut',
        //           calories: 452,
        //           fat: 25.0,
        //           carbs: 51,
        //           protein: 4.9,
        //           iron: '22%',
        //         },
        //         {
        //           name: 'KitKat',
        //           calories: 518,
        //           fat: 26.0,
        //           carbs: 65,
        //           protein: 7,
        //           iron: '6%',
        //         },
        //       ],
        //     }
        //   },
        // }`,

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
