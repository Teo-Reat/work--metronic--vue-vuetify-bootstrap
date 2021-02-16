/* eslint-disable prettier/prettier */
import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_ITEM_LIST = "item-list";
export const CREATE_ITEM = 'create-item'
export const UPDATE_ITEM_INFO = "update-item-info"
export const DELETE_ITEM = 'delete-item'
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

	[CREATE_ITEM](context, payload) {

		return ApiService.post("api/v1/item", payload).then(({data}) => {

			return data;
		});
	},

	[UPDATE_ITEM_INFO](context, payload) {
		return ApiService.put("api/v1/item/" + payload.id, payload).then(({data}) => {
			return data;
		});
	},

	[DELETE_ITEM](context, id) {
		return ApiService.delete("api/v1/item/" + id)
	}
};

export default {
	state,
	actions
};
