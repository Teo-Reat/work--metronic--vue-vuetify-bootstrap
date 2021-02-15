/* eslint-disable prettier/prettier */
import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
// import promise from "@/assets/plugins/formvalidation/src/js/validators/promise.ts";

// action types
export const GET_ITEM_LIST = "item-list";
export const SERVER_PREFIXE = "/api/v1/item";
export const SET_ERROR = "setError";

const state = {
	errors: null,
	store: {},
	isAuthenticated: !!JwtService.getToken()
};

const actions = {
	[GET_ITEM_LIST](context) {
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
};

export default {
	state,
	actions
};
