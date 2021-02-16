<template>
  <v-data-table
      :headers="headers"
      :items="itemList"
      sort-by="name.en"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Some title</v-toolbar-title>
        <!--        <v-divider-->
        <!--            class="mx-4"-->
        <!--            inset-->
        <!--            vertical-->
        <!--        ></v-divider>-->
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >

          <!--          Button for create new item-->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <!--            Cteate new item form-->
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.name.en"
                        label="Name English"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.name.heb"
                        label="Name Hebrew"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.code"
                        label="Code"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.recommended"
                        label="Recommended"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.dayDeal"
                        label="Day deal"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.inStock"
                        label="In stock"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.additional"
                        label="Additional"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.price"
                        label="Price"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <!--            Card actions (delete, edit)-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save(editedItem)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--        Deletig item modal-->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedItem)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!--    Picture template-->
    <template v-slot:item.picture="{ item }">
      <v-img
          v-if="item.picture"
          :lazy-src="'https://backend.hashve.co.il/assets/items/' + item.picture"
          :src="'https://backend.hashve.co.il/assets/items/' + item.picture"
          max-height="90"
          max-width="90"
      ></v-img>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
</template>

<script>
import {GET_ITEM_LIST, CREATE_ITEM, UPDATE_ITEM_INFO, DELETE_ITEM} from "@/core/services/store/item.module";
import Swal from "sweetalert2";
import {Item} from "@/core/models/Item.model";

export default {
  name: "item",

  data() {
    return {
      itemList: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'picture',
        },
        {text: 'Name English', value: 'name.en'},
        {text: 'Name Hebrew', value: 'name.heb'},
        {text: 'Code', value: 'code', width: '8%'},
        {text: 'Recommended', value: 'recommended', width: '8%'},
        {text: 'Day deal', value: 'dayDeal', width: '8%'},
        {text: 'In stock', value: 'inStock', width: '8%'},
        {text: 'Additional', value: 'additional', width: '8%'},
        {text: 'Price', value: 'price', width: '8%'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      editedIndex: -1,
      editedItem: {
        name: {
          en: '',
          heb: ''
        },
        code: '',
        recommended: null,
        dayDeal: null,
        inStock: null,
        additional: false,
        price: ''
      },
      defaultItem: {
        name: {
          en: '',
          heb: ''
        },
        code: '',
        recommended: null,
        dayDeal: null,
        inStock: null,
        additional: false,
        price: ''
      },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.itemList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.itemList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm(item) {
      this.$store
          .dispatch(DELETE_ITEM, item._id)
      this.closeDelete()
      Swal.fire({
        title: "",
        text: "Item details updated",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save(editedItem) {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.saveEdit(editedItem)
      } else {
        this.saveCreate(editedItem)
      }
      this.close()
    },

    saveCreate(form) {
      this.$store
          .dispatch(CREATE_ITEM, form)
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

    submit: function (e) {
      e.preventDefault();
      Swal.fire({
        title: '',
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      });
    },

    saveEdit(item) {
      this.editedItem.id = item._id;
      this.$store
          .dispatch(UPDATE_ITEM_INFO, this.editedItem)
          // bind store to model
          .then(data => {
            this.item = new Item(data);
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
  },

  mounted() {
    this.$store.dispatch(GET_ITEM_LIST).then(data => (this.itemList = data));
    console.log(DELETE_ITEM)
  },
}
</script>
