/*import axios from 'axios';
import Joi from 'joi';
const loginApi = `auth/login`;
const api = `http://localhost:4000/`;

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().min(8).required(),
});

export default {
  async authenticateUser( { dispatch }, credentials) {
    let validation = schema.validate(credentials);
    let error = ""
    if (validation.error === undefined) {
     return dispatch('login', credentials)
    } else {
      error = validation.error.message
      dispatch('handleError', error)
    }
},

async login({ dispatch }, user) {
        try {
            let response = await axios.post(loginApi, user);
            dispatch('checkToken', response.data.token)
        } catch (e) {
            let error = e.response.data.message;
            dispatch('handleError', error)
        }
},

async checkToken({ commit, state }, token) {
    if(token) {
        commit('SET_TOKEN', token);
    }

    if(!state.token) {
        return
    }

    try {
        let response = await axios.get(api);

        commit('SET_USER', response.data.user);
    } catch (e) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
    }

},

signOut({ commit }) {
    localStorage.removeItem('token');
    commit('SET_TOKEN', null);
    commit('SET_USER', null);
},


 handleError({ commit }, error) {
    let handledError = error;

    commit('SET_ERROR', handledError)
}
}


*/
