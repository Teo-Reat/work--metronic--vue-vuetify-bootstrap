/* eslint-disable prettier/prettier */
import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
// import promise from "@/assets/plugins/formvalidation/src/js/validators/promise.ts";

// action types
export const GET_STORE_LIST = "shop-list";
export const GET_STORE = "shop";
export const GET_CITY_LIST = "city-list";
export const CREATE_STORE = 'create-store'
export const SERVER_PREFIXE = "/store";
export const SERVER_CITY_PREFIXE = "/api/v1/city";
export const UPDATE_STORE_INFO = "update-store-info"
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
				.then(({data}) => {
					resolve(data);
				})
				.catch(({response}) => {
					context.commit(SET_ERROR, response);
				});
		});
	},

	[GET_STORE](context, id) {
		return new Promise(resolve => {
			ApiService.get('/store/' + id)
				.then(({data}) => {
					resolve(data);
				})
				.catch(({response}) => {
					context.commit(SET_ERROR, response);
				});
		});
	},

	[GET_CITY_LIST](context) {
		return new Promise(resolve => {
			ApiService.get(SERVER_CITY_PREFIXE)
				.then(({data}) => {
					resolve(data);
				})
				.catch(({response}) => {
					context.commit(SET_ERROR, response);
				});
		});
	},
	[CREATE_STORE](context, payload) {

		return ApiService.post("store/", payload).then(({data}) => {

			return data;
		});
	},
	[UPDATE_STORE_INFO](context, payload) {
		return ApiService.put("store/" + payload.id, payload).then(({data}) => {
			return data;
		});
	},
	// [DELETE_STORE](id) {
	// 	return ApiService.delete("store/" + id)
	// }
};

export default {
	state,
	actions
};
