/* eslint-disable prettier/prettier */
import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const GET_USER_LIST = "user-list";
export const GET_USER = "user";
export const CREATE_USER = "create-user";
export const UPDATE_USER_ACCOUNT_INFO = "update-user-account-info";
export const UPDATE_USER_CHANGE_PASSWORD = "update-user-change-password";
export const UPDATE_USER_CHANGE_STORES = "update-user-update-stores";
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
    // currentUser(state) {
    //     return state.user;
    // },
    // isAuthenticated(state) {
    //     return state.isAuthenticated;
    // }
};

const actions = {
    [GET_USER_LIST](context) {
        return new Promise(resolve => {
            ApiService.get("/user")
                .then(({ data }) => {

                    // context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response);
                });
        });
    },

    //  get user details
    [GET_USER](context, id) {
        return new Promise(resolve => {
            ApiService.get("/user/" + id)
                .then(({ data }) => {

                    // context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response);
                });
        });
    },

    // update only user account informations
    [CREATE_USER](context, payload) {

        const user = payload;;
        return ApiService.post("user/", user).then(({ data }) => {

            return data;
        });
    },
    // update only user account informations
    [UPDATE_USER_ACCOUNT_INFO](context, payload) {
        const { active, email, fullName, birthday, mobile } = payload;
        const user = { active, email, fullName, birthday, mobile };
        return ApiService.put("user/" + payload.id, user).then(({ data }) => {

            return data;
        });
    },

    // update only user stores
    [UPDATE_USER_CHANGE_STORES](context, payload) {
        const { stores } = payload;
        const user = { stores };
        return ApiService.put("user/" + payload.id, user).then(({ data }) => {

            return data;
        });
    },

    // update only user account informations
    [UPDATE_USER_CHANGE_PASSWORD](context, payload) {
        const { newPassword, email, password } = payload;
        const user = { password, email, newPassword };
        return ApiService.post("user/change-password", user).catch(error => {
            console.log(error);
            throw new Error(`[RWV] ApiService ${error}`);
        });;
    }
    // [LOGOUT](context) {
    //     context.commit(PURGE_AUTH);
    // },
    // [REGISTER](context, credentials) {
    //   return new Promise((resolve, reject) => {
    //     ApiService.post("users", { user: credentials })
    //       .then(({ data }) => {
    //         context.commit(SET_AUTH, data);
    //         resolve(data);
    //       })
    //       .catch(({ response }) => {
    //         context.commit(SET_ERROR, response.data.errors);
    //         reject(response);
    //       });
    //   });
    // },
    // [VERIFY_AUTH](context) {
    //     if (JwtService.getToken()) {
    //         ApiService.setHeader();
    //         // ApiService.get("verify")
    //         //     .then(({ data }) => {
    //         //         context.commit(SET_AUTH, data);
    //         //     })
    //         //     .catch(({ response }) => {
    //         //         context.commit(PURGE_AUTH);
    //         //         context.commit(SET_ERROR, response.data.errors);
    //         //     });
    //     } else {
    //         context.commit(PURGE_AUTH);
    //     }
    // },
    // [UPDATE_USER](context, payload) {
    //     const { email, username, password, image, bio } = payload;
    //     const user = { email, username, bio, image };
    //     if (password) {
    //         user.password = password;
    //     }

    //     return ApiService.put("user", user).then(({ data }) => {
    //         context.commit(SET_AUTH, data);
    //         return data;
    //     });
    // }
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
