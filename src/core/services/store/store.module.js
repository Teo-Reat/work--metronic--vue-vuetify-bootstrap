/* eslint-disable prettier/prettier */
import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_STORE_LIST = "shop-list";
export const CREATE_STORE = 'create-store'
export const SERVER_PREFIXE = "/store";
export const SET_ERROR = "setError";

const state = {
    errors: null,
    store: {},
    isAuthenticated: !!JwtService.getToken()
};

const actions = {
    [GET_STORE_LIST](context) {
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
    [CREATE_STORE](context, payload) {

        return ApiService.post("store/", payload).then(({ data }) => {

            return data;
        });
    },
};

export default {
    state,
    actions
};
