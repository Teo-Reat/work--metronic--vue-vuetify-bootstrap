/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template src="./customer.html"></template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import CreateCustomer from "@/view/pages/customer/customer-create/customer-create.vue";
import KTCodePreview from "@/view/content/CodePreview.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { GET_CUSTOMER_LIST } from "@/core/services/store/customer.module";
import { bus } from "@/main";
import { Customer } from "@/core/models/Customer.model";

export default {
  data() {
    return {
      selectedCustomer: new Customer({}),
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
            text: "Fullname",
            align: "left",
            sortable: true,
            value: "fullName"
          },
          { text: "Email", value: "email" },
          { text: "Phone", value: "phone" },
          { text: "Source", value: "source" }
        ],
        desserts: []
      }
    };
  },
  components: {
    KTCodePreview,
    CreateCustomer
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", route: "" },
      { title: "Customers" }
    ]);
    this.$store
      .dispatch(GET_CUSTOMER_LIST)
      // bind user to model
      .then(data =>
        data.map(user => {
          this.code4.desserts.push(new Customer(user));
        })
      );
    bus.$on("customerCreated", dat => {
      dat;
      this.$store
        .dispatch(GET_CUSTOMER_LIST)
        // bind user to model
        .then(data => {
          this.code4.desserts = [];
          data.map(user => {
            this.code4.desserts.push(new Customer(user));
            this.hideModal();
          });
        });
    });
  },
  methods: {
    userDetail: function(row) {
      if (row) this.selectedCustomer = new Customer(row);
      else this.selectedCustomer = new Customer({});
      this.showModal();
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
