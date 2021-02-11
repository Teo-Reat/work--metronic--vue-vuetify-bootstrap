import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import user from "./user.module";
import config from "./config.module";
import store from "./store.module";
import customer from "./customer.module";
import breadcrumbs from "./breadcrumbs.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        htmlClass,
        config,
        user,
        store,
        customer,
        breadcrumbs
    }
});