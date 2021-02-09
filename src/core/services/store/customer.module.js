/* eslint-disable prettier/prettier */
import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const GET_CUSTOMER_LIST = "customer-list";
export const GET_CUSTOMER = "customer";
export const CREATE_CUSTOMER = "create-customer";
export const UPDATE_CUSTOMER = "update-customer";
export const SERVER_PREFIXE = "/customer";

// export const LOGOUT = "logout";
// export const REGISTER = "register";
// export const UPDATE_USER = "updateUser";

// // mutation types
// export const PURGE_AUTH = "logOut";
// export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
};

const getters = {

};

const actions = {
    [GET_CUSTOMER_LIST](context) {
        return new Promise(resolve => {
            ApiService.get(SERVER_PREFIXE)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response);
                });
        });
    },

    //  get user details 
    [GET_CUSTOMER](context, id) {
        return new Promise(resolve => {
            ApiService.get(SERVER_PREFIXE + "/" + id)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response);
                });
        });
    },

    // update only user account informations
    [CREATE_CUSTOMER](context, payload) {
        const { phone, email, fullName, sourceUrl, source } = payload;
        const user = { phone, email, fullName, sourceUrl, source };
        return ApiService.post(SERVER_PREFIXE, user).then(({ data }) => {
            return data;
        });
    },

    // update only user account informations
    [UPDATE_CUSTOMER](context, payload) {
        const { phone, email, fullName, sourceUrl, source } = payload;
        const user = { phone, email, fullName, sourceUrl, source };
        return ApiService.put(SERVER_PREFIXE + "/" + payload.id, user).then(({ data }) => {
            return data;
        });
    },


};

// const mutations = {
//     [SET_ERROR](state, error) {
//         state.errors = error;
//     },
//     [SET_AUTH](state, user) {
//         state.isAuthenticated = true;
//         state.user = user;
//         state.errors = {};
//         JwtService.saveToken(state.user.token);
//     },
//     [PURGE_AUTH](state) {
//         state.isAuthenticated = false;
//         state.user = {};
//         state.errors = {};
//         JwtService.destroyToken();
//     }
// };

export default {
    state,
    actions,
    // mutations,
    getters
};