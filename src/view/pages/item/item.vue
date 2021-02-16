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
                        v-model="editedItem.additionnal"
                        label="Additionnal"
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
                  @click="save"
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
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!--    Picture template-->
    <template v-slot:item.picture="{ item }">
      <v-img
          :lazy-src="'https://backend.hashve.co.il/assets/items/' + item.picture"
          :src="'https://backend.hashve.co.il/assets/items/' + item.picture"
          max-height="90"
          max-width="90"
          transition
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
    <!--    <template v-slot:no-data>-->
    <!--      <v-btn-->
    <!--          color="primary"-->
    <!--          @click="initialize"-->
    <!--      >-->
    <!--        Reset-->
    <!--      </v-btn>-->
    <!--    </template>-->
  </v-data-table>
</template>

<script>
import {GET_ITEM_LIST} from "@/core/services/store/item.module";

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
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: {
          en: '',
          heb: ''
        },
        code: '',
        recommended: '',
        dayDeal: '',
        inStock: '',
        additionnal: '',
        price: ''
      },
      defaultItem: {
        name: {
          en: '',
          heb: ''
        },
        code: '',
        recommended: '',
        dayDeal: '',
        inStock: '',
        additionnal: '',
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

  created() {
    // this.initialize()
  },

  methods: {
    // initialize() {
    //   this.desserts = [
    //     {
    //       name: 'Frozen Yogurt',
    //       calories: 159,
    //       fat: 6.0,
    //       carbs: 24,
    //       protein: 4.0,
    //     },
    //     {
    //       name: 'Ice cream sandwich',
    //       calories: 237,
    //       fat: 9.0,
    //       carbs: 37,
    //       protein: 4.3,
    //     },
    //     {
    //       name: 'Eclair',
    //       calories: 262,
    //       fat: 16.0,
    //       carbs: 23,
    //       protein: 6.0,
    //     },
    //     {
    //       name: 'Cupcake',
    //       calories: 305,
    //       fat: 3.7,
    //       carbs: 67,
    //       protein: 4.3,
    //     },
    //     {
    //       name: 'Gingerbread',
    //       calories: 356,
    //       fat: 16.0,
    //       carbs: 49,
    //       protein: 3.9,
    //     },
    //     {
    //       name: 'Jelly bean',
    //       calories: 375,
    //       fat: 0.0,
    //       carbs: 94,
    //       protein: 0.0,
    //     },
    //     {
    //       name: 'Lollipop',
    //       calories: 392,
    //       fat: 0.2,
    //       carbs: 98,
    //       protein: 0,
    //     },
    //     {
    //       name: 'Honeycomb',
    //       calories: 408,
    //       fat: 3.2,
    //       carbs: 87,
    //       protein: 6.5,
    //     },
    //     {
    //       name: 'Donut',
    //       calories: 452,
    //       fat: 25.0,
    //       carbs: 51,
    //       protein: 4.9,
    //     },
    //     {
    //       name: 'KitKat',
    //       calories: 518,
    //       fat: 26.0,
    //       carbs: 65,
    //       protein: 7,
    //     },
    //   ]
    // },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },

  mounted() {
    this.$store.dispatch(GET_ITEM_LIST).then(data => (this.itemList = data));
  },
}
</script>
